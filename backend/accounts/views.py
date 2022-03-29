from django.http import JsonResponse
import requests
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED
)
from kkubooks.models import KkubookMode
from .token import create_token, get_request_user
from rest_framework.decorators import api_view



User = get_user_model()


@api_view(['POST'])
def login_signup(request):
    '''
    token 발급
    DB에 없는 사용자일 경우, DB에 저장
    '''
    kakao_user_api = 'https://kapi.kakao.com/v2/user/me'
    kakao_token = request.data['access_token']
    
    # user 정보
    user_info = requests.get(
        kakao_user_api, 
        headers={"Authorization": f'Bearer ${kakao_token}'}
        ).json()
    
    email = user_info['kakao_account']['email']
    nickname = user_info['kakao_account']['profile']['nickname']

    # SignUp (DB)
    if not User.objects.filter(kakao_email=email).exists():
        User.objects.create(
            kakao_email = email,
            nickname = nickname
            )
    
    # Login
    user = get_object_or_404(User, kakao_email=email)

    is_kkubook = KkubookMode.objects.filter(user_id=user.pk).exists()
    if is_kkubook:
        level = KkubookMode.objects.filter(user_id=1).values()[0]['level']
        kkubook_days = level = KkubookMode.objects.filter(user_id=1).values()[0]['kkubook_days']
    else:
        level = kkubook_days = -1

    payload = {'email': user.email}

    jwt_access_token = create_token(payload, 'access')
    # jwt_refresh_token = create_token(jwt_data, 'refresh')

    login_user = {
        'user_id': user.pk,
        'nickname': user.nickname,
        'is_kkubook': is_kkubook,
        'kkubook_complete': user.kkubook_complete,
        'level': level,
        'kkubook_days': kkubook_days,
        'created_at': user.created_at,
        'access_token': jwt_access_token,
    }

    return JsonResponse(login_user)


@api_view(['DELETE'])
def signout(request):
    '''
    DELETE: 사용자 정보 DB에서 삭제
    '''
    user = get_request_user(request)

    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)
        
    user.delete()
    return Response(data='정상적으로 삭제되었습니다.', status=HTTP_204_NO_CONTENT)


import requests
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED
)
from kkubooks.models import KkubookMode, Survey
from .token import create_token, get_request_user
from .serializers import UserSerializer
from datetime import datetime

User = get_user_model()


@api_view(['POST'])
def login_signup(request):
    '''
    POST: access_token 발급
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
            username = email,
            kakao_email = email,
            nickname = nickname
            )
    # Login
    user = get_object_or_404(User, kakao_email=email)
    is_new = not Survey.objects.filter(user_id=user.pk).exists()
    is_kkubook = KkubookMode.objects.filter(user_id=user.pk).exists()
    if is_kkubook:
        kkubook = KkubookMode.objects.get(user_id=user.pk)
        level = kkubook.level
        kkubook_days = kkubook.kkubook_days
        notcommit_days = kkubook.notcommit_days
        last = kkubook.updated_at
        today = datetime.today()
        day_delta = (today - last).days - 1

        # Calculate notcommit_days
        if day_delta > 0:
            notcommit_days += day_delta
            if notcommit_days >= 10:
                is_kkubook = False
                kkubook.delete()
            else:
                kkubook.notcommit_days = notcommit_days
                kkubook.save()

    else:
        level = kkubook_days = notcommit_days = -1

    
    payload = {'email': user.kakao_email}

    jwt_access_token = create_token(payload, 'access')
    # jwt_refresh_token = create_token(jwt_data, 'refresh')

    login_user = {
        'user': user.pk,
        'nickname': user.nickname,
        'is_kkubook': is_kkubook,
        'kkubook_complete': user.kkubook_complete,
        'level': level,
        'kkubook_days': kkubook_days,
        'notcommit_days': notcommit_days,
        'created_at': user.created_at,
        'access_token': jwt_access_token,
        'is_new': is_new,
    }

    return JsonResponse(login_user, status=HTTP_200_OK)


@api_view(['DELETE', 'PUT'])
def signout(request):
    '''
    PUT: 닉네임 수정
    DELETE: 사용자 정보 DB에서 삭제
    '''
    # user = get_object_or_404(User, pk=5)
    user = get_request_user(request)

    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    if request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(request.data, status=HTTP_201_CREATED)

    elif request.method == 'DELETE':
        user.delete()
        return Response(data='정상적으로 삭제되었습니다.', status=HTTP_204_NO_CONTENT)


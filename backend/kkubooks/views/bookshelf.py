import requests
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import (
  Bookshelf,
  Memo,
  Commit,
  KkubookMode,
)
from ..serializers.bookshelf import (
    BookshelfSerializer,
    BookshelfListSerializer
)
from ..serializers.memo import MemoListSerializer
from accounts.token import get_request_user
import datetime

User = get_user_model()

@api_view(['POST'])
def create_book(request):
    
    # 서재에 책을 등록한다.
    user = get_request_user(request)
    if not user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'POST':
        serializer = BookshelfSerializer(data=request.data)
        if serializer.is_valid(): # 유효한 값이 들어가는지 검사
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def bookshelf_detail(request, bookshelf_id):

    user = get_request_user(request)

    if not user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    bookshelf = get_object_or_404(Bookshelf, pk=bookshelf_id)

    # 서재에 등록된 책의 상태 및 페이지를 변경한다.
    if request.method == 'PUT':
        serializer = BookshelfSerializer(bookshelf, data=request.data)
        today = str(datetime.datetime.now())[:10]
        try:
            tmp = request.data['curr_page']
            commits = Commit.objects.filter(user_id=user.pk, start_time__contains = today)
            kkubookmode = KkubookMode.objects.get(user_id=user.pk)

            if len(commits) == 1:
                num = kkubookmode.kkubook_days + 1
                kkubookmode.level += (num // 10)
                kkubookmode.kkubook_days = (num % 10)
                kkubookmode.save()

        # page 수정이 아닐때
        except KeyError:
            pass
        # 꾸북모드 off 유저
        except KkubookMode.DoesNotExist:
            pass

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


    # 서재에서 책을 삭제한다.
    elif request.method == 'DELETE':
        bookshelf.delete()
        return Response(data='정상적으로 삭제되었습니다.', status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def bookshelf_list(request):

    user = get_request_user(request)
    if not user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    # 서재에 저장된 책 목록을 가져온다.
    if request.method == 'GET':
        bookshelf = Bookshelf.objects.filter(user_id=user.pk).order_by('-id')
        serializer = BookshelfListSerializer(bookshelf, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def get_memo(request, book_id):

    user = get_request_user(request)
    if not user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    # 선택한 책의 메모를 가져온다.
    if request.method == 'GET':
        memolist = Memo.objects.filter(book_id=book_id, user_id=user.pk)
        serializer = MemoListSerializer(memolist, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_naver_api(request):
    '''
    GET: 네이버 책 검색 api 결과를 가져온다.
    TODO:
        CLIENT_ID & CLIENT_SECRET 숨기기
    '''
    user = get_request_user(request)
    if not user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    CLIENT_ID = 'Jyo29oClP9wTj1SDk8Bz'
    CLIENT_SECRET = 'i0c7ntDiXt'
    ISBN = request.query_params['isbn']
    NAVER_BOOK_URL = f'https://openapi.naver.com/v1/search/book_adv.json?d_isbn={ISBN}'
    data = requests.get(
        NAVER_BOOK_URL,
        headers = {
            "X-Naver-Client-Id": CLIENT_ID,
            "X-Naver-Client-Secret": CLIENT_SECRET,
        }
    ).json()
    res = {
        'link': data['items'][0]['link']
    }
    return Response(res)


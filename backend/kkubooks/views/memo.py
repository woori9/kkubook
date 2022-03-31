from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED,
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.token import get_request_user
from ..models import Memo, Book
from ..serializers.memo import (
    MemoListSerializer,
    MemoSerializer,
    MemoBookmarkSerializer,
)


User = get_user_model()


@api_view(['GET'])
def memo_list(request):
    '''
    GET: 사용자의 메모 리스트 조회
    '''
    user = get_request_user(request)
    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    if request.method == 'GET':
        memos = Memo.objects.filter(user_id=user.pk)
        serializer = MemoListSerializer(memos, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def create_memo(request):
    '''
    POST: 메모를 DB에 저장
    '''
    user = get_request_user(request)
    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)
        
    if request.method == 'POST':
        serializer = MemoSerializer(data=request.data)
        # user = get_object_or_404(User, pk=4)
        book = get_object_or_404(Book, pk=request.data['book_id'])
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user, book=book)
            # serializer.save(user_id=1)
            return Response(serializer.data, status=HTTP_201_CREATED)


@api_view(['PUT', 'DELETE'])
def memo_detail(request, memo_id):
    '''
    PUT: memo_id에 대한 수정사항을 DB에 반영
    DELETE: memo_id를 DB에서 삭제
    '''
    user = get_request_user(request)
    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    memo = get_object_or_404(Memo, pk=memo_id)
    if request.method == 'PUT':
        serializer = MemoSerializer(memo, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    elif request.method == 'DELETE':
        memo.delete()
        return Response(data=f'{memo_id}번 메모가 정상적으로 삭제되었습니다.', status=HTTP_204_NO_CONTENT)


@api_view(['PUT'])
def memo_bookmark(request, memo_id):
    '''
    PUT: momo_id의 좋아요 수정사항을 DB에 반영
    '''
    user = get_request_user(request)
    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    memo = get_object_or_404(Memo, pk=memo_id)
    if request.method == 'PUT':
        serializer = MemoBookmarkSerializer(memo, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

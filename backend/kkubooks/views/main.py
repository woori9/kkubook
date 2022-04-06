from django.contrib.auth import get_user_model
from django.shortcuts import (
    get_object_or_404,
)
from rest_framework.decorators import api_view
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_401_UNAUTHORIZED,
)
from rest_framework.response import Response

from ..models import (
    Book,
    KkubookMode,
    Commit,
    Bookshelf,
)
from ..serializers.book import (
    BookSerializer,
    BookSearchSerializer,
)
from ..serializers.commit import (
    CommitSerializer,
    CommitListSerializer,
)
from ..serializers.bookshelf import (
    BookshelfRatingSerializer,
    BookshelfListSerializer,
    # BookshelfCurrpageSerializer,
)
from ..serializers.kkubookmode import KkubookModeSerializer
from accounts.token import get_request_user


User = get_user_model()

@api_view(['GET'])
def kkubookmode(request):
    '''
    GET: 유저의 꾸북모드 정보를 받아온다.
    '''
    user = get_request_user(request)

    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    if request.method == 'GET':
        kkubookmode_id = KkubookMode.objects.filter(user_id=user.pk)
        kkubookmode = get_object_or_404(KkubookMode, pk=kkubookmode_id.values()[0]['id'])
        serializer = KkubookModeSerializer(kkubookmode)
        return Response(serializer.data)


@api_view(['GET'])
def search(request):
    '''
    GET: 검색하고자 하는 책의 정보를 가져온다.
    {
        "word": 검색할 단어,
        "index": 0(제목) or 1(작가)로 검색
    }
    '''
    if request.method == 'GET':
        word = request.GET.get('word')
        if not int(request.GET.get('index')):
            book_list = Book.objects.filter(title__icontains=word)
            serializer = BookSearchSerializer(book_list, many=True)
            return Response(serializer.data)
        elif int(request.GET.get('index')) == 1:
            book_list = Book.objects.filter(author__icontains=word)
            serializer = BookSearchSerializer(book_list, many=True)
            return Response(serializer.data)
        else:
            book = get_object_or_404(Book, isbn=word)
            serializer = BookSearchSerializer(book)
            return Response(serializer.data)
        


@api_view(['GET'])
def booklist(request):
    '''
    GET: 읽고 있는 책의 상세 정보를 가져온다.
    '''
    user = get_request_user(request)
    # user = get_object_or_404(User, pk=1)
    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    if request.method == 'GET':
        books = Bookshelf.objects.filter(book_status=1).filter(user_id=user.pk)
        serializer = BookshelfListSerializer(books, many=True)
        return Response(serializer.data)



@api_view(['GET'])
def book_detail(request, book_id):
    '''
    GET: 책의 상세 정보를 가져온다.
    '''
    if request.method == 'GET':
        book = get_object_or_404(Book, pk=book_id)
        serializer = BookSerializer(book)
        return Response(serializer.data)


@api_view(['POST'])
def commit(request, book_id):
    '''
    POST: commit 생성
    '''
    user = get_request_user(request)

    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    if request.method == 'POST':
        serializer = CommitSerializer(data=request.data)
        user = User.objects.get(pk=user.pk)
        book = Book.objects.get(pk=book_id)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user, book=book)
            return Response(serializer.data, status=HTTP_201_CREATED)


# @api_view(['PUT'])
# def page(request, bookshelf_id):
#     '''
#     PUT: 현재 페이지 수를 수정한다.
#     '''
#     if request.method == 'PUT':
#         bookshelf = get_object_or_404(Bookshelf, pk=bookshelf_id)
#         serializer = BookshelfCurrpageSerializer(instance=bookshelf, data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)


@api_view(['GET'])
def commit_list(request):
    '''
    GET: commit 기록 모두 조회
    '''
    user = get_request_user(request)

    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    if request.method == 'GET':
        commit_list = Commit.objects.filter(user_id=user.pk)
        serializer = CommitListSerializer(commit_list, many=True)
        return Response(serializer.data)


@api_view(['PUT'])
def rating(request, bookshelf_id):
    '''
    PUT: 다 읽은 책의 평점 등록하기
    '''
    user = get_request_user(request)

    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)
        
    bookshelf = get_object_or_404(Bookshelf, pk=bookshelf_id)
    if request.method == 'PUT':
      serializer = BookshelfRatingSerializer(instance=bookshelf, data=request.data)
      if serializer.is_valid(raise_exception=True):
          serializer.save()
      return Response(serializer.data)
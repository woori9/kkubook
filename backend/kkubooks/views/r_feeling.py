from django.contrib.auth import get_user_model
from django.db.models import Q, Count
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)
from accounts.token import get_request_user
from ..models import (
    Survey, 
    Category, 
    Keyword,
    Book,
    Bookshelf
)
from ..serializers.book import BookSearchSerializer


User = get_user_model()


@api_view(['GET'])
def recomm_feeling(request):
    '''
    GET: 기분에 따른 책 추천
    **feeling
        슬퍼요(0), 떠나고 싶어요(1), 행복해요(2), 무기력해요(3), 심심해요(4), 고민이 있어요(5),
    '''   
    # user = get_object_or_404(User, pk=4)
    user = get_request_user(request)
    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    if request.method == 'GET':
        # 서재에 등록된 책
        bookshelfs = Bookshelf.objects.filter(user_id=user.pk).values('book')
        my_books = []
        for bookshelf in bookshelfs:
            my_books.append(bookshelf['book'])

        try:
            feeling = Survey.objects.get(user_id=user.pk).feeling
            # feeling = 5
            if feeling == 0:    # 슬픔
                books = Keyword.objects.filter(Q(word='위로') | Q(word='상처') | Q(word='자존감')).order_by('?')

            elif feeling == 1:  # 여행
                books = Category.objects.filter(sub__contains='여행').order_by('?')

            elif feeling == 2:  # 행복
                books = Category.objects.filter(Q(sub='웹툰/카툰에세이') | Q(sub='테마에세이')).order_by('?')

            elif feeling == 3:  # 무기력
                books = Category.objects.filter(sub='자기능력계발').order_by('?')

            elif feeling == 4:  # 심심
                books = Category.objects.filter(main='취미/실용/스포츠').order_by('?')

            elif feeling == 5:  # 고민
                books = Keyword.objects.filter(word='고민').order_by('?')

            recomm_books = []
            for book in books:
                if len(recomm_books) == 10:
                    break
                if not book.book_id in my_books:
                    recomm_books.append(Book.objects.get(pk=book.book_id))
            serializer = BookSearchSerializer(recomm_books, many=True)
            return Response(serializer.data)

        except:
            return Response(status=HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def recomm_best(request):
    '''
    GET: 서재에서 완독률이 높은 책 추천
    '''
    # user = get_object_or_404(User, pk=1)
    user = get_request_user(request)
    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    if request.method == 'GET':
        bookshelfs = Bookshelf.objects.exclude(user_id=user.pk).filter(book_status=0).values('book_id')
        bookshelfs_count = bookshelfs.values('book_id').annotate(count=Count('book_id')).order_by('-count')[:10]
        recomm_books = []
        for book in bookshelfs_count:
            recomm_books.append(Book.objects.get(pk=book['book_id']))
        serializer = BookSearchSerializer(recomm_books, many=True)
        return Response(serializer.data)

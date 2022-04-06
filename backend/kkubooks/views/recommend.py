from django.contrib.auth import get_user_model
from django.db.models import Q, Count
from django.shortcuts import (
    get_list_or_404,
    get_object_or_404
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)
from accounts.token import get_request_user
from ..models import (
    Book,
    Bookshelf,
    Category, 
    Keyword,
    Survey, 
)
from ..serializers.book import BookSearchSerializer
import pickle
import random


User = get_user_model()


@api_view(['GET'])
def recomm_mf(request):
    if request.method == 'GET':
        #user = get_object_or_404(User, pk=15)
        user = get_request_user(request)

        if not user:
            return Response(status=HTTP_401_UNAUTHORIZED)

        if(Bookshelf.objects.filter(user_id=user).count()>=3):  # mf 기반
            pickle_path = 'kkubooks/predict_result'
            recomm_result = pickle.load(open(pickle_path, 'rb'))

            recomm_result = recomm_result[recomm_result['user_id']==user.pk]
            recomm_result = recomm_result['id'].values.tolist()

            recomm_booklist = []
            for book_id in range(len(recomm_result)):
                book = Book.objects.get(pk=recomm_result[book_id])
                recomm_booklist.append(book)

            serializer = BookSearchSerializer(recomm_booklist, many=True)
            return Response(serializer.data)
        
        else:  # 서재에 책 데이터가 3개 미만인 경우 -> 설문기반
            survey = get_object_or_404(Survey, user_id=user.pk)

            my_interest = list(survey.interest.split())
            interest_list = ['!@#$%^'] * 5
            index=0
            for i in my_interest:
                interest_list[index] = i
                index += 1
            
            # 분량 : 얇은 책/보통인 책/두꺼운 책/아무거나
            q=Q()
            if survey.amount==0:  # 얇은 책:0
                q &= Q(book__page__lte=200)
            elif survey.amount==1:  # 보통인 책
                q &= Q(book__page__lte=400)
            elif survey.amount==2:  # 두꺼운 책
                q &= Q(book__page__gt=400)
            elif survey.amount==3:  # 아무거나
                q &= Q(book__page__lte=0)

            # 장르 : 아무거나(0)/ 문학(1)/ 과학(2)/ 사회(3)/ 예술(4)/ 자기계발(5) 
            if survey.category==0:  
                recomm_category = Category.objects.all().filter(q).order_by('?')
            else:
                recomm_category = Category.objects.filter(survey_category=survey.category).filter(Q(book__description__contains=interest_list[0]) | Q(book__description__contains=interest_list[1]) | Q(book__description__contains=interest_list[2]) | Q(book__description__contains=interest_list[3]) | Q(book__description__contains=interest_list[4])).filter(q).order_by('?')
            

            # 내 서재에 있는 책 제외
            bookshelf = Bookshelf.objects.filter(user_id=user.pk)
            my_book = bookshelf.values('book_id').distinct()

            recomm_booklist = []
            for book in recomm_category:
                if book not in my_book:
                    recomm_booklist.append(Book.objects.get(pk=book.book_id))
                    serializer = BookSearchSerializer(recomm_booklist, many=True)
                    return Response(serializer.data)

                if len(recomm_booklist) == 10:
                    break

            return Response(serializer.data)


@api_view(['GET'])
def recomm_similar(request):
    if request.method == 'GET':
        user = get_request_user(request)

        if not user:
            return Response(status=HTTP_401_UNAUTHORIZED)

        survey = get_object_or_404(Survey, user_id=user.pk)
        my_interest = list(survey.interest.split())
        similar_user_list_tmp = get_list_or_404(Survey, ~Q(user_id=user.pk), age=survey.age, job=survey.job)
        similar_user_list = []
        
        # 나의 취향과 비슷한 점이 하나라도 있으면 비슷하다고 보기
        # TODO: 몇개 겹치면 비슷한걸로?
        for p in similar_user_list_tmp:
            you_interest = list(p.interest.split())
            for q in my_interest:
                if q in you_interest:
                    similar_user_list.append(p)
                    break

        
        # 내가 가지고 있는 책 정보 (읽은 책, 읽고 싶은 책, 읽는 중인 책, 그만 본 책 모두)
        my_bookshelf = Bookshelf.objects.filter(user_id=user.pk)
        
        my_book_id_list = []
        for id in range(len(my_bookshelf)):
            my_book_id_list.append(my_bookshelf[id].book_id)


        result_book_list = [] # 최종 추천해줄 책 리스트
        for similar in similar_user_list: # 몇명의 비슷한 사람이 나올지 모름...
            similar_bookshelf = Bookshelf.objects.filter(Q(book_status=0) | Q(book_status=1), user_id=similar.user_id) # 비슷한 사람이 읽은 책 정보 뽑아오기

            for id in range(len(similar_bookshelf)):
                book = Book.objects.get(pk=similar_bookshelf[id].book_id) # 책 object 불러오기
                if (similar_bookshelf[id].book_id not in my_book_id_list) and (book not in result_book_list): # 나의 책정보와 일치하는 책 거르기 & 이미 있는 책 거르기
                    result_book_list.append(book)
        

        if len(result_book_list) < 10:
            res = result_book_list
        else:
            res = random.sample(result_book_list, 10)
        serializer = BookSearchSerializer(res, many=True)
        return Response(serializer.data)


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
        
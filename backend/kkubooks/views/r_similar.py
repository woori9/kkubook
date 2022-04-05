from django.contrib.auth import get_user_model
from django.shortcuts import (
    get_list_or_404,
    get_object_or_404,
)
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import (
    Book,
    Bookshelf,
    Survey,
)
from ..serializers.book import BookSearchSerializer
from accounts.token import get_request_user
from django.db.models import Q

User = get_user_model()

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
        my_bookshelf = get_list_or_404(Bookshelf, user_id=user.pk)
        
        my_book_id_list = []
        for id in range(len(my_bookshelf)):
            my_book_id_list.append(my_bookshelf[id].book_id)


        result_book_list = [] # 최종 추천해줄 책 리스트
        for similar in similar_user_list: # 몇명의 비슷한 사람이 나올지 모름...
            similar_bookshelf = get_list_or_404(Bookshelf, Q(book_status=0) | Q(book_status=1), user_id=similar.user_id) # 비슷한 사람이 읽은 책 정보 뽑아오기

            for id in range(len(similar_bookshelf)):
                if similar_bookshelf[id].book_id not in my_book_id_list: # 나의 책정보와 일치하는 책 거르기
                    book = Book.objects.get(pk=similar_bookshelf[id].book_id) # 책 object 불러오기
                    result_book_list.append(book)

        serializer = BookSearchSerializer(result_book_list, many=True)
        return Response(serializer.data)
 
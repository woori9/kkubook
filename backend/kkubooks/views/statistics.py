from operator import mod
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import (
  KkubookMode,
  Commit,
  Category
)
from ..serializers.kkubookmode import (
    KkubookModeOnSerializer
)
from django.http import JsonResponse

User = get_user_model()

@api_view(['POST', 'DELETE'])
def set_kkubookmode(request):
    # 꾸북모드 ON한 사용자 추가
    if request.method == 'POST':
        serializer = KkubookModeOnSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # 꾸북모드 OFF한 사용자 삭제
    elif request.method == 'DELETE':
        user = get_object_or_404(KkubookMode, user_id=1)
        user.delete()
        return Response(data='정상적으로 삭제되었습니다.', status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_user_statistics(request, yyyymm):

    if request.method == 'GET':
        year=yyyymm[0:4]
        month=yyyymm[4:6]

        # 독서량 통계
        # Commit table에서 start time의 x달 commit 수
        commit_num = Commit.objects.filter(start_time__contains=year+'-'+month).count()

        # Commit table에서 yyyy년 mm월에 읽은 책 수
        books = Commit.objects.filter(start_time__contains=year+'-'+month)
        books = books.values('book_id').distinct()
        book_num = books.count()
        
        # 장르 통계
        # Commit table에서 yyyy년 mm월에 읽은 책의 장르 종류, 장르별 책 수
        category = {}
        for model_instance in books:
            main_category = Category.objects.get(book_id=model_instance.get('book_id')).main
            if main_category in category.keys():
                category[main_category] += 1
            else:
                category[main_category] = 1

        response_data = {
            "commit_num" : commit_num,
            "book_num" : book_num,
            "category" : category
        }
        
        return JsonResponse(response_data, json_dumps_params={'ensure_ascii': False})

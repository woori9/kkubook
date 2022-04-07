from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import (
  Book,
  KkubookMode,
  Commit,
  Category
)
from ..serializers.kkubookmode import KkubookModeSerializer
from accounts.token import get_request_user
from django.http import JsonResponse

User = get_user_model()

@api_view(['POST', 'DELETE'])
def set_kkubookmode(request):
    # user = get_object_or_404(User, pk=2)
    user = get_request_user(request)
    if not user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    # 꾸북모드 ON한 사용자 추가
    if request.method == 'POST':
        if not KkubookMode.objects.filter(user=user).exists():
            serializer = KkubookModeSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data='이미 등록된 사용자입니다.', status=status.HTTP_409_CONFLICT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 꾸북모드 OFF한 사용자 삭제
    elif request.method == 'DELETE':
        user = get_object_or_404(KkubookMode, user_id=user.pk)
        user.delete()
        return Response(data='정상적으로 삭제되었습니다.', status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_user_statistics(request, yyyymm):
    # user = get_object_or_404(User, pk=1)
    user = get_request_user(request)
    if not user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'GET':
        year=yyyymm[0:4]
        month=yyyymm[4:6]

        # 독서량 통계
        # Commit table에서 start time의 x달 commit 수 (날짜 중복 제거)
        commits = Commit.objects.filter(user_id=user.pk, start_time__contains=year+'-'+month).values('start_time', 'book_id')
        days = set()
        for commit in commits:
            days.add(str(commit['start_time'])[8:10])
        days_num = len(days)
        
        # Commit table에서 yyyy년 mm월에 읽은 책 수
        books = commits.values('book_id').distinct()
        book_num = books.count()

        
        # 장르 통계
        # Commit table에서 yyyy년 mm월에 읽은 책의 장르 종류, 장르별 책 수
        category = {}
        book_img = []
        for model_instance in books:
            book_id = model_instance.get('book_id')
            main_category = Category.objects.get(book_id=book_id).main
            book_img.append(Book.objects.get(id=book_id).img_url)

            if main_category in category.keys():
                category[main_category] += 1
            else:
                category[main_category] = 1
        category_sorted = dict(sorted(category.items(), key=lambda x: x[1], reverse=True))

        response_data = {
            "commit_num" : days_num,
            "book_num" : book_num,
            "category" : category_sorted,
            "book_img" : book_img
        }
        return JsonResponse(response_data, json_dumps_params={'ensure_ascii': False})

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import (
  Book,
  Bookshelf,
  Memo
)
from ..serializers.bookshelf import BookshelfSerializer
from ..serializers.memo import MemoSerializer
import datetime

@api_view(['POST', 'DELETE'])
def set_kkubookmode(request):
    # 꾸북모드 ON한 사용자 추가
    if request.method == 'POST':
        serializer = BookshelfSerializer(data=request.data)
        if serializer.is_valid(): # 유효한 값이 들어가는지 검사
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # 꾸북
    elif request.method == 'DELETE':
        book.delete()
        return Response(data='정상적으로 삭제되었습니다.', status=status.HTTP_204_NO_CONTENT)

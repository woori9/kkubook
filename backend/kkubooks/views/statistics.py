from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import (
  KkubookMode
)
from ..serializers.kkubookmode import (
    KkubookModeSerializer,
    KkubookModeOnSerializer
)
import datetime

User = get_user_model()

@api_view(['POST', 'DELETE'])
def set_kkubookmode(request):
    # 꾸북모드 ON한 사용자 추가
    if request.method == 'POST':
        serializer = KkubookModeOnSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # 꾸북모드 OFF한 사용자 삭제
    elif request.method == 'DELETE':
        user = get_object_or_404(KkubookMode, user_id=1)
        user.delete()
        return Response(data='정상적으로 삭제되었습니다.', status=status.HTTP_204_NO_CONTENT)

#@api_view(['GET'])
#def get_user_statistics(yyyymm):
    # 독서량 통계
    
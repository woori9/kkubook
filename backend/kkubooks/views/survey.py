from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.token import get_request_user
from ..models import Survey
from ..serializers.survey import (
    SurveySerializer,
    FeelingSerializer
)


User = get_user_model()


@api_view(['POST'])
def create_survey(request):
    '''
    POST: 설문조사 결과를 DB에 저장
    '''
    # user = get_object_or_404(User, pk=4)
    user = get_request_user(request)
    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    if request.method == 'POST':
        serializer = SurveySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=user)
            return Response(status=HTTP_201_CREATED)


@api_view(['GET', 'PUT'])
def feeling(request):
    '''
    GET: 기분을 조회
    PUT: 기분을 DB에 반영
    '''
    # user = get_object_or_404(User, pk=4)
    user = get_request_user(request)
    if not user:
        return Response(status=HTTP_401_UNAUTHORIZED)

    try:
        survey = Survey.objects.get(user=user)
        if request.method == 'GET':
            serializer = FeelingSerializer(survey)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = FeelingSerializer(survey, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(status=HTTP_201_CREATED)

    except:
        return Response(status=HTTP_400_BAD_REQUEST)
    

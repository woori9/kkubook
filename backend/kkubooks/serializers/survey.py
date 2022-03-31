from rest_framework import serializers
from ..models import Survey


class SurveySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Survey
        fields = '__all__'
        read_only_fields = ('user',)


class FeelingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = ('user', 'feeling',)
        read_only_fields = ('user',)
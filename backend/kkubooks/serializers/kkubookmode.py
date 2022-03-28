from rest_framework import serializers
from ..models import KkubookMode
from django.contrib.auth import get_user_model

User = get_user_model()

class KkubookModeSerializer(serializers.ModelSerializer):

    class Meta:
        model = KkubookMode
        fields = '__all__'

class KkubookModeOnSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = KkubookMode
        fields = ('user', )
from rest_framework import serializers
from ..models import KkubookMode
from django.contrib.auth import get_user_model

User = get_user_model()

class KkubookModeSerializer(serializers.ModelSerializer):

    class Meta:
        model = KkubookMode
        fields = ('user', 'level', 'kkubook_days', 'notcommit_days', )
        read_only_fields = ('user',)

# class KkubookModeOnSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = KkubookMode
#         fields = ('user', )
#         read_only_fields = ('user',)

        
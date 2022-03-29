from rest_framework import serializers
from ..models import Memo


class MemoListSerializer(serializers.ModelSerializer):

	class Meta:
		model = Memo
		fields = '__all__'


class MemoSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = Memo
		fields = ('id', 'book', 'content', 'memo_img',)
		read_only_fields = ('id', 'book')


class MemoBookmarkSerializer(serializers.ModelSerializer):

	class Meta:
		model = Memo
		fields = ('id', 'memo_mark', )
		read_only_fields = ('id', )
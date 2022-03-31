from rest_framework import serializers
from ..models import Memo
from .book import BookSearchSerializer


class MemoListSerializer(serializers.ModelSerializer):

	class Meta:
		model = Memo
		fields = ('id', 'content', 'memo_img', 'memo_mark', 'created_at', 'updated_at',)
		
	def to_representation(self, instance):
		response = super().to_representation(instance)
		response['book_info'] = BookSearchSerializer(instance.book).data
		return response


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
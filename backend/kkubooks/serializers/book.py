from rest_framework import serializers
from ..models import Book

class BookSerializer(serializers.ModelSerializer):
    '''
    책 상세정보 가져오기
    '''
    class Meta:
        model = Book
        fields = '__all__'

class BookSearchSerializer(serializers.ModelSerializer):
    '''
    책 검색한 정보 가져오기
    '''
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'img_url', )

class BookInfoSerializer(serializers.ModelSerializer):
    '''
    서재에서 책 상세정보 보이기
    '''
    class Meta:
        model = Book
        fields = ('title', 'author', 'publisher', 'img_url', 'page')
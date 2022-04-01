from rest_framework import serializers
from ..models import Bookshelf
from .book import BookInfoSerializer

class BookshelfSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bookshelf
        fields = '__all__'

  
class BookshelfRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bookshelf
        fields = ('rating', )


class BookshelfCurrpageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bookshelf
        fields = ('curr_page', )

class BookshelfListSerializer(serializers.ModelSerializer):

	class Meta:
		model = Bookshelf
		fields = ('id', 'book_id', 'book_status', 'curr_page', 'start_date', 'end_date', 'rating', )
		
	def to_representation(self, instance):
		response = super().to_representation(instance)
		response['book_info'] = BookInfoSerializer(instance.book).data
		return response
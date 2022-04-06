from rest_framework import serializers
from ..models import Bookshelf, KkubookMode
from .book import BookInfoSerializer
from .kkubookmode import KkubookModeSerializer

class BookshelfSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bookshelf
        fields = '__all__'
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        kkubookmode = KkubookMode.objects.get(user_id=instance.user_id)
        response['kkubookmode'] = KkubookModeSerializer(kkubookmode).data
        return response
  
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
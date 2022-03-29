from rest_framework import serializers
from ..models import Commit

class CommitSerializer(serializers.ModelSerializer):

	class Meta:
		model = Commit
		fields = '__all__'
		read_only_fields = ('user', 'book', )

class CommitListSerializer(serializers.ModelSerializer):

	class Meta:
		model = Commit
		fields = ('start_time', )
from rest_framework.serializers import ModelSerializer
from base.models import CustomUser, Note
from rest_framework import serializers

# serializers
class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
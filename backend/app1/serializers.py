from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    # Adicione o campo 'password' e configure para escrita
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        # Extraia e remova 'password' dos dados validados
        password = validated_data.pop('password', None)

        # Crie o usuário sem definir a senha ainda
        user = CustomUser.objects.create(**validated_data)

        # Defina a senha e salve o usuário
        user.set_password(password)
        user.save()

        return user

    def update(self, instance, validated_data):
        # Atualize campos padrão
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)

        # Atualize a senha, se fornecida
        password = validated_data.get('password', None)
        if password is not None:
            instance.set_password(password)

        # Salve o usuário
        instance.save()

        return instance

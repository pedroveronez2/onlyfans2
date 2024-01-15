from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()

        # Tenta autenticar usando e-mail
        user = UserModel.objects.filter(email=username).first()

        # Se não for bem-sucedido, tenta autenticar usando nome de usuário
        if user is None:
            user = UserModel.objects.filter(username=username).first()

        # Se encontrarmos um usuário, verificamos a senha
        if user and user.check_password(password):
            return user
        return None

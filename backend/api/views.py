from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
import jwt, datetime
from .serializers import UserSerializer
from .models import User


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        # Convertendo a chave secreta para bytes
        secret_key = settings.SECRET_KEY.encode('utf-8')

        # Convertendo o ID diretamente para string
        payload = {
            'id': str(user.id),
            'username': user.name,  # Adicionando o nome do usuário ao payload
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        # Removendo o decode('utf-8') da linha abaixo
        token = jwt.encode(payload, secret_key, algorithm='HS256')

        # Criando o refresh token
        refresh = RefreshToken.for_user(user)
        refresh_token = str(refresh)

        # Enviando ambos os tokens na resposta
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token,
            'refresh_token': refresh_token,
        }
        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        # Forneça o algoritmo ao decodificar o token
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
    
    
class RefreshTokenView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            raise AuthenticationFailed('Refresh token not provided.')

        try:
            # Validar o refresh token
            refresh = RefreshToken(refresh_token)
            user_id = jwt.decode(refresh_token, verify=False)['user_id']
            user = User.objects.get(id=user_id)
            response = Response()

            if not user == user_id:
                raise AuthenticationFailed('User ID not found!')
            # Criar um novo token de acesso
            access_token = str(refresh.access_token)

            # Enviar o novo token na resposta
            response.data = {
                'access_token': access_token,
            }
            return response

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Refresh token has expired.')

        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid refresh token.')
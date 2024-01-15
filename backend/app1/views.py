from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login, logout
from .models import CustomUser
from .serializers import UserSerializer

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListView(APIView):
    def get(self, request, format=None):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class UserDetailsView(APIView):
    def get(self, request, id, format=None):
        user = get_object_or_404(CustomUser, id=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        username_or_email = request.data.get('username_or_email')
        password = request.data.get('password')

        user = None

        # Tenta autenticar usando e-mail
        user = authenticate(request, email=username_or_email, password=password)

        # Se não for bem-sucedido, tenta autenticar usando nome de usuário
        if user is None:
            user = authenticate(request, username=username_or_email, password=password)

        if user is not None:
            login(request, user)

            # Serializa os dados do usuário
            serializer = UserSerializer(user)
            user_data = serializer.data

            # Gera token de acesso e atualização
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Inclui os dados do usuário no payload de resposta
            response_data = {
                'token': access_token,
                'refresh_token': refresh_token,
                'user_data': user_data,
                'message': 'Login bem-sucedido',
            }

            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        try:
            # Realiza o logout usando a função 'logout' do Django
            logout(request)

            # Invalida o token de atualização
            refresh_token = request.data.get('refresh_token')
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({'message': 'Logout realizado com sucesso'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Erro ao realizar logout'}, status=status.HTTP_400_BAD_REQUEST)

from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import NoteSerializer, UserSerializer
from base.models import Note


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = {
        '/api/token'
        '/api/tokne/refresh'
        '/api/register'
    }
    
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        # Obtenha os dados enviados no corpo da solicitação
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # Verifique se os dados necessários estão presentes
        if not (username and email and password):
            return Response({'error': 'Username, email, and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Crie o usuário com os dados fornecidos
            user = User.objects.create_user(username=username, email=email, password=password, is_staff=True)
            
            # Verifique se o usuário foi criado com sucesso
            if user:
                return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Failed to create user.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
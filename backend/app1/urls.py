from django.urls import path
from .views import UserRegistrationView, UserListView, UserDetailsView, UserLoginView, UserLogoutView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register_user'),
    path('login/', UserLoginView.as_view(), name='login_user'),
    path('users/', UserListView.as_view(), name='list_users'),
    path('users/<str:user_id>/', UserDetailsView.as_view(), name='user_details'),
    path('logout/', UserLogoutView.as_view(), name='logout_user'),
]

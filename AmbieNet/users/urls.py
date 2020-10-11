"""Users URLs."""

#Django
from django.urls import path

# Views
from AmbieNet.users.views import UserSignUpApiView, UserLoginApiView


urlpatterns = [
    path('users/signup/', UserSignUpApiView.as_view(), name='signup'),
    path('users/login/', UserLoginApiView.as_view(), name='login'),
]

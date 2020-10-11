"""Users views."""

# Django rest framework
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

#Models
from AmbieNet.users.models import User,Profile

#Serializers
from AmbieNet.users.serializers import (
    UserModelSerializer, 
    UserLoginSerializer,
    UserSignUpSerializer
)

"""@api_view(['GET'])
def list_profiles(request):
    
    profiles = Profile.objects.filter(reputation>3)
    serializer = ProfileSerializer(profiles, many= True)

    return Response(data)"""


class UserSignUpApiView(APIView):
    
    def post(self, request, *args, **kwargs):
        serializer = UserSignUpSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserModelSerializer(user).data

        return Response(data, status = status.HTTP_201_CREATED)



class UserLoginApiView(APIView):

    def post(self, request, *args, **kwargs):

        serializer = UserLoginSerializer(data=request.data)
        """Se validan los datos contenidos en el data"""
        serializer.is_valid(raise_exception= True)

        """Se hace save de el token para obtener dicho token de la sesion"""
        user, token = serializer.save()

        data = {
            'user' :  UserModelSerializer(user).data,
            'token' : token
        }

        return Response(data, status=status.HTTP_201_CREATED)


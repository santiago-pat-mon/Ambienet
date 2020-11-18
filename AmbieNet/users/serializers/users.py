"""user sealizer"""
#Django
from django.contrib.auth import password_validation, authenticate
from django.core.validators import RegexValidator

#Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

#Models
from AmbieNet.users.models import User,Profile

#Serializers
from AmbieNet.users.serializers.profiles import ProfileModelSerializer

class UserModelSerializer(serializers.ModelSerializer):
    
    profile = ProfileModelSerializer(read_only=True)
    class Meta:
        """Meta class"""
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'profile',
            'is_staff'
        )

class UserSignUpSerializer(serializers.Serializer):

    username = serializers.CharField(
        min_length = 6,
        max_length = 20,
        validators = [UniqueValidator(queryset=User.objects.all())]
        )

    email = serializers.EmailField(
        validators = [UniqueValidator(queryset=User.objects.all())]
    )

    phone_regex = RegexValidator(
       
        regex=r'\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: +999999999. Up to 15 digits allowed."
    )

    phone_number = serializers.CharField(validators= [phone_regex])

    password = serializers.CharField(
        min_length=8, 
        max_length=16
    )

    first_name = serializers.CharField(min_length=3, max_length=20)
    last_name = serializers.CharField(min_length=3, max_length=20)

    latitude = serializers.FloatField()
    longitude = serializers.FloatField()

    def validate(self, data):
        passwd = data['password']
        password_validation.validate_password(passwd)
        return data
    
    def create(self, data):
        
        data_profile = {}
        data_profile['latitude'] = data['latitude']
        data_profile['longitude'] = data['longitude']

        data.pop('latitude')
        data.pop('longitude')

        user= User.objects.create_user(**data, is_verified=True)
        profile = Profile.objects.create(user=user, **data_profile)
        return user
        

class UserLoginSerializer(serializers.Serializer):
    """User login serializer"""
    username = serializers.CharField()
    password = serializers.CharField(min_length= 8, max_length = 64)
  
    """Se sobreescribe el metodo validate para hacer validacion propias"""


    """Los validators primero llaman al metodo validate y despues al create"""
    def validate (self, data):
        """Si las data si está bien autenticada, retorna el user"""
        user = authenticate(username= data['username'], password = data['password'])

        if not user:
            raise serializers.ValidationError('Invalid credentials')
        
        """ 
        El context es un atributo que da a entender en que contexto
        se desarrolla la peticion, entre esa info el usuario que la hace
        como ya se tiene detectado el usuario que va a hacer login, se 
        agrega este usuario al contexto
        """

        self.context['user']= user
        return data
  
    def create(self, data):
        """Generate or retrive new token."""
        
        """el metodo "get_or_create" es una auxiliar para el patron de 
        diseño singleton"""
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key







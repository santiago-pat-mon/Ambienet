"""post sealizer"""
#Django
from django.core import mail

#Django REST Framework
from rest_framework import serializers

#Models
from AmbieNet.posts.models import Post, Validator
from AmbieNet.users.models import User



class ValidatorCreateSerializer(serializers.ModelSerializer):

    user = serializers.CharField(
        min_length = 1,
        max_length = 50
    )

    post = serializers.CharField(
        min_length = 1,
        max_length = 50
    )
    class Meta:
        """Meta Class"""
        model = Validator
        
        fields = (
            'user',
            'post',
        )


    def validate(self,data):
        """Verify that validator does not exist."""
        user = User.objects.get(username=data['user'])
        post = Post.objects.get(id=data['post'])

        validator = Validator.objects.filter(
            user=user,
            post=post
        )
        if validator.exists():
            raise serializers.ValidationError('This user has validated this post before')
        return data

    def create(self, data):
        #Modificar esta busqueda manual, esto se debe sacar por el self, no entiendo porque pero asi dice don suaza :D
        
        user = User.objects.get(username=data['user'])
        post = Post.objects.get(id=data['post'])
        data['user']=user
        data['post']=post
        validator = Validator.objects.create(**data)
       
        return validator

    
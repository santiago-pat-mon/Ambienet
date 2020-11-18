#django 
from django.test import TestCase

from django.urls import reverse, path

# Django REST Framework
from rest_framework import status
from rest_framework.test import APITestCase

#Model
from AmbieNet.users.models import User, Profile
from AmbieNet.posts.models import Post

class LoginAPITestCase(APITestCase):
    """User login test case."""
    
    def setUp(self):
        """Test case setup, building de instances that are needes in the test case."""
        self.user = User.objects.create(
            username= 'saenzavs',
            email= 'saenz@mail.com',
            password= 'admin12345',
            phone_number= '31212231232',
            first_name= 'steven',
            last_name= 'saenz',
            
        )
        self.profile = Profile.objects.create(
            user= self.user,
            latitude= '1.23',
            longitude= '1.22'
            )
        self.post = Post.objects.create(
            user= self.user,
            profile = self.profile,
            photo='string',
            title='Stunami en la casa de saenz',
            description='se les creció el rio calarca',
            type_catastrophe='maremoto',
            latitude='3.2',
            longitude= '3.4'
        )
        

        self.data = {
            'username' : 'saenzavs',
            'password' : 'admin12345'
        }

        self.url = '/posts/'

    def test_code_generation(self):
    
        self.assertEqual('test','test')

    def test_persist_user(self):
        listUser = User.objects.all()

        self.assertEqual(len(listUser), 1)

    def test_persist_profile(self):
        listUser = Profile.objects.all()

        self.assertEqual(len(listUser), 1)

    def test_persistence_post(self):
        post = Post.objects.filter(user= self.user)
        self.assertIsNotNone(post)

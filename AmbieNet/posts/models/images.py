#Django
from django.db import models

#Utils
from AmbieNet.util.models import AmbieNetModel

class Image(AmbieNetModel):
    post = models.ForeignKey('posts.Post',on_delete=models.CASCADE )
    photo = models.ImageField(upload_to='posts/photos')

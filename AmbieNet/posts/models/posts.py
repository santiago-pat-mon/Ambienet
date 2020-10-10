#Django
from django.db import models

#Utils
from AmbieNet.util.models.ambienet import AmbieNetModel
from AmbieNet.users.models import User
from AmbieNet.users.models import Profile

class Post(AmbieNetModel):
    """
    Posts.
    Data from common posts of application, (posts of social network).
    """
    user = models.ForeignKey (User, on_delete = models.CASCADE)
    profile = models.ForeignKey (Profile, on_delete = models.PROTECT)
    
    title = models.CharField(max_length=60)
    
    description = models.CharField(max_length=255)

    mapa = models.ImageField(upload_to='posts/maps')




def __str__(self):
        """Return username."""
        return self.title



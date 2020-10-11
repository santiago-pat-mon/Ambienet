#Django
from django.db import models
#Utilities
from AmbieNet.util.models.ambienet import AmbieNetModel

class Profile(AmbieNetModel):
    """
    Profile.
    Data from common user of application, (users of social network).
    """

    user = models.OneToOneField('users.User', on_delete=models.CASCADE)

    picture = models.ImageField(
        'profile picture',
        upload_to='users/pictures/',
        blank=True,
        null=True
    )
    biography = models.TextField(max_length=500, blank=True)



    """User's ubication"""
    country = models.TextField(max_length=30)
    state = models.TextField(max_length=30)
    city = models.TextField(max_length=30)

    """User's ubication exactly"""
    latitud = models.FloatField(default=0.0)
    longitud = models.FloatField(default=0.0)

    reputation = models.FloatField(
        default=5.0,
        help_text="User's reputation based on the rides taken and offered."
    )
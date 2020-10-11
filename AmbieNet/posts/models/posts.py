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

    """User's Data """
    user = models.ForeignKey (User, on_delete = models.CASCADE)
    profile = models.ForeignKey (Profile, on_delete = models.PROTECT)
    









    """Post's Data """
    title = models.CharField(max_length=60, blank=False)
    description = models.CharField(max_length=255)
    type_catastrophe = models.CharField(blank=False, max_length=20)
    #"likes"
    validator_number = models.IntegerField(default=0)

    """Location Data """
    #if precision is not exactly change for DecimalField
    latitud = models.FloatField(default=0.0)
    longitud = models.FloatField(default=0.0)




    def __str__(self):
        """Return username."""
        return self.title



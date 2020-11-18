#Django
from django.db import models

#Utils
from AmbieNet.util.models.ambienet import AmbieNetModel
from AmbieNet.users.models import User
from AmbieNet.posts.models import Post

class Validator(AmbieNetModel):
    """
    Validator.
    post's validator.
    """

    user = models.ForeignKey (User, on_delete = models.CASCADE)
    post = models.ForeignKey (Post, on_delete = models.CASCADE)

    def __str__(self):
        """Return user."""
        return self.user 
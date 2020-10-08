# Django
from django.db import models
from djando.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
# Utils
from AmbieNet.util.models import AmbieNetModel


class User(AmbieNetModel, AbstractUser):
    """User model
    Extends from AbstractUser, and keeps the same usernamefield (username)
    """


    email = models.EmailField(
        'email address',
        unique=True,
        error_messages={
            'unique': 'A user with that email already exists.'
        }
    )

    phone_regex = RegexValidator(
       
        regex=r'\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: +999999999. Up to 15 digits allowed."
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)


    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    """All users get verified by email message."""
    is_verified = models.BooleanField(
        'verified',
        default=True,
        help_text='Set to true when the user have verified its email address.'
    )


     def __str__(self):
        """Return username."""
        return self.username

    def get_short_name(self):
        """Return username."""
        return self.username




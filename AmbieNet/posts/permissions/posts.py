
#Django REST Framework
from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
   """Allow the admin sometimes actions."""



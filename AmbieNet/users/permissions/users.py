"""user permissions"""

#Django REST Framework
from rest_framework.permissions import BasePermission

class IsAccountOwner(BasePermission):
    """Allow the user requisting to access only in its own object."""

    def has_object_permission(self, request, view, obj):
        return request.user == obj
        
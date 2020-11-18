"""User models admin."""

# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Models
from AmbieNet.users.models.users import User
from AmbieNet.users.models.profiles import Profile


class CustomUserAdmin(UserAdmin):
    """User model admin."""

    list_display = ('email', 'username', 'first_name', 'last_name','is_staff')
    list_filter = ('created', 'modified')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """Profile model admin."""

    list_display = ('pk','user', 'country','city','picture','latitude','longitude')
    search_fields = ('user__username', 'user__email', 'user__first_name', 'user__last_name')
    list_filter = ('reputation', 'country')

admin.site.register(User, CustomUserAdmin)
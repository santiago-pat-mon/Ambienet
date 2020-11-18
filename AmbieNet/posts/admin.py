"""Posts models admin."""

#Django
from django.contrib import admin

#Models
from AmbieNet.posts.models.posts import Post

@admin.register(Post)
class PostsAdmin(admin.ModelAdmin):
    """Post models admin."""
    list_display = ('id','title', 'description','latitude','longitude','photo')
    list_filter = ('type_catastrophe','validator_number')

from django.forms import ModelForm

from .models import User, Post

class PostForm(ModelForm):
    class Meta:
        model = Post
        exclude = ['likers', 'post_time', 'poster'] 
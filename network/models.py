from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    title = models.TextField(max_length=30)
    body = models.TextField(max_length=400)
    poster = models.ForeignKey(User, verbose_name=_(""), on_delete=models.CASCADE)
    likers = models.ManyToManyField(User, blank=True, related_name="liked_posts")

    def __str__(self):
        return f"{self.poster}'s post {self.title}"

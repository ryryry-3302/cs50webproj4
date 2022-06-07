from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    following = models.ManyToManyField("self", symmetrical=False, related_name="followers", blank=True )
    pass

class Post(models.Model):
    title = models.CharField(max_length=20)
    body = models.TextField(max_length=400)
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='network/static/network/photos', blank=True)
    likers = models.ManyToManyField(User, blank=True, related_name="liked_posts")

    def __str__(self):
        return f"{self.poster}'s post {self.title}"
    post_time = models.DateTimeField(auto_now_add=True, blank=True)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        
        self.post_time = timezone.now()
        return super(Post, self).save(*args, **kwargs)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "poster": self.poster.username,
            
            "liker": [liker.username for liker in self.likers.all()],
            "post_time": self.post_time.strftime("%Y-%m-%d%H:%M:%S")
        }

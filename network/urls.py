
from django.urls import path
from requests import post

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("all_posts", views.allposts, name="all_posts"),
    path("profile/<int:prof_id>", views.profile, name="profile"),
    path("follow", views.follow, name="follow"),
    path("following", views.following, name="following"),
    path("post/<int:post_id>", views.post, name="post"),
    path("like/<int:post_id>", views.like, name="like")
]

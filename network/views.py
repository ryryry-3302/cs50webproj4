from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .forms import PostForm
from .models import User, Post
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.decorators import login_required

def index(request):
    form = PostForm(request.POST or None, request.FILES or None)
    f = PostForm(request.POST, request.FILES)
    if f.is_valid():
        # save the form data to model
        result = f.save(commit=False)
        result.poster = request.user
        result.save()
        
    if request.method == 'POST':
        return HttpResponseRedirect(reverse("index"))

    return render(request, "network/index.html", {
        'form' :  form
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def allposts(request):
    form = PostForm(request.POST or None, request.FILES or None)
    f = PostForm(request.POST, request.FILES)
    if f.is_valid():
        # save the form data to model
        result = f.save(commit=False)
        result.poster = request.user
        result.save()
        
    if request.method == 'POST':
        return HttpResponseRedirect(reverse("index"))

    
    posts = Post.objects.order_by("-post_time").all()
    return render(request, "network/index.html", {
        "posts": posts,
        "form" : form
    })

def profile(request, prof_id):
    profile = User.objects.get(pk=prof_id)
    me = False
    if (profile.followers.filter(username=request.user.username).exists()):
        me = True

    return render(request, "network/profile.html", {
        "profile" : profile,
        "posts" : Post.objects.filter(poster=profile).order_by("-post_time").all(),
        "me" : me
    })

@login_required
@csrf_exempt
def follow(request):
    if request.method == "POST":
        data = json.loads(request.body)
        profile = data.get("prof_id")
        follow = data.get("follow")
        if follow:
            request.user.following.add(User.objects.get(pk=profile))
            return HttpResponse(status=204)
        else:
            request.user.following.remove(User.objects.get(pk=profile))
            return HttpResponse(status=204)
    if request.method == "GET":
        return HttpResponse(status=400)

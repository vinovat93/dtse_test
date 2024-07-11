from django.urls import path
from .views import Profile, CreateUser

urlpatterns = [
    path('profile/', Profile.as_view(), name='profile'),
    path('create/', CreateUser.as_view(), name='create'),
]
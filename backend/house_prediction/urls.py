from django.urls import path
from .views import HousePrediction

urlpatterns = [
    path('list/', HousePrediction.as_view(), name='list-house-prediction'),
    path('create/', HousePrediction.as_view(), name='create-house-prediction'),
]
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class HousePrediction(models.Model):

    longitude = models.FloatField(null=False)
    latitude = models.FloatField(null=False)
    housing_median_age = models.FloatField(null=False)
    total_rooms = models.FloatField(null=False)
    total_bedrooms = models.FloatField(null=False)
    population = models.FloatField(null=False)
    households = models.FloatField(null=False)
    median_income = models.FloatField(null=False)
    ocean_proximity = models.CharField(max_length=500,null=False)
    prediction = models.FloatField(null=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.id
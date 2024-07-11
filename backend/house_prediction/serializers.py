from rest_framework import serializers
from .models import HousePrediction
import joblib
import pandas as pd


class HousePredictionSerializer(serializers.Serializer):

    MODEL_NAME = 'house_prediction/model.joblib'

    longitude = serializers.FloatField(required=True)
    latitude = serializers.FloatField(required=True)
    housing_median_age = serializers.FloatField(required=True)
    total_rooms = serializers.FloatField(required=True)
    total_bedrooms = serializers.FloatField(required=True)
    population = serializers.FloatField(required=True)
    households = serializers.FloatField(required=True)
    median_income = serializers.FloatField(required=True)
    prediction = serializers.FloatField(read_only=True)
    ocean_proximity = serializers.CharField(required=True)
    created_at = serializers.DateTimeField(read_only=True, format='%Y-%m-%d %H:%M:%S')
    updated_at = serializers.DateTimeField(read_only=True, format='%Y-%m-%d %H:%M:%S')

    def create(self, validated_data,request=None):
        try:
            model = joblib.load(self.MODEL_NAME)
            data = {
                'longitude': [float(validated_data.get('longitude'))],
                'latitude': [float(validated_data.get('latitude'))],
                'housing_median_age': [float(validated_data.get('housing_median_age'))],
                'total_rooms': [float(validated_data.get('total_rooms'))],
                'total_bedrooms': [float(validated_data.get('total_bedrooms'))],
                'population': [float(validated_data.get('population'))],
                'households': [float(validated_data.get('households'))],
                'median_income': [float(validated_data.get('median_income'))],
                'ocean_proximity_<1H OCEAN': [0],
                'ocean_proximity_INLAND': [0],
                'ocean_proximity_ISLAND': [0],
                'ocean_proximity_NEAR BAY': [0],
                'ocean_proximity_NEAR OCEAN': [0]
            }


            if validated_data.get('ocean_proximity').upper() in ['<1H OCEAN','INLAND','ISLAND','NEAR BAY','NEAR OCEAN']:
                data['ocean_proximity_'+validated_data.get('ocean_proximity').upper()] = [1]


            df = pd.DataFrame().from_dict(data)
            Y = model.predict(df)
            return HousePrediction.objects.create(**{**validated_data,**{'prediction':Y[0]}})
        except:
            return False




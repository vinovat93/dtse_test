from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db import transaction
from house_prediction.models import HousePrediction
import csv

class Command(BaseCommand):
    help = "Generate data housing"
    #python manage.py generate_data_housing -u 1

    def add_arguments(self, parser):
        parser.add_argument('-u', '--user_id', type=int, help='User id')

    @transaction.atomic
    def handle(self, *args, **options):
        try:
            user = User.objects.get(pk=options.get("user_id"))
            if user:
                with open('house_prediction/management/commands/housing.csv', 'r') as csv_file:
                    reader = csv.reader(csv_file)
                    for row in reader:
                        HousePrediction.objects.create(
                            longitude= float(row[0]) if row[0] else 0,
                            latitude= float(row[1]) if row[1] else 0,
                            housing_median_age= float(row[2]) if row[2] else 0,
                            total_rooms=float(row[3]) if row[3] else 0,
                            total_bedrooms=float(row[4]) if row[4] else 0,
                            population=float(row[5]) if row[5] else 0,
                            households=float(row[6]) if row[6] else 0,
                            median_income=float(row[7]) if row[7] else 0,
                            median_house_value=float(row[8]) if row[8] else 0,
                            ocean_proximity=row[9],
                            user=user
                        )

        except Exception as e:
            print(e)
            pass
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
import mpld3
from dtse.response import MakeResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from sklearn.model_selection import train_test_split
from .models import HousePrediction
from .serializers import HousePredictionSerializer

# Create your views here.
class HousePrediction(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HousePredictionSerializer
    query = HousePrediction



    def prepare_data(self,input_data_path):

        df = df.sort_values('date', ascending=True)
        plt.plot(df['date'], df['count'])
        plt.xticks(rotation='vertical')

        df=pd.read_csv(input_data_path)
        df=df.dropna()
        # encode the categorical variables
        df = pd.get_dummies(df)

        df_features=df.drop(['median_house_value'],axis=1)
        y=df['median_house_value'].values

        X_train, X_test, y_train, y_test = train_test_split(df_features, y, test_size=0.2)
        return (X_train, X_test, y_train, y_test)


    def get(self,request):
        queryset = self.query.objects.filter(user=request.user).order_by('-created_at').all()[:100]
        list = self.serializer_class(queryset,many=True)

        data = {
            'created_at': [],
            'prediction': [],
        }

        for item in queryset:
            data['created_at'].append(item.created_at.strftime('%Y-%m-%d %H:%M:%S'))
            data['prediction'].append(item.prediction)


        return MakeResponse(data={'list':list.data,'chart':data}, status=200).response()


    def post(self, request):
        new_collection = self.serializer_class(data=request.data,many=False)
        if new_collection.is_valid():
            new_level = new_collection.create(validated_data={**new_collection.validated_data,**{'user':request.user}})
            return MakeResponse(data=new_level.id, status=200).response()
        else:
            return MakeResponse(data=new_collection.errors, status=404).response()
        return MakeResponse(data=[], status=404).response()
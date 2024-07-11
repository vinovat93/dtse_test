from rest_framework.permissions import AllowAny,IsAuthenticated
from dtse.response import MakeResponse
from rest_framework.views import APIView
from .serializers import UserSerializer
from django.core.management import call_command

class CreateUser(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request):
        new_collection = self.serializer_class(data=request.data,many=False)
        if new_collection.is_valid():
            new_level = new_collection.create(validated_data=new_collection.validated_data)
            #call_command('generate_data_housing', user_id=new_level.id) # with this command you can feed the house_prediction table
            return MakeResponse(data=new_level.id, status=200).response()
        else:
            return MakeResponse(data=new_collection.errors, status=404).response()
        return MakeResponse(data=[], status=404).response()


class Profile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return MakeResponse(data=[], status=200).response()
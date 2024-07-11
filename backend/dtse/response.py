from rest_framework.response import Response
from django.http import JsonResponse
class MakeResponse():
    def __init__(self,data=None,status=200):
        SUCCESS = 'Success'
        FAILED = 'Failed'
        self.data_content = {
            'message' : SUCCESS if status == 200 else FAILED,
            'status' : status,
            'data': data,
        }

    def response(self, status=200):
        return JsonResponse(self.data_content, status=self.data_content['status'])
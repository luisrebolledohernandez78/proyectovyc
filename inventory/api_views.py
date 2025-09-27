from rest_framework import generics
from inventory.models import PartUsage
from .api_serializers import PartUsageSerializer

class PartUsageCreate(generics.CreateAPIView):
    queryset = PartUsage.objects.all()
    serializer_class = PartUsageSerializer

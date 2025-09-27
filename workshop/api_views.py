from rest_framework import generics
from workshop.models import WorkOrder, RepairAction
from .api_serializers import WorkOrderSerializer, RepairActionSerializer

class WorkOrderListCreate(generics.ListCreateAPIView):
    queryset = WorkOrder.objects.all().order_by('-opened_at')
    serializer_class = WorkOrderSerializer

class RepairActionCreate(generics.CreateAPIView):
    queryset = RepairAction.objects.all()
    serializer_class = RepairActionSerializer

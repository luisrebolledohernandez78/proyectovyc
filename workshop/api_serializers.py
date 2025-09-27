from rest_framework import serializers
from workshop.models import WorkOrder, RepairAction
from core.models import Client, Vehicle, Technician

class WorkOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkOrder
        fields = ['id', 'number', 'client', 'vehicle', 'responsible_technician', 'status', 'opened_at', 'closed_at', 'description']
        read_only_fields = ['id', 'number', 'opened_at', 'closed_at']

class RepairActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepairAction
        fields = ['id', 'work_order', 'technician', 'description', 'hours', 'labor_rate', 'created_at']
        read_only_fields = ['id', 'created_at']

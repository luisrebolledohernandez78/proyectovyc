from rest_framework import serializers
from workshop.models import WorkOrder, RepairAction
from core.models import Client, Vehicle, Technician
from core.utils import clp

class WorkOrderSerializer(serializers.ModelSerializer):
    total_labor_fmt = serializers.SerializerMethodField()
    total_parts_fmt = serializers.SerializerMethodField()
    grand_total_fmt = serializers.SerializerMethodField()
    class Meta:
        model = WorkOrder
        fields = ['id','number','client','vehicle','responsible_technician','status',
                  'opened_at','closed_at','description',
                  'total_labor_fmt','total_parts_fmt','grand_total_fmt']
        read_only_fields = ['id', 'number', 'opened_at', 'closed_at']
    
    def get_total_labor_fmt(self, obj): return clp(obj.total_labor())
    def get_total_parts_fmt(self, obj): return clp(obj.total_parts())
    def get_grand_total_fmt(self, obj): return clp(obj.grand_total())
class RepairActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepairAction
        fields = ['id', 'work_order', 'technician', 'description', 'hours', 'labor_rate', 'created_at']
        read_only_fields = ['id', 'created_at']

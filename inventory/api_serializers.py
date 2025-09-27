from rest_framework import serializers
from inventory.models import PartUsage

class PartUsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartUsage
        fields = ['id', 'work_order', 'item', 'quantity', 'unit_price']
        read_only_fields = ['id']

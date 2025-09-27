from rest_framework import serializers
from inventory.models import PartUsage
from core.utils import clp

class PartUsageSerializer(serializers.ModelSerializer):
    total_fmt = serializers.SerializerMethodField()
    unit_price_fmt = serializers.SerializerMethodField()

    class Meta:
        model = PartUsage
        fields = ['id','work_order','item','quantity','unit_price','unit_price_fmt','total','total_fmt']

    def get_total_fmt(self, obj): return clp(obj.total)
    def get_unit_price_fmt(self, obj): return clp(obj.unit_price)
    
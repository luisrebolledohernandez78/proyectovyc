from rest_framework import serializers

from billing.models import Quote
from core.models import Client, Technician, Vehicle
from core.utils import clp
from inventory.models import PartUsage
from workshop.models import RepairAction, WorkOrder, Appointment, Diagnostic

class WorkOrderListSerializer(serializers.ModelSerializer):
    client_id = serializers.IntegerField(read_only=True)
    client_name = serializers.CharField(source="client.name", read_only=True)
    vehicle_id = serializers.IntegerField(read_only=True)
    vehicle_plate = serializers.CharField(source="vehicle.plate", read_only=True)
    total_labor_fmt = serializers.SerializerMethodField()
    total_parts_fmt = serializers.SerializerMethodField()
    grand_total_fmt = serializers.SerializerMethodField()
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = WorkOrder
        fields = [
            "id",
            "number",
            "status",
            "status_display",
            "opened_at",
            "closed_at",
            "client_id",
            "client_name",
            "vehicle_id",
            "vehicle_plate",
            "total_labor_fmt",
            "total_parts_fmt",
            "grand_total_fmt",
        ]
        read_only_fields = fields

    def get_total_labor_fmt(self, obj):
        return clp(obj.total_labor())

    def get_total_parts_fmt(self, obj):
        return clp(obj.total_parts())

    def get_grand_total_fmt(self, obj):
        return clp(obj.grand_total())

class ClientSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "name", "rut", "email", "phone", "address"]
        read_only_fields = fields

class VehicleSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ["id", "plate", "brand", "model", "year", "vin"]
        read_only_fields = fields

class TechnicianSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technician
        fields = ["id", "full_name", "specialty"]
        read_only_fields = fields

class RepairActionDetailSerializer(serializers.ModelSerializer):
    technician_name = serializers.CharField(source="technician.full_name", read_only=True)
    labor_cost = serializers.SerializerMethodField()
    labor_cost_fmt = serializers.SerializerMethodField()

    class Meta:
        model = RepairAction
        fields = [
            "id",
            "description",
            "technician",
            "technician_name",
            "hours",
            "labor_rate",
            "labor_cost",
            "labor_cost_fmt",
            "created_at",
        ]
        read_only_fields = fields

    def get_labor_cost(self, obj):
        return obj.labor_cost

    def get_labor_cost_fmt(self, obj):
        return clp(obj.labor_cost)

class PartUsageDetailSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source="item.name", read_only=True)
    sku = serializers.CharField(source="item.sku", read_only=True)
    total_fmt = serializers.SerializerMethodField()
    unit_price_fmt = serializers.SerializerMethodField()

    class Meta:
        model = PartUsage
        fields = [
            "id",
            "item",
            "item_name",
            "sku",
            "quantity",
            "unit_price",
            "unit_price_fmt",
            "total",
            "total_fmt",
        ]
        read_only_fields = fields

    def get_total_fmt(self, obj):
        return clp(obj.total)

    def get_unit_price_fmt(self, obj):
        return clp(obj.unit_price)

class QuoteSummarySerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    total_labor_fmt = serializers.SerializerMethodField()
    total_parts_fmt = serializers.SerializerMethodField()
    grand_total_fmt = serializers.SerializerMethodField()

    class Meta:
        model = Quote
        fields = [
            "id",
            "status",
            "status_display",
            "created_at",
            "notes",
            "total_labor_fmt",
            "total_parts_fmt",
            "grand_total_fmt",
        ]
        read_only_fields = fields

    def get_total_labor_fmt(self, obj):
        return clp(obj.total_labor())

    def get_total_parts_fmt(self, obj):
        return clp(obj.total_parts())

    def get_grand_total_fmt(self, obj):
        return clp(obj.grand_total())

class WorkOrderDetailSerializer(serializers.ModelSerializer):
    client = ClientSummarySerializer(read_only=True)
    vehicle = VehicleSummarySerializer(read_only=True)
    responsible_technician = TechnicianSummarySerializer(read_only=True)
    repairs = RepairActionDetailSerializer(many=True, read_only=True)
    parts = PartUsageDetailSerializer(source="parts_used", many=True, read_only=True)
    quote = QuoteSummarySerializer(read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    total_labor = serializers.SerializerMethodField()
    total_parts = serializers.SerializerMethodField()
    grand_total = serializers.SerializerMethodField()
    total_labor_fmt = serializers.SerializerMethodField()
    total_parts_fmt = serializers.SerializerMethodField()
    grand_total_fmt = serializers.SerializerMethodField()

    class Meta:
        model = WorkOrder
        fields = [
            "id",
            "number",
            "status",
            "status_display",
            "description",
            "opened_at",
            "closed_at",
            "client",
            "vehicle",
            "responsible_technician",
            "repairs",
            "parts",
            "quote",
            "total_labor",
            "total_parts",
            "grand_total",
            "total_labor_fmt",
            "total_parts_fmt",
            "grand_total_fmt",
        ]
        read_only_fields = fields

    def get_total_labor(self, obj):
        return float(obj.total_labor())

    def get_total_parts(self, obj):
        return float(obj.total_parts())

    def get_grand_total(self, obj):
        return float(obj.grand_total())

    def get_total_labor_fmt(self, obj):
        return clp(obj.total_labor())

    def get_total_parts_fmt(self, obj):
        return clp(obj.total_parts())

    def get_grand_total_fmt(self, obj):
        return clp(obj.grand_total())

class RepairActionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepairAction
        fields = [
            "id",
            "work_order",
            "technician",
            "description",
            "hours",
            "labor_rate",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ["id", "vehicle", "work_order", "scheduled_at", "notes", "created_at"]
        read_only_fields = ["id", "created_at"]

class DiagnosticCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnostic
        fields = ["id", "work_order", "details", "created_at"]
        read_only_fields = ["id", "created_at"]

class AppointmentSlotSerializer(serializers.Serializer):
    date = serializers.DateField()
    slots = serializers.ListField(child=serializers.CharField())

class DeliverySerializer(serializers.Serializer):
    delivered_at = serializers.DateTimeField(required=False)
    delivered_to = serializers.CharField(required=False, allow_blank=True)
    notes = serializers.CharField(required=False, allow_blank=True)



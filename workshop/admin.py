from django.contrib import admin
from .models import Appointment, WorkOrder, Diagnostic, RepairAction

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("vehicle", "scheduled_at", "created_at")
    search_fields = ("vehicle__plate", "vehicle__client__name")
    autocomplete_fields = ("vehicle",)

@admin.register(WorkOrder)
class WorkOrderAdmin(admin.ModelAdmin):
    list_display = ("number", "client", "vehicle", "status", "opened_at", "closed_at", "responsible_technician")
    search_fields = ("number", "client__name", "vehicle__plate")
    list_filter = ("status", "opened_at")
    date_hierarchy = "opened_at"
    autocomplete_fields = ("client", "vehicle", "responsible_technician")
    readonly_fields = ("number", "opened_at", "closed_at")

@admin.register(Diagnostic)
class DiagnosticAdmin(admin.ModelAdmin):
    list_display = ("work_order", "created_at")
    search_fields = ("work_order__number",)
    autocomplete_fields = ("work_order",)

@admin.register(RepairAction)
class RepairActionAdmin(admin.ModelAdmin):
    list_display = ("work_order", "description", "technician", "hours", "labor_rate", "created_at")
    search_fields = ("work_order__number", "description", "technician__full_name")
    list_filter = ("technician",)
    autocomplete_fields = ("work_order", "technician")

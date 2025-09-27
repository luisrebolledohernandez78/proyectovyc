from django.contrib import admin
from .models import Appointment, WorkOrder, Diagnostic, RepairAction

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("vehicle", "scheduled_at", "created_at")
    search_fields = ("vehicle__plate", "vehicle__client__name")
    autocomplete_fields = ("vehicle",)

@admin.register(WorkOrder)
class WorkOrderAdmin(admin.ModelAdmin):
    list_display = ("number", "client", "vehicle", "status", "opened_at",
                    "closed_at", "responsible_technician",
                    "total_labor_admin", "total_parts_admin", "grand_total_admin")
    search_fields = ("number", "client__name", "vehicle__plate")
    list_filter = ("status", "opened_at")
    date_hierarchy = "opened_at"
    autocomplete_fields = ("client", "vehicle", "responsible_technician")
    readonly_fields = ("number", "opened_at", "closed_at")
    # ya tienes search, filters, etc.
    def total_labor_admin(self, obj): return obj.total_labor()
    def total_parts_admin(self, obj): return obj.total_parts()
    def grand_total_admin(self, obj): return obj.grand_total()

    total_labor_admin.short_description = "Mano de obra"
    total_parts_admin.short_description = "Repuestos"
    grand_total_admin.short_description = "Total OT"

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

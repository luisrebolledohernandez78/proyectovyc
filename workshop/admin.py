from django.contrib import admin
from django.utils import timezone
from .models import Appointment, WorkOrder, Diagnostic, RepairAction
from billing.models import Quote  # importa el modelo
from django.urls import reverse
from django.utils.html import format_html
from core.utils import clp

class QuoteInline(admin.StackedInline):
    model = Quote
    extra = 0
    can_delete = False

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("vehicle", "scheduled_at", "created_at")
    search_fields = ("vehicle__plate", "vehicle__client__name")
    autocomplete_fields = ("vehicle",)

@admin.register(WorkOrder)
class WorkOrderAdmin(admin.ModelAdmin):
    list_display = ("number", "client", "vehicle", "status", "opened_at",
                    "closed_at", "responsible_technician",
                    "total_labor_admin", "total_parts_admin", "grand_total_admin", "quote_pdf_link")
    search_fields = ("number", "client__name", "vehicle__plate")
    list_filter = ("status", "opened_at")
    date_hierarchy = "opened_at"
    autocomplete_fields = ("client", "vehicle", "responsible_technician")
    readonly_fields = ("number", "opened_at", "closed_at")
    inlines = [QuoteInline]

    # ya tienes search, filters, etc.
    def total_labor_admin(self, obj): return clp(obj.total_labor())
    def total_parts_admin(self, obj): return clp(obj.total_parts())
    def grand_total_admin(self, obj): return clp(obj.grand_total())
    
    total_labor_admin.short_description = "Mano de obra"
    total_parts_admin.short_description = "Repuestos"
    grand_total_admin.short_description = "Total OT"

    def quote_pdf_link(self, obj):
        if hasattr(obj, "quote") and obj.quote:
            url = reverse("quote_pdf", args=[obj.quote.pk])
            return format_html('<a class="button" href="{}" target="_blank">PDF Cotización</a>', url)
        return "-"
    quote_pdf_link.short_description = "Cotización (PDF)"    

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

    def labor_cost_admin(self, obj): return clp(obj.labor_cost)
    labor_cost_admin.short_description = "Costo mano de obra"

def cerrar_ot(modeladmin, request, queryset):
    updated = 0
    for wo in queryset:
        if wo.status != wo.DONE:
            wo.status = wo.DONE
            wo.closed_at = timezone.now()
            wo.save(update_fields=["status", "closed_at"])
            updated += 1
    modeladmin.message_user(request, f"Órdenes cerradas: {updated}")

cerrar_ot.short_description = "Cerrar OT seleccionadas"
WorkOrderAdmin.actions = [cerrar_ot]

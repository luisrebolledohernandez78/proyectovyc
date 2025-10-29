from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html

from core.utils import clp
from .models import Quote

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = (
        "work_order",
        "status",
        "created_at",
        "total_labor_admin",
        "total_parts_admin",
        "grand_total_admin",
        "pdf_link",
    )
    list_filter = ("status", "created_at")
    search_fields = ("work_order__number",)
    autocomplete_fields = ("work_order",)
    readonly_fields = ("created_at",)

    def get_readonly_fields(self, request, obj=None):
        fields = list(super().get_readonly_fields(request, obj))
        if obj:
            fields.append("pdf_link")
        return fields

    def total_labor_admin(self, obj):
        return clp(obj.total_labor())

    def total_parts_admin(self, obj):
        return clp(obj.total_parts())

    def grand_total_admin(self, obj):
        return clp(obj.grand_total())

    total_labor_admin.short_description = "Total mano de obra"
    total_parts_admin.short_description = "Total repuestos"
    grand_total_admin.short_description = "Total cotizacion"

    def pdf_link(self, obj):
        if not getattr(obj, "pk", None):
            return "Guarda para ver PDF"
        url = reverse("quote_pdf", args=[obj.pk])
        return format_html('<a class="button" href="{}" target="_blank">Ver PDF</a>', url)

    pdf_link.short_description = "PDF"



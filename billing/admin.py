from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from .models import Quote

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = (
        "work_order", "status", "created_at",
        "total_labor_admin", "total_parts_admin", "grand_total_admin",
        "pdf_link",  # ← columna con botón
    )
    list_filter = ("status", "created_at")
    search_fields = ("work_order__number",)
    autocomplete_fields = ("work_order",)
    readonly_fields = ("created_at", "pdf_link")  # ← visible en el formulario

    # Totales
    def total_labor_admin(self, obj): return obj.total_labor()
    def total_parts_admin(self, obj): return obj.total_parts()
    def grand_total_admin(self, obj): return obj.grand_total()
    total_labor_admin.short_description = "Total mano de obra"
    total_parts_admin.short_description = "Total repuestos"
    grand_total_admin.short_description = "Total cotización"

    # Botón PDF (lista y formulario)
    def pdf_link(self, obj):
        url = reverse("quote_pdf", args=[obj.pk])
        return format_html('<a class="button" href="{}" target="_blank">Ver PDF</a>', url)
    pdf_link.short_description = "PDF"

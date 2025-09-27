from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from .models import Quote
from core.utils import clp


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
    readonly_fields = ("created_at",)  # ← visible en el formulario

      # Agregar pdf_link a readonly_fields SOLO cuando el objeto ya existe
    def get_readonly_fields(self, request, obj=None):
        fields = list(super().get_readonly_fields(request, obj))
        if obj:  # edición
            fields.append("pdf_link")
        return fields

    # Totales (formateados)
    def total_labor_admin(self, obj): 
        from core.utils import clp
        return clp(obj.total_labor())
    def total_parts_admin(self, obj): 
        from core.utils import clp
        return clp(obj.total_parts())
    def grand_total_admin(self, obj): 
        from core.utils import clp
        return clp(obj.grand_total())
    total_labor_admin.short_description = "Total mano de obra"
    total_parts_admin.short_description = "Total repuestos"
    grand_total_admin.short_description = "Total cotización"

    # Botón PDF (si ya hay pk). En alta muestra un mensaje.
    def pdf_link(self, obj):
        if not getattr(obj, "pk", None):
            return "Guarda para ver PDF"
        url = reverse("quote_pdf", args=[obj.pk])
        return format_html('<a class="button" href="{}" target="_blank">Ver PDF</a>', url)
    pdf_link.short_description = "PDF"

from django.contrib import admin
from .models import Quote

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ("work_order", "status", "created_at", "total_labor_admin", "total_parts_admin", "grand_total_admin")
    list_filter = ("status", "created_at")
    search_fields = ("work_order__number",)
    autocomplete_fields = ("work_order",)
    readonly_fields = ("created_at",)

    def total_labor_admin(self, obj): return obj.total_labor()
    def total_parts_admin(self, obj): return obj.total_parts()
    def grand_total_admin(self, obj): return obj.grand_total()

    total_labor_admin.short_description = "Total mano de obra"
    total_parts_admin.short_description = "Total repuestos"
    grand_total_admin.short_description = "Total cotización"

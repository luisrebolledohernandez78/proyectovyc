from django.contrib import admin
from .models import InventoryItem, PartUsage
from core.utils import clp


@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ("sku", "name", "stock", "unit_cost_admin")
    search_fields = ("sku", "name")
    ordering = ("name",)

    def unit_cost_admin(self, obj):
        return clp(obj.unit_cost)
    unit_cost_admin.short_description = "Costo unitario"    
@admin.register(PartUsage)
class PartUsageAdmin(admin.ModelAdmin):
    list_display = ("work_order", "item", "quantity", "unit_price_admin", "total_admin")
    search_fields = ("work_order__number", "item__name")
    autocomplete_fields = ("work_order", "item")

    def unit_price_admin(self, obj): return clp(obj.unit_price)
    def total_admin(self, obj): return clp(obj.total)
    unit_price_admin.short_description = "Precio unit."
    total_admin.short_description = "Total"
    
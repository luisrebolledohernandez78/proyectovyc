from django.contrib import admin
from .models import InventoryItem, PartUsage

@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ("sku", "name", "stock", "unit_cost")
    search_fields = ("sku", "name")
    ordering = ("name",)

@admin.register(PartUsage)
class PartUsageAdmin(admin.ModelAdmin):
    list_display = ("work_order", "item", "quantity", "unit_price", "total")
    search_fields = ("work_order__number", "item__name")
    autocomplete_fields = ("work_order", "item")

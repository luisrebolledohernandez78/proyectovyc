from django.contrib import admin
from .models import Client, Technician, Vehicle

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ("name", "rut", "client_type", "email", "phone", "created_at")
    search_fields = ("name", "rut", "email", "phone")
    list_filter = ("client_type",)
    ordering = ("name",)

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    list_display = ("full_name", "specialty", "active", "hired_at")
    search_fields = ("full_name", "specialty")
    list_filter = ("active",)

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ("plate", "client", "brand", "model", "year")
    search_fields = ("plate", "client__name", "brand", "model", "vin")
    list_filter = ("brand", "year")
    autocomplete_fields = ("client",)

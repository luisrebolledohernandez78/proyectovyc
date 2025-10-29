from django.db import models
from workshop.models import WorkOrder

class InventoryItem(models.Model):
    sku = models.CharField("SKU", max_length=50, unique=True)
    name = models.CharField("Nombre repuesto", max_length=150)
    stock = models.IntegerField("Stock actual", default=0)
    unit_cost = models.DecimalField("Costo unitario", max_digits=12, decimal_places=2, default=0)

    class Meta:
        verbose_name = "Repuesto"
        verbose_name_plural = "Repuestos"
        ordering = ["name"]

    def __str__(self):
        return f"{self.sku} - {self.name}"

    def reduce_stock(self, qty):
        if qty > self.stock:
            raise ValueError("No hay stock suficiente")
        self.stock -= qty
        self.save(update_fields=["stock"])

class PartUsage(models.Model):
    work_order = models.ForeignKey(
        WorkOrder, on_delete=models.CASCADE,
        related_name="parts_used", verbose_name="OT"
    )
    item = models.ForeignKey(
        InventoryItem, on_delete=models.PROTECT,
        verbose_name="Repuesto"
    )
    quantity = models.PositiveIntegerField("Cantidad", default=1)
    unit_price = models.DecimalField(
        "Precio aplicado", max_digits=12, decimal_places=2, default=0,
        help_text="Precio unitario aplicado a la OT (puede diferir del costo)"
    )

    class Meta:
        verbose_name = "Uso de repuesto en OT"
        verbose_name_plural = "Usos de repuestos en OTs"

    def __str__(self):
        return f"{self.item.name} x{self.quantity} en {self.work_order.number}"

    @property
    def total(self):
        return (self.quantity or 0) * (self.unit_price or 0)


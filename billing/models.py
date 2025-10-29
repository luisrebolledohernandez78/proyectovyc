from django.db import models

from workshop.models import WorkOrder

class Quote(models.Model):
    PENDING = "PEND"
    APPROVED = "APPR"
    REJECTED = "REJ"
    STATUS = [
        (PENDING, "Pendiente"),
        (APPROVED, "Aprobada"),
        (REJECTED, "Rechazada"),
    ]

    work_order = models.OneToOneField(
        WorkOrder,
        on_delete=models.CASCADE,
        related_name="quote",
        verbose_name="OT",
    )
    created_at = models.DateTimeField("Creada", auto_now_add=True)
    status = models.CharField("Estado", max_length=5, choices=STATUS, default=PENDING)
    notes = models.TextField("Notas", blank=True, null=True)

    class Meta:
        verbose_name = "Cotizacion"
        verbose_name_plural = "Cotizaciones"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Cotizacion {self.work_order.number}"

    def total_labor(self):
        return self.work_order.total_labor()

    def total_parts(self):
        return self.work_order.total_parts()

    def grand_total(self):
        return self.work_order.grand_total()

class Payment(models.Model):
    CASH = "CASH"
    CARD = "CARD"
    TRANSFER = "BANK"
    METHODS = [
        (CASH, "Efectivo"),
        (CARD, "Tarjeta"),
        (TRANSFER, "Transferencia"),
    ]

    work_order = models.ForeignKey(
        WorkOrder,
        on_delete=models.CASCADE,
        related_name="payments",
        verbose_name="OT",
    )
    amount = models.DecimalField("Monto", max_digits=12, decimal_places=2)
    method = models.CharField("Método", max_length=10, choices=METHODS, default=CASH)
    paid_at = models.DateTimeField("Fecha pago", auto_now_add=True)
    receipt_file = models.FileField("Comprobante", upload_to="payments/", null=True, blank=True)
    notes = models.TextField("Notas", blank=True, null=True)

    class Meta:
        verbose_name = "Pago"
        verbose_name_plural = "Pagos"
        ordering = ["-paid_at"]

    def __str__(self):
        return f"Pago {self.amount} - {self.work_order.number}"



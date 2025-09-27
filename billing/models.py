from django.db import models
from workshop.models import WorkOrder

class Quote(models.Model):
    PENDING = 'PEND'
    APPROVED = 'APPR'
    REJECTED = 'REJ'
    STATUS = [(PENDING,'Pendiente'),(APPROVED,'Aprobada'),(REJECTED,'Rechazada')]

    work_order = models.OneToOneField(WorkOrder, on_delete=models.CASCADE, related_name='quote', verbose_name="OT")
    created_at = models.DateTimeField("Creada", auto_now_add=True)
    status = models.CharField("Estado", max_length=5, choices=STATUS, default=PENDING)
    notes = models.TextField("Notas", blank=True, null=True)

    class Meta:
        verbose_name = "Cotización"
        verbose_name_plural = "Cotizaciones"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Cotización {self.work_order.number}"

    # Totales calculados en base a la OT (mano de obra + repuestos)
    def total_labor(self):
        return self.work_order.total_labor()

    def total_parts(self):
        return self.work_order.total_parts()

    def grand_total(self):
        return self.work_order.grand_total()

from django.db import models
from django.utils import timezone
from core.models import Client, Vehicle, Technician
from django.db.models import Sum, F, DecimalField, ExpressionWrapper


class Appointment(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='appointments', verbose_name="Vehículo")
    scheduled_at = models.DateTimeField("Fecha/Hora agendada")
    notes = models.TextField("Notas", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Cita"
        verbose_name_plural = "Citas"
        ordering = ["-scheduled_at"]

    def __str__(self):
        return f"Cita {self.vehicle.plate} @ {self.scheduled_at:%Y-%m-%d %H:%M}"


class WorkOrder(models.Model):
    OPEN = 'OPEN'
    IN_PROGRESS = 'PROG'
    DONE = 'DONE'
    CANCELED = 'CANC'
    STATUS = [
        (OPEN, "Abierta"),
        (IN_PROGRESS, "En Proceso"),
        (DONE, "Cerrada"),
        (CANCELED, "Cancelada"),
    ]
    def total_labor(self):
        expr = ExpressionWrapper(F('hours') * F('labor_rate'),
                                 output_field=DecimalField(max_digits=12, decimal_places=2))
        return self.repairs.aggregate(total=Sum(expr))['total'] or 0

    def total_parts(self):
        expr = ExpressionWrapper(F('quantity') * F('unit_price'),
                                 output_field=DecimalField(max_digits=12, decimal_places=2))
        return self.parts_used.aggregate(total=Sum(expr))['total'] or 0

    def grand_total(self):
        return (self.total_labor() or 0) + (self.total_parts() or 0)

    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name='work_orders', verbose_name="Cliente")
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT, related_name='work_orders', verbose_name="Vehículo")
    responsible_technician = models.ForeignKey(
        Technician, on_delete=models.SET_NULL, null=True, blank=True, related_name='work_orders',
        verbose_name="Técnico responsable"
    )

    # Número legible de OT (se rellenará automáticamente como OT-000001)
    number = models.CharField("Nº OT", max_length=20, unique=True, blank=True)

    opened_at = models.DateTimeField("Apertura", auto_now_add=True)
    closed_at = models.DateTimeField("Cierre", blank=True, null=True)
    status = models.CharField("Estado", max_length=5, choices=STATUS, default=OPEN)
    description = models.TextField("Descripción/solicitud", blank=True, null=True)

    class Meta:
        verbose_name = "Orden de Trabajo"
        verbose_name_plural = "Órdenes de Trabajo"
        ordering = ["-opened_at"]

    def __str__(self):
        return self.number or f"OT (sin número) - {self.vehicle.plate}"

    def close(self):
        self.status = self.DONE
        self.closed_at = timezone.now()
        self.save(update_fields=["status", "closed_at"])


class Diagnostic(models.Model):
    work_order = models.OneToOneField(WorkOrder, on_delete=models.CASCADE, related_name='diagnostic', verbose_name="OT")
    details = models.TextField("Detalle diagnóstico")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Diagnóstico"
        verbose_name_plural = "Diagnósticos"

    def __str__(self):
        return f"Diagnóstico {self.work_order.number}"


class RepairAction(models.Model):
    work_order = models.ForeignKey(WorkOrder, on_delete=models.CASCADE, related_name='repairs', verbose_name="OT")
    technician = models.ForeignKey(Technician, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Técnico")
    description = models.CharField("Actividad", max_length=200)
    hours = models.DecimalField("Horas", max_digits=6, decimal_places=2, default=0)
    labor_rate = models.DecimalField("Tarifa $/h", max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Actividad de reparación (mano de obra)"
        verbose_name_plural = "Actividades de reparación"

    def __str__(self):
        return f"{self.description} ({self.work_order.number})"

    @property
    def labor_cost(self):
        return (self.hours or 0) * (self.labor_rate or 0)

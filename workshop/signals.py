from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import WorkOrder

@receiver(post_save, sender=WorkOrder)
def set_workorder_number(sender, instance: WorkOrder, created, **kwargs):
    if created and not instance.number:
        # Formato basado en el ID autoincremental
        instance.number = f"OT-{instance.id:06d}"
        # update_fields para evitar recursión de señales
        WorkOrder.objects.filter(pk=instance.pk).update(number=instance.number)

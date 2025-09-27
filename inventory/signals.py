from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from .models import PartUsage, InventoryItem

# Guardar la cantidad anterior antes de actualizar (para ajustar stock correctamente)
@receiver(pre_save, sender=PartUsage)
def partusage_store_old_qty(sender, instance: PartUsage, **kwargs):
    if instance.pk:
        old = PartUsage.objects.get(pk=instance.pk)
        instance._old_quantity = old.quantity
        instance._old_item_id = old.item_id
    else:
        instance._old_quantity = 0
        instance._old_item_id = None

@receiver(post_save, sender=PartUsage)
def partusage_adjust_stock_on_save(sender, instance: PartUsage, created, **kwargs):
    # Si es nuevo uso → descontar
    if created:
        item: InventoryItem = instance.item
        if instance.quantity > item.stock:
            # Puedes cambiar esto por ValidationError si prefieres bloquear
            item.stock = 0
        else:
            item.stock -= instance.quantity
        item.save(update_fields=["stock"])
        return

    # Si es actualización → devolver la cantidad anterior y descontar la nueva
    if instance._old_item_id and instance._old_item_id != instance.item_id:
        # Cambió el repuesto: devolver stock al item antiguo
        old_item = InventoryItem.objects.get(pk=instance._old_item_id)
        old_item.stock += instance._old_quantity
        old_item.save(update_fields=["stock"])
        # Y descontar del nuevo
        new_item = instance.item
        qty = instance.quantity
        if qty > new_item.stock:
            new_item.stock = 0
        else:
            new_item.stock -= qty
        new_item.save(update_fields=["stock"])
    else:
        # Mismo item, cantidad distinta
        diff = instance.quantity - instance._old_quantity
        if diff != 0:
            item = instance.item
            if diff > 0:
                # más consumo
                if diff > item.stock:
                    item.stock = 0
                else:
                    item.stock -= diff
            else:
                # devolución
                item.stock += (-diff)
            item.save(update_fields=["stock"])

@receiver(post_delete, sender=PartUsage)
def partusage_return_stock_on_delete(sender, instance: PartUsage, **kwargs):
    item: InventoryItem = instance.item
    item.stock += instance.quantity
    item.save(update_fields=["stock"])

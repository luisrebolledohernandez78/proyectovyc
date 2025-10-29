from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "work_order", "amount", "method", "paid_at", "receipt_file", "notes"]
        read_only_fields = ["id", "paid_at"]


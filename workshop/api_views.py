from django.db.models import Q
from django.http import Http404
from rest_framework import generics

from workshop.models import RepairAction, WorkOrder, Appointment, Diagnostic
from billing.models import Payment as BillingPayment
from .api_serializers import (
    RepairActionCreateSerializer,
    WorkOrderDetailSerializer,
    WorkOrderListSerializer,
    AppointmentSlotSerializer,
    AppointmentSerializer,
    DiagnosticCreateSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date, timedelta
import calendar
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from billing.api_serializers import PaymentSerializer


class WorkOrderListCreate(generics.ListCreateAPIView):
    serializer_class = WorkOrderListSerializer

    def get_queryset(self):
        queryset = (
            WorkOrder.objects.select_related("client", "vehicle")
            .prefetch_related("repairs", "parts_used")
            .order_by("-opened_at")
        )

        number = self.request.query_params.get("number")
        if number:
            return queryset.filter(number__iexact=number)

        search = self.request.query_params.get("search")
        if search:
            search = search.strip()
            if search:
                queryset = queryset.filter(
                    Q(number__icontains=search)
                    | Q(client__name__icontains=search)
                    | Q(vehicle__plate__icontains=search)
                )

        return queryset


class WorkOrderDetail(generics.RetrieveAPIView):
    serializer_class = WorkOrderDetailSerializer
    lookup_url_kwarg = "identifier"

    def get_queryset(self):
        return (
            WorkOrder.objects.select_related("client", "vehicle", "responsible_technician", "quote")
            .prefetch_related(
                "repairs__technician",
                "parts_used__item",
            )
            .order_by("-opened_at")
        )

    def get_object(self):
        identifier = self.kwargs.get(self.lookup_url_kwarg)
        queryset = self.get_queryset()

        if identifier is None:
            raise Http404

        if str(identifier).isdigit():
            return generics.get_object_or_404(queryset, pk=int(identifier))

        return generics.get_object_or_404(queryset, number__iexact=identifier)


class RepairActionCreate(generics.CreateAPIView):
    queryset = RepairAction.objects.all()
    serializer_class = RepairActionCreateSerializer


class AppointmentSlots(APIView):
    """Return available appointment slots: 2 slots per weekday (morning, afternoon)."""

    def get(self, request):
        # default range: next 14 days
        days = int(request.query_params.get("days", 14))
        today = date.today()
        results = []
        for i in range(days):
            d = today + timedelta(days=i)
            # skip weekends
            if d.weekday() >= 5:
                continue
            # two slots: '09:00' and '15:00'
            results.append({"date": d, "slots": ["09:00", "15:00"]})

        serializer = AppointmentSlotSerializer(results, many=True)
        return Response(serializer.data)


class AppointmentListCreate(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        qs = Appointment.objects.select_related("vehicle", "work_order").order_by("-scheduled_at")
        vehicle = self.request.query_params.get("vehicle")
        if vehicle:
            qs = qs.filter(vehicle_id=vehicle)
        return qs


class DiagnosticCreate(generics.CreateAPIView):
    serializer_class = DiagnosticCreateSerializer


class PaymentCreate(generics.CreateAPIView):
    # Use billing serializer
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = PaymentSerializer
    queryset = BillingPayment.objects.all()


class WorkOrderDeliver(APIView):
    def post(self, request, pk):
        try:
            wo = WorkOrder.objects.get(pk=pk)
        except WorkOrder.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        delivered_at = request.data.get("delivered_at")
        delivered_to = request.data.get("delivered_to")
        notes = request.data.get("notes")

        if delivered_at:
            wo.delivered_at = delivered_at
        if delivered_to:
            wo.delivered_to = delivered_to
        wo.status = WorkOrder.DONE
        wo.closed_at = wo.closed_at or None
        wo.save()
        return Response({"ok": True})

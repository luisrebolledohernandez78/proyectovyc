from django.db.models import Q
from django.http import Http404
from rest_framework import generics

from workshop.models import RepairAction, WorkOrder
from .api_serializers import (
    RepairActionCreateSerializer,
    WorkOrderDetailSerializer,
    WorkOrderListSerializer,
    AppointmentSlotSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date, timedelta
import calendar


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

from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Count
from django.views.generic import TemplateView

from .models import WorkOrder

class WorkshopHomeView(LoginRequiredMixin, TemplateView):
    """Render the workshop dashboard mirroring the clients module layout."""

    template_name = "admin/workshop_module.html"
    login_url = "login"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        work_orders = (
            WorkOrder.objects.select_related("client", "vehicle")
            .order_by("-opened_at")[:10]
        )

        status_totals = WorkOrder.objects.values("status").annotate(count=Count("id"))
        totals_by_status = {item["status"]: item["count"] for item in status_totals}
        status_summary = [
            {"code": code, "label": label, "count": totals_by_status.get(code, 0)}
            for code, label in WorkOrder.STATUS
        ]

        context.update(
            {
                "module_name": "Mantenimiento y Reparacion de Vehiculos",
                "module_summary": "Gestiona el flujo completo del taller: agendamiento, diagnosticos, reparaciones y entregas.",
                "work_orders": work_orders,
                "status_summary": status_summary,
            }
        )
        return context


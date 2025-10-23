from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpRequest
import json


@csrf_exempt
def login_api(request: HttpRequest):
    if request.method != "POST":
        return JsonResponse({"detail": "Metodo no permitido"}, status=405)

    if request.content_type == "application/json":
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            data = {}
    else:
        data = request.POST

    username = data.get("username", "").strip()
    password = data.get("password", "")

    user = authenticate(request, username=username, password=password)
    if user is None or not user.is_active:
        return JsonResponse({"detail": "Credenciales invalidas"}, status=400)

    login(request, user)

    return JsonResponse(
        {
            "username": user.username,
            "is_superuser": user.is_superuser,
            "is_staff": user.is_staff,
        }
    )


@csrf_exempt
def logout_api(request: HttpRequest):
    if request.method != "POST":
        return JsonResponse({"detail": "Metodo no permitido"}, status=405)
    logout(request)
    return JsonResponse({"detail": "Sesion finalizada"})


class IntranetHomeView(LoginRequiredMixin, UserPassesTestMixin, TemplateView):
    template_name = "admin/intranet_home.html"
    login_url = "login"

    def test_func(self):
        return self.request.user.is_superuser


class ModulePlaceholderView(LoginRequiredMixin, UserPassesTestMixin, TemplateView):
    template_name = "admin/module_placeholder.html"
    module_name = ""
    module_summary = ""
    login_url = "login"

    def test_func(self):
        return self.request.user.is_superuser

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(
            {
                "module_name": "Mantenimiento y Reparación de Vehículos",
                "module_summary": "Coordina diagnósticos, reparaciones y mantenimientos preventivos de la flota."
            }
        )
        return context


class VehicleMaintenanceView(ModulePlaceholderView):
    template_name = "admin/vehicle_maintenance.html"
    module_name = "Mantenimiento y Reparación de Vehículos"
    module_summary = (
        "Coordina diagnósticos, reparaciones y mantenimientos preventivos de la flota."
    )


class ClientsModuleView(ModulePlaceholderView):
    template_name = "admin/clients_module.html"
    module_name = "Clientes"
    module_summary = (
        "Visualiza los contratos activos, historial de proyectos y datos de contacto."
    )


class UserManagementView(LoginRequiredMixin, UserPassesTestMixin, View):
    template_name = "admin/user_management.html"
    permission_denied_template = "admin/user_forbidden.html"
    login_url = "login"

    def test_func(self):
        return self.request.user.is_superuser

    def handle_no_permission(self):
        if not self.request.user.is_authenticated:
            return super().handle_no_permission()
        return render(self.request, self.permission_denied_template, status=403)

    def get(self, request):
        users = User.objects.order_by("username")
        resolver = getattr(request, "resolver_match", None)
        show_full_management = resolver and resolver.url_name in {
            "user-management-crud",
            "user-access",
        }
        context = {
            "users": users,
            "show_full_management": show_full_management,
        }
        return render(request, self.template_name, context)

    def post(self, request):
        action = request.POST.get("action")

        try:
            if action == "create":
                self._create_user(request)
            elif action == "update":
                self._update_user(request)
            elif action == "delete":
                self._delete_user(request)
            else:
                messages.error(request, "Accion no reconocida.")
        except Exception as exc:
            messages.error(request, f"Ocurrio un problema: {exc}")

        return redirect(request.path)

    # --- helpers ---------------------------------------------------------
    def _create_user(self, request):
        username = (request.POST.get("username") or "").strip()
        email = (request.POST.get("email") or "").strip()
        password = request.POST.get("password") or ""
        is_staff = request.POST.get("is_staff") == "on"

        if not username or not password:
            messages.error(request, "Debes indicar usuario y contraseña.")
            return

        if User.objects.filter(username=username).exists():
            messages.error(request, "Ya existe un usuario con ese nombre.")
            return

        user = User.objects.create_user(username=username, email=email, password=password)
        if is_staff:
            user.is_staff = True
            user.save(update_fields=["is_staff"])

        messages.success(request, f"Usuario {username} creado correctamente.")

    def _update_user(self, request):
        user = get_object_or_404(User, pk=request.POST.get("user_id"))

        if user == request.user and request.POST.get("is_active") != "on":
            messages.error(request, "No puedes desactivar tu propia cuenta.")
            return

        user.email = (request.POST.get("email") or "").strip()
        user.is_staff = request.POST.get("is_staff") == "on"
        user.is_active = request.POST.get("is_active") == "on"

        new_password = request.POST.get("new_password")
        if new_password:
            user.set_password(new_password)

        user.save()
        messages.success(request, f"Usuario {user.username} actualizado.")

    def _delete_user(self, request):
        user = get_object_or_404(User, pk=request.POST.get("user_id"))

        if user == request.user:
            messages.error(request, "No puedes eliminar tu propia cuenta.")
            return

        username = user.username
        user.delete()
        messages.success(request, f"Usuario {username} eliminado.")


class UserAccessView(UserManagementView):
    template_name = "admin/user_access.html"

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse_lazy
from django.views import View
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
        return render(request, self.template_name, {"users": users})

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

        return redirect("user-management")

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

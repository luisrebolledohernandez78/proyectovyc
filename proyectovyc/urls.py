"""
URL configuration for proyectovyc project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth.views import LogoutView, LoginView
from django.urls import path
from django.views.generic import RedirectView
from billing.views import quote_pdf
from workshop.api_views import WorkOrderListCreate, WorkOrderDetail, RepairActionCreate
from workshop.api_views import AppointmentSlots
from workshop.api_views import AppointmentListCreate, DiagnosticCreate, PaymentCreate, WorkOrderDeliver
from inventory.api_views import PartUsageCreate
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from core.views import (
    ClientsModuleView,
    IntranetHomeView,
    UserAccessView,
    UserManagementView,
    VehicleMaintenanceView,
    login_api,
    logout_api,
)

urlpatterns = [
    path('', LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
    path('usuarios/', IntranetHomeView.as_view(), name='intranet-home'),
    path('usuarios/gestion-interna/', UserManagementView.as_view(), name='user-management'),
    path('usuarios/gestion-interna/gestion/', UserAccessView.as_view(), name='user-management-crud'),
    path('usuarios/accesos/', UserAccessView.as_view(), name='user-access'),
    # During local development redirect the vehicle maintenance route to the SPA dev server.
    path('usuarios/mantenimiento/', RedirectView.as_view(url='http://localhost:5173/taller', permanent=False), name='vehicle-maintenance'),
    path('usuarios/clientes/', ClientsModuleView.as_view(), name='clients-module'),
    path('api/auth/login/', login_api, name='api_login'),
    path('api/auth/logout/', logout_api, name='api_logout'),
    path('admin/', admin.site.urls),

    # Esquema OpenAPI y Swagger UI
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    # PDF de cotizaciones
    path('billing/quote/<int:pk>/pdf/', quote_pdf, name='quote_pdf'),

     # API
    path('api/workorders/', WorkOrderListCreate.as_view(), name='api_workorders'),
    path('api/workorders/<str:identifier>/', WorkOrderDetail.as_view(), name='api_workorders_detail'),
    path('api/repairs/', RepairActionCreate.as_view(), name='api_repairs_create'),
    path('api/parts/', PartUsageCreate.as_view(), name='api_parts_create'),
    path('api/appointments/slots/', AppointmentSlots.as_view(), name='api_appointments_slots'),
    path('api/appointments/', AppointmentListCreate.as_view(), name='api_appointments'),
    path('api/workorders/<int:pk>/diagnostic/', DiagnosticCreate.as_view(), name='api_workorder_diagnostic'),
    path('api/workorders/<int:pk>/payments/', PaymentCreate.as_view(), name='api_workorder_payments'),
    path('api/workorders/<int:pk>/deliver/', WorkOrderDeliver.as_view(), name='api_workorder_deliver'),
]

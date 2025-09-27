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
from django.urls import path
from workshop.api_views import WorkOrderListCreate, RepairActionCreate
from inventory.api_views import PartUsageCreate


urlpatterns = [
    path('admin/', admin.site.urls),
     # API
    path('api/workorders/', WorkOrderListCreate.as_view(), name='api_workorders'),
    path('api/repairs/', RepairActionCreate.as_view(), name='api_repairs_create'),
    path('api/parts/', PartUsageCreate.as_view(), name='api_parts_create'),
]

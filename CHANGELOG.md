# Changelog
Todas las modificaciones importantes de este proyecto serán documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-27
### 🚀 Primera versión estable (MVP VyC)
- **Core**
  - Gestión de Clientes (con validación de RUT).
  - Gestión de Técnicos y Vehículos.
- **Workshop**
  - Órdenes de Trabajo con numeración automática (`OT-000001`).
  - Citas, Diagnósticos y Actividades de Reparación.
  - Totales de mano de obra, repuestos y total OT.
  - Acción de admin para cerrar OT con fecha de cierre.
- **Inventory**
  - Repuestos con SKU, stock y costo unitario.
  - Uso de repuestos en OT (`PartUsage`) con señales para ajustar stock automáticamente.
- **Billing**
  - Cotizaciones asociadas a OT.
  - Totales calculados (mano de obra + repuestos).
  - Exportación a PDF de cotización con ReportLab.
  - Botón **“Ver PDF”** en admin de Cotizaciones y OTs.
- **API**
  - Endpoints con Django REST Framework para:
    - Listar y crear OTs.
    - Agregar actividades de reparación.
    - Agregar repuestos a OTs.
- **Formato CLP**
  - Unificación de formato monetario en todo el sistema.
  - Separador de miles con punto (`.`).
  - Sin decimales.
  - Aplicado en Admin, API y PDF.
- **Infraestructura**
  - Proyecto en Django 5 + MySQL.
  - Variables de entorno con `.env`.
  - Configuración de GitHub y primer release (`v1.0.0`).

## [Unreleased]
- Roles y permisos (admin, técnico, bodega).
- Mejoras en el diseño del PDF (logo, cabecera, formato CLP avanzado).
- Dashboard de métricas.
- Tests automáticos (Pytest/Django).
- Dockerización del entorno.

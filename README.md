# Proyecto VyC - Sistema de Gestión Modular

![Python](https://img.shields.io/badge/python-3.11-blue.svg)
![Django](https://img.shields.io/badge/django-5.0-green.svg)
![Database](https://img.shields.io/badge/db-MySQL-orange.svg)
![Status](https://img.shields.io/badge/status-MVP%20v1.0.0-brightgreen)

Sistema modular desarrollado en **Django + MySQL** para la empresa **VyC**, como parte de la memoria de título (IECI, UCM).  
Este MVP cubre clientes, vehículos, órdenes de trabajo, repuestos y cotizaciones, incluyendo exportación de cotizaciones en PDF.

---

## ✨ Características principales

- **Core**
  - Gestión de **Clientes** (con validación de RUT chileno).
  - Gestión de **Técnicos** y **Vehículos**.

- **Workshop**
  - **Órdenes de Trabajo (OT)** con numeración automática (`OT-000001`).
  - Citas, Diagnósticos y Actividades de Reparación.
  - Totales de mano de obra, repuestos y costo total de la OT.
  - Acción rápida en admin: *Cerrar OT*.

- **Inventory**
  - Gestión de **Repuestos** (SKU, nombre, stock, costo unitario).
  - Asociación de repuestos a OTs con ajuste automático de stock.

- **Billing**
  - **Cotizaciones** vinculadas a OTs.
  - Totales calculados (mano de obra + repuestos).
  - Exportación a **PDF** con botón directo en el admin.

- **API REST (DRF)**
  - Listar y crear OTs.
  - Agregar actividades de reparación.
  - Agregar repuestos a una OT.

- **Formato CLP**
  - Todos los montos en **pesos chilenos**, con punto (`.`) como separador de miles y sin decimales.
  - Unificado en Admin, API y PDF.

---

## 📦 Requisitos

- **Python** 3.11+
- **MySQL** 8.x
- **pipenv/venv**
- **Git**

Dependencias principales (ver `requirements.txt`):
- Django 5.x
- mysqlclient
- python-dotenv
- djangorestframework
- reportlab

---

## ⚙️ Instalación y uso

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/proyectovyc.git
   cd proyectovyc

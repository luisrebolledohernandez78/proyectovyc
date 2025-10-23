Módulo: Mantenimiento y Reparación - Documentación de flujo (pasos 1..6)

Resumen
-------
Este documento describe el flujo operativo para el módulo de mantenimiento y reparación de vehículos, incluyendo los modelos implicados, endpoints API, y la representación en frontend (sidebar pasos 1..6 y calendario de agendamiento).

Pasos operativos
-----------------
1. Agendamiento
   - Modelos: `Appointment` (vinculado a Vehicle, opcionalmente a WorkOrder)
   - Campos clave: `vehicle`, `scheduled_at`, `notes`, `work_order`
   - Endpoint: `GET /api/appointments/slots/` (devuelve slots disponibles), `POST /api/appointments/` (crear cita)
   - UI: vista calendario con 2 slots por día (09:00 y 15:00) de lunes a viernes; opción para vincular a una OT existente o crear nueva.

2. Recepción & Diagnóstico
   - Modelos: `WorkOrder` (`received_at`), `Diagnostic`
   - Endpoint: `POST /api/workorders/{id}/diagnostic/`, `PATCH /api/workorders/{id}/` (marcar recibido)

3. Presupuesto
   - Modelos: `Quote` (ya existe)
   - Endpoint: `POST /api/workorders/{id}/quote/`, `PATCH /api/quotes/{id}/approve/`

4. Reparación
   - Modelos: `RepairAction`, `PartUsage`, `InventoryItem`
   - Endpoint: `POST /api/workorders/{id}/repair_actions/`, `POST /api/part_usages/`

5. Pago
   - Modelos: `Payment` (nuevo sugerido)
   - Endpoint: `POST /api/workorders/{id}/payments/`

6. Entrega
   - Modelos: `WorkOrder` (`delivered_at`, `delivered_to`)
   - Endpoint: `PATCH /api/workorders/{id}/deliver/`

Recomendaciones técnicas
-------------------------
- Usar transacciones al crear PartUsage y Payments para mantener integridad con `InventoryItem.reduce_stock()`.
- Auditar cambios de estado con `WorkOrderEvent` si es necesario.
- Para la SPA, usar sesiones + CSRF (cookies) por simplicidad en intranet.

Documentación generada automáticamente
-------------------------------------
- OpenAPI: /api/schema/
- Swagger UI: /api/docs/

Historia de cambios
-------------------
- Se añadió endpoint `GET /api/appointments/slots/` que devuelve 2 slots por día (09:00 y 15:00) para los próximos 14 días por defecto.


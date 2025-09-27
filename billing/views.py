from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from .models import Quote

def quote_pdf(request, pk):
    quote = get_object_or_404(Quote, pk=pk)
    response = HttpResponse(content_type='application/pdf')
    filename = f"Cotizacion_{quote.work_order.number}.pdf"
    response['Content-Disposition'] = f'inline; filename="{filename}"'

    p = canvas.Canvas(response, pagesize=A4)
    width, height = A4

    y = height - 50
    p.setFont("Helvetica-Bold", 14)
    p.drawString(40, y, f"Cotización - {quote.work_order.number}")
    y -= 25

    p.setFont("Helvetica", 11)
    p.drawString(40, y, f"Estado: {quote.get_status_display()}   Fecha: {quote.created_at.strftime('%Y-%m-%d')}")
    y -= 20
    p.drawString(40, y, f"Cliente: {quote.work_order.client.name} | Vehículo: {quote.work_order.vehicle.plate}")
    y -= 30

    # Mano de obra
    p.setFont("Helvetica-Bold", 12)
    p.drawString(40, y, "Mano de Obra")
    y -= 18
    p.setFont("Helvetica", 10)
    for r in quote.work_order.repairs.all():
        line = f"- {r.description} | Técnico: {r.technician or '-'} | Horas: {r.hours} x ${r.labor_rate} = ${r.labor_cost}"
        p.drawString(50, y, line)
        y -= 14

    y -= 10
    p.setFont("Helvetica-Bold", 11)
    p.drawString(50, y, f"Subtotal Mano de Obra: ${quote.total_labor():,.0f}")
    y -= 24

    # Repuestos
    p.setFont("Helvetica-Bold", 12)
    p.drawString(40, y, "Repuestos")
    y -= 18
    p.setFont("Helvetica", 10)
    for part in quote.work_order.parts_used.all():
        line = f"- {part.item.name} | Cant: {part.quantity} x ${part.unit_price} = ${part.total}"
        p.drawString(50, y, line)
        y -= 14

    y -= 10
    p.setFont("Helvetica-Bold", 11)
    p.drawString(50, y, f"Subtotal Repuestos: ${quote.total_parts():,.0f}")
    y -= 24

    # Total
    p.setFont("Helvetica-Bold", 12)
    p.drawString(40, y, f"TOTAL: ${quote.grand_total():,.0f}")
    y -= 30

    if quote.notes:
        p.setFont("Helvetica", 10)
        p.drawString(40, y, "Notas:")
        y -= 14
        textobj = p.beginText(50, y)
        textobj.setFont("Helvetica", 10)
        for line in quote.notes.splitlines():
            textobj.textLine(line)
        p.drawText(textobj)

    p.showPage()
    p.save()
    return response

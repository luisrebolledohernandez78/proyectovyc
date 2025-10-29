from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

from core.utils import clp
from .models import Quote

def quote_pdf(request, pk):
    quote = get_object_or_404(Quote, pk=pk)
    response = HttpResponse(content_type="application/pdf")
    filename = f"Cotizacion_{quote.work_order.number}.pdf"
    response["Content-Disposition"] = f'inline; filename="{filename}"'

    pdf = canvas.Canvas(response, pagesize=A4)
    width, height = A4

    y = height - 50
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(40, y, f"Cotizacion - {quote.work_order.number}")
    y -= 25

    pdf.setFont("Helvetica", 11)
    pdf.drawString(
        40,
        y,
        f"Estado: {quote.get_status_display()}   Fecha: {quote.created_at.strftime('%Y-%m-%d')}",
    )
    y -= 20
    pdf.drawString(
        40,
        y,
        f"Cliente: {quote.work_order.client.name} | Vehiculo: {quote.work_order.vehicle.plate}",
    )
    y -= 30

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(40, y, "Mano de Obra")
    y -= 18
    pdf.setFont("Helvetica", 10)
    for repair in quote.work_order.repairs.all():
        line = (
            f"- {repair.description} | Tecnico: {repair.technician or '-'} | "
            f"Horas: {repair.hours} x {clp(repair.labor_rate)} = {clp(repair.labor_cost)}"
        )
        pdf.drawString(50, y, line)
        y -= 14

    y -= 10
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(50, y, f"Subtotal Mano de Obra: {clp(quote.total_labor())}")
    y -= 24

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(40, y, "Repuestos")
    y -= 18
    pdf.setFont("Helvetica", 10)
    for part in quote.work_order.parts_used.all():
        line = f"- {part.item.name} | Cant: {part.quantity} x {clp(part.unit_price)} = {clp(part.total)}"
        pdf.drawString(50, y, line)
        y -= 14

    y -= 10
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(50, y, f"Subtotal Repuestos: {clp(quote.total_parts())}")
    y -= 24

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(40, y, f"TOTAL: {clp(quote.grand_total())}")
    y -= 30

    if quote.notes:
        pdf.setFont("Helvetica", 10)
        pdf.drawString(40, y, "Notas:")
        y -= 14
        text_obj = pdf.beginText(50, y)
        text_obj.setFont("Helvetica", 10)
        for line in quote.notes.splitlines():
            text_obj.textLine(line)
        pdf.drawText(text_obj)

    pdf.showPage()
    pdf.save()
    return response


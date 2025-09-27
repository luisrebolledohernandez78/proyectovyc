from django.utils.formats import number_format
from decimal import Decimal, InvalidOperation
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP


def clp(value) -> str:
    """
    Formatea a pesos chilenos SIN decimales y con miles con punto.
    Ej: 1234567.89 -> "$1.234.568"
    Evita usar la localización de Django para forzar el punto.
    """
    try:
        val = Decimal(value or 0)
    except (InvalidOperation, TypeError, ValueError):
        val = Decimal(0)

    # Redondea a entero y convierte a int
    entero = int(val.to_integral_value(rounding=ROUND_HALF_UP))

    # Agrupa con coma y luego reemplaza coma por punto
    # (esto evita el espacio fino / NBSP que mete la localización)
    s = f"{entero:,}".replace(",", ".")

    # Maneja negativos correctamente: -$1.234
    return f"-${s[1:]}" if s.startswith("-") else f"${s}"

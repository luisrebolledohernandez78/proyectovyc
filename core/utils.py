from decimal import Decimal, InvalidOperation, ROUND_HALF_UP

def clp(value) -> str:
    """
    Formatea a pesos chilenos sin decimales y con miles separados por punto.
    Ejemplo: 1234567.89 -> "$1.234.568".
    """
    try:
        val = Decimal(value or 0)
    except (InvalidOperation, TypeError, ValueError):
        val = Decimal(0)

    entero = int(val.to_integral_value(rounding=ROUND_HALF_UP))
    groups = f"{entero:,}".replace(",", ".")
    return f"-${groups[1:]}" if groups.startswith("-") else f"${groups}"


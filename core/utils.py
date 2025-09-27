from django.utils.formats import number_format
from decimal import Decimal, InvalidOperation

def clp(value) -> str:
    """
    Formatea a pesos chilenos sin decimales y con miles con punto.
    Ej: 1234567.89 -> "$1.234.568"
    """
    try:
        val = Decimal(value or 0)
    except (InvalidOperation, TypeError, ValueError):
        val = Decimal(0)
    # 0 decimales, con L10N y forzando agrupación
    return f"${number_format(val, decimal_pos=0, use_l10n=True, force_grouping=True)}"

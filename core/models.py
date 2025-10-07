from django.core.exceptions import ValidationError
from django.db import models


# ------------------------------
# Validacion sencilla de RUT (Chile)
# ------------------------------
def validar_rut(rut: str) -> bool:
    """
    Acepta formatos con o sin puntos/guion. Ej: 12.345.678-5 o 12345678-5.
    Retorna True si el digito verificador es correcto.
    """
    if not rut:
        return False
    r = rut.replace(".", "").replace("-", "").upper()
    if len(r) < 2:
        return False
    cuerpo, dv = r[:-1], r[-1]
    if not cuerpo.isdigit():
        return False

    # Calculo del DV
    factores = [2, 3, 4, 5, 6, 7]
    suma = 0
    for i, c in enumerate(reversed(cuerpo)):
        suma += int(c) * factores[i % len(factores)]
    resto = suma % 11
    dig = 11 - resto
    if dig == 11:
        dv_calc = "0"
    elif dig == 10:
        dv_calc = "K"
    else:
        dv_calc = str(dig)
    return dv == dv_calc


def normalizar_rut(rut: str) -> str:
    """Devuelve RUT normalizado sin puntos y con guion. Ej: 12345678-5."""
    r = rut.replace(".", "").replace("-", "").upper()
    return f"{r[:-1]}-{r[-1]}" if len(r) > 1 else rut


class Client(models.Model):
    NATURAL = "NAT"
    LEGAL = "LEG"
    TYPES = [
        (NATURAL, "Persona Natural"),
        (LEGAL, "Persona Juridica"),
    ]

    name = models.CharField("Nombre/Razon Social", max_length=150)
    rut = models.CharField(
        "RUT",
        max_length=12,
        unique=True,
        help_text="Formato: 12345678-5 (sin puntos)",
    )
    client_type = models.CharField("Tipo", max_length=3, choices=TYPES, default=NATURAL)
    email = models.EmailField("Email", blank=True, null=True)
    phone = models.CharField("Telefono", max_length=30, blank=True, null=True)
    address = models.CharField("Direccion", max_length=200, blank=True, null=True)
    created_at = models.DateTimeField("Creado", auto_now_add=True)

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
        ordering = ["name"]

    def clean(self):
        if self.rut:
            rut_norm = normalizar_rut(self.rut)
            if not validar_rut(rut_norm):
                raise ValidationError({"rut": "RUT invalido."})
            self.rut = rut_norm

    def __str__(self):
        return f"{self.name} ({self.rut})"


class Technician(models.Model):
    full_name = models.CharField("Nombre completo", max_length=120)
    specialty = models.CharField("Especialidad", max_length=120, blank=True, null=True)
    active = models.BooleanField("Activo", default=True)
    hired_at = models.DateField("Fecha de ingreso", blank=True, null=True)

    class Meta:
        verbose_name = "Tecnico"
        verbose_name_plural = "Tecnicos"
        ordering = ["full_name"]

    def __str__(self):
        return self.full_name


class Vehicle(models.Model):
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="vehicles",
        verbose_name="Cliente",
    )
    plate = models.CharField(
        "Patente",
        max_length=12,
        unique=True,
        help_text="Ej: ABCD12 o XX-YY-11 (sin espacios)",
    )
    brand = models.CharField("Marca", max_length=60, blank=True, null=True)
    model = models.CharField("Modelo", max_length=60, blank=True, null=True)
    year = models.PositiveIntegerField("Ano", blank=True, null=True)
    vin = models.CharField("VIN", max_length=30, blank=True, null=True)

    class Meta:
        verbose_name = "Vehiculo"
        verbose_name_plural = "Vehiculos"
        ordering = ["plate"]

    def __str__(self):
        return f"{self.plate} - {self.client.name}"

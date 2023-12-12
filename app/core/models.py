from django.db import models
from django.utils.translation import gettext as _

class Juego (models.Model):    
    SKU = models.CharField(_("SKU"), max_length=10)
    name = models.CharField(_("name"), max_length=100)
    console = models.CharField(_("console"), max_length=50)
    classification = models.CharField(_("console"), max_length=5)
    age = models.CharField(_("age"), max_length=5)
    ageCode = models.CharField(_("ageCode"), max_length=5)
    description = models.CharField(_("description"), max_length=500)
    type = models.CharField(_("type"), max_length=20)
    price = models.FloatField(_("price"))
    yt = models.CharField(_("yt"), max_length=200)
    folder = models.CharField(_("folder"), max_length=200)

    class Meta:
        verbose_name = _("Juego")
        verbose_name_plural = _("Juegos")
        db_table = 'juegos'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Juego _detail", kwargs={"pk": self.pk})

class Contacto (models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    mensaje = models.TextField()
    fecha_envio = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Contacto")
        verbose_name_plural = _("Contactos")
        db_table = 'contacto'

    def __str__(self):
        return self.nombre
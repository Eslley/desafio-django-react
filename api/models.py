from django.db import models

class UsuarioModel(models.Model):

    class Meta:
        db_table = 'usuario'


    login = models.CharField(max_length=100, unique=True)
    senha = models.CharField(max_length=100, blank=True)
    dt_nascimento = models.DateField()
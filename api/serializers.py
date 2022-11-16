from rest_framework import serializers
from api.models import UsuarioModel
import random
from rest_framework_csv import renderers as r
from drf_excel.renderers import XLSXRenderer
from drf_excel.mixins import XLSXFileMixin

class UsuarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = UsuarioModel
        fields = '__all__'

    def validate(self, data):
        if not 'senha' in data or data["senha"] == "":
            data["senha"] = self.generate_senha()
        
        return data

    def generate_senha(self):
        #Gera senha de 8 caracteres
        min = 'abcdefghijklmnopqrstuvwxyz'
        max = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        num = '0123456789'
        sybs = '[]{}()*#;/,-_%'

        all = min + max + num + sybs
        return "".join(random.sample(all,8))

class LoginUsuarioSerializer(serializers.Serializer):

    login = serializers.CharField(max_length=100, required=True)
    senha = serializers.CharField(max_length=100, required=True)

class UsuarioRenderCSV(r.CSVRenderer):
    
    header = ['Id', 'Login', 'Senha', 'Dt Nascimento']
    
class UsuarioRenderXLSX(XLSXRenderer):
    
    id = serializers.IntegerField(label=("Id"))
    login = serializers.CharField(label=("Login"))
    senha = serializers.CharField(label=("Senha"))
    dt_nascimento = serializers.DateField(label=("Dt Nascimento"))
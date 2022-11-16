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

class UsuarioXLSXSerializer(serializers.ModelSerializer):

    Id = serializers.IntegerField(source="id")
    Login = serializers.CharField(source="login")
    Senha = serializers.CharField(source="senha")
    Dt_Nascimento = serializers.CharField(source="dt_nascimento")

    class Meta:
        model = UsuarioModel
        fields = ['Id', 'Login', 'Senha', 'Dt_Nascimento']
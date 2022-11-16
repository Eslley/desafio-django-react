from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from api.models import UsuarioModel
from api.serializers import *
from rest_framework_csv import renderers as r
from drf_excel.renderers import XLSXRenderer
from rest_framework.generics import RetrieveAPIView
from rest_framework.renderers import JSONRenderer

class UsuariosListView(RetrieveAPIView):
    queryset = UsuarioModel.objects.all()
    renderer_classes = (JSONRenderer, UsuarioRenderCSV, XLSXRenderer)
    serializer_class = UsuarioSerializer

    """
        Estilização do arquivo xlsx
    """
    column_header = {
        'titles': [
            "Id",
            "Login",
            "Senha",
            "Dt_Nascimento",
        ],
        'column_width': [7, 17, 17, 25],
        'height': 30,
        'style': {
            'fill': {
                'fill_type': 'solid',
                'start_color': 'FFCCFFCC',
            },
            'alignment': {
                'horizontal': 'center',
                'vertical': 'center',
                'wrapText': True,
                'shrink_to_fit': True,
            },
            'border_side': {
                'border_style': 'thin',
                'color': 'FF000000',
            },
            'font': {
                'name': 'Arial',
                'size': 12,
                'bold': True,
                'color': 'FF000000',
            },
        },
    }
    body = {
        'style': {
            'fill': {
                'fill_type': 'solid',
                'start_color': 'FFCCFFCC',
            },
            'alignment': {
                'horizontal': 'center',
                'vertical': 'center',
                'wrapText': True,
                'shrink_to_fit': True,
            },
            'border_side': {
                'border_style': 'thin',
                'color': 'FF000000',
            },
            'font': {
                'name': 'Arial',
                'size': 12,
                'bold': False,
                'color': 'FF000000',
            }
        },
        'height': 40,
    }

    def get_serializer_class(self):
        if self.request.GET['format'] == 'xlsx':
            return UsuarioXLSXSerializer
        
        return UsuarioSerializer

    def retrieve(self, request):

        if not 'format' in request.GET or request.GET['format'] == 'json':
            serializer = self.serializer_class(instance=self.get_queryset(),  many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        elif request.GET['format'] == 'csv':
            content = [{
                'Id': user.pk,
                'Login': user.login,
                'Senha': user.senha,
                'Dt Nascimento': user.dt_nascimento.strftime("%d/%m/%Y")}
                    for user in self.queryset.all()]

            return Response(content, headers={'Content-Disposition': 'attachment; filename="usuários_csv.csv"'}, status=status.HTTP_200_OK)

        elif request.GET['format'] == 'xlsx':
            content = [{
                'Id': user.pk,
                'Login': user.login,
                'Senha': user.senha,
                'Dt_Nascimento': user.dt_nascimento.strftime("%d/%m/%Y")}
                    for user in self.queryset.all()]

            return Response(content, headers={'Content-Disposition': 'attachment; filename="usuários_xlsx.xlsx"'}, status=status.HTTP_200_OK)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def usuarioCreate(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def usuarioDelete(request, pk):
    try:
        user = UsuarioModel.objects.get(id=pk)
        user.delete()

        return Response({'message': 'Usuário deletado com sucesso'}, status=status.HTTP_200_OK)
    except UsuarioModel.DoesNotExist:
        return Response({'message': 'Usuário não encontrado'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def usuarioLogin(request):
    try:
        serializer = LoginUsuarioSerializer(data=request.data)
        
        if serializer.is_valid():
            user = UsuarioModel.objects.get(login=serializer.data['login'], senha=serializer.data['senha'])
            userSerializer = UsuarioSerializer(user)
            if(userSerializer.is_valid):
                return Response(userSerializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except UsuarioModel.DoesNotExist:
        return Response({'message': 'Erro ao realizar login, verifique login e/ou senha'}, status=status.HTTP_401_UNAUTHORIZED)
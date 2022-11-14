from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from api.models import UsuarioModel
from api.serializers import UsuarioSerializer


@api_view(['GET'])
def usuariosList(request):
    usuarios = UsuarioModel.objects.all()
    serializer = UsuarioSerializer(usuarios, many=True)
    
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

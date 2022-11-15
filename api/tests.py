from rest_framework.test import APITestCase
from django.urls import reverse
from api.models import UsuarioModel

class TestSetUp(APITestCase):

    def setUp(self):

        self.create_url = reverse('usuario-create')
        self.delete_url = reverse('usuario-delete', kwargs={'pk': -1})
        self.list_url = reverse('usuarios-list')
        self.login_url = reverse('usuario-login')

        self.dados_dt_nascimento_invalida = {
            'login': 'user',
            'senha': '1234',
            'dt_nascimento': '2001-01' 
        }

        self.dados_corretos = {
            'login': 'userCorreto',
            'senha': '1234',
            'dt_nascimento': '2001-01-01' 
        }

        self.dados_corretos_login = {
            'login': 'user2',
            'senha': '1234'
        }

        self.user = UsuarioModel.objects.create(login='user', senha='1234', dt_nascimento='2001-01-01')
        self.user2 = UsuarioModel.objects.create(login='user2', senha='1234', dt_nascimento='2002-02-02')

        return super().setUp()

    def tearDown(self):
        return super().tearDown()

class TestViewUsuario(TestSetUp):

    def test_usuario_nao_pode_cadastrar_sem_dados(self):
        response = self.client.post(self.create_url)

        self.assertEqual(response.status_code, 400)

    def test_usuario_nao_pode_cadastrar_com_data_de_nascimento_invalida(self):
        response = self.client.post(self.create_url, self.dados_dt_nascimento_invalida, format='json')

        self.assertEqual(response.status_code, 400)

    def test_usuario_cadastrar_corretamente(self):
        response = self.client.post(self.create_url, self.dados_corretos, format='json')

        self.assertEqual(response.status_code, 201)

    def test_deve_retornar_todos_usuarios_cadastrados(self):
        response = self.client.get(self.list_url)
        
        self.assertEqual(len(response.data), 2) # dois usuários cadastrados para os testes

    def test_deletar_usuario_que_nao_existe(self):
        self.deleteUserId = -1
        response = self.client.delete(self.delete_url)

        self.assertEqual(response.status_code, 404)

    def test_deletar_usuario_corretamente(self):
        self.delete_url = reverse('usuario-delete', kwargs={'pk': self.user.pk})
        response = self.client.delete(self.delete_url)

        self.assertEqual(response.status_code, 200)

    def test_realizar_login_com_dados_invalidos(self):
        response = self.client.post(self.login_url)

        self.assertEqual(response.status_code, 401)

    def test_realizar_login_corretamente(self):
        response = self.client.post(self.login_url, self.dados_corretos_login)

        self.assertEqual(response.status_code, 200)
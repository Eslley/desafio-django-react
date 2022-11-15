from django.urls import path
from api.views import *

urlpatterns = [
    path('', usuariosList, name='usuarios-list'),
    path('create/', usuarioCreate, name='usuario-create'),
    path('delete/<str:pk>/', usuarioDelete, name='usuario-delete'),
    path('login/', usuarioLogin, name='usuario-login')
]
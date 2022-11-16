# Desafio Django React

Para utilizar a aplicação acesse [link](https://desafio-tech.herokuapp.com/web)

**Descrição do projeto**

* Aplicação single para cadastro e consulta de usuários (exibição em XLSX, CSV, JSON) desenvolvido em Django e ReactJS

**Funcinalidades**

* Cadastro de usuários
* Login
* Download dos dados dos usuários em formato JSON
* Download dos dados dos usuários em formato CSV
* Download dos dados dos usuários em formato XLSX

**Tecnologias/Bibliotecas Utilizadas**

* Django Rest
* React
* Material UI
* React Hook Form
* Axios

**Snapshot da aplicação**

<p align="center">
    <img src="https://imgur.com/velVhUg.png" width="40%">
    <img src="https://imgur.com/fY47J7Z.png" width="40%">
</p>

<p align="center">
    <img src="https://imgur.com/Um4rcVr.png" width="40%">
</p>

**Documentação da API**

URL Base: https://desafio-tech.herokuapp.com/api/

* **GET /usuarios?format={format}**

  Exibe todos os usuários do sistema

    - format:
      - json - Retorna no formato JSON
      - csv - Retorna no formato CSV
      - xlsx - Retorna no formato XLSX

* **POST /usuarios/create**

  Cadastra um novo usuário no sistema, caso a senha não seja informada é gerada uma aleatória

    Request:
    ```
    {
      "login": "rubem",
      "senha": "12345",
      "dt_nascimento": "2000-01-01"
    }
    ```
    
    Response:
     ```
    {
      "id": 1
      "login": "rubem",
      "senha": "12345",
      "dt_nascimento": "2000-01-01"
    }

    Status: 201
    ```   

    Response com erro (caso login já exista):
     ```
    {
        "login": [
            "usuario model with this login already exists."
        ]
    }

    Status: 400
    ``` 

* **POST /usuarios/login**

  Autentica o usuário no sistema

    Request:
    ```
    {
      "login": "rubem",
      "senha": "12345"
    }
    ```
    
    Response:
    ```
    {
      "id": 1
      "login": "rubem",
      "senha": "12345",
      "dt_nascimento": "2000-01-01"
    }

    Status: 200
    ```  

    Response com erro:
    ```
    {
      "message": "Erro ao realizar login, verifique login e/ou senha"
    }

    Status: 401
    ```  

* **DELETE /usuarios/delete/{id}**

  Deleta um usuário do sistema

    Response:
     ```
    {
        "message": "Usuário deletado com sucesso"
    }

    Status: 200
    ```   

    Response com erro (caso usuário não exista):
     ```
    {
        "message": "Usuário não encontrado"
    }

    Status: 404
    ``` 
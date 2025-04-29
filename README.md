# Lumyk - Guia de Execução do Projeto (Frontend + Backend)

Este é o guia para rodar o projeto **Lumyk**, que consiste em um frontend (React Native com Expo) e um backend (Flask com Python).

## 📂 Estrutura Recomendada
Crie uma pasta chamada `lumyk` (ou qualquer nome de sua preferência), abra ela no VS Code e execute os seguintes comandos dentro dessa pasta para clonar os dois repositórios:

```bash
git clone https://github.com/rannyzita/frontend-Lumyk

git clone https://github.com/Karinyleandro/Lumyk---backend
```

A estrutura vai ficar assim:
```
lumyk/
├── frontend-Lumyk/
└── Lumyk---backend/
```

## 🔀 Instalando Dependências
Abra **dois terminais** no VS Code:

### Terminal 1: Backend (Flask + Python)
1. Acesse a pasta:
   ```bash
   cd Lumyk---backend
   ```
2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
3. Crie o banco de dados com o comando:
   ```bash
   flask --app manage.py db upgrade --directory backend/app/migrations
   ```
4. Coloque os dados do banco de dados:

   ```bash
   PYTHONPATH=backend python -m backend.app.db.seeders.seeder
   ```
### Terminal 2: Frontend (React Native + Expo)
1. Acesse a pasta:
   ```bash
   cd frontend-Lumyk
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## 💻 Rodando o Backend
Na raiz do backend (`Lumyk---backend/`), execute:
OBS: TEM QUE ESTAR NO TERMINAL DO BASH
```bash
python run.py
```

Se tudo estiver certo, você verá algo assim:
```
 * Running on http://127.0.0.1:5000
 * Running on http://192.168.1.6:5000
```

Atenção: O segundo IP é o IP local da sua máquina na rede. Ele muda conforme o Wi-Fi, então você precisa atualizar esse IP no frontend para que ele consuma a API corretamente.

## ⚖️ Configurando o IP da API no Frontend
Abra o arquivo:
```
frontend-Lumyk/API/index.ts
```
E substitua a linha:
```ts
baseURL: 'http://192.168.1.6:5000',
```
Por **o IP que apareceu no terminal** do backend, por exemplo:
```ts
baseURL: 'http://192.168.1.7:5000',
```

## 🚀 Rodando o Frontend (Expo)
1. Instale o **Expo Go** no seu celular (disponível na Play Store/App Store).
2. No terminal do frontend, execute:
   ```bash
   npx expo start
   ```
3. Escaneie o QR code com o app Expo Go no seu celular.

## 📄 Telas e Funcionalidades (Status Atual)
-----LEVE EM CONSIDERAÇÃO O QUE ESTÁ AQUI-------------------
### ✅ Telas Semi-funcionais (São elas: Home e a de Book):
- **Login**: apenas o botão de "Entrar" está funcionando (não há validação ainda). Ela vai dar acesso a primeira tela semi-funciona
- **1 - Home**:
  - Possui filtro por gênero.
  - Filtro por estado com busca (foi criado um objeto manual para simular o frete).
  - Busca por título do livro.
  - Exibe livros de forma aleatória.
  - Possui também acesso no bottomNavigation para outras telas, só para dar o feedback que ta funcionando. Juntamente com a parte de perfil na parte superior e a de ver autores, somente para o feedback da navegação.
- **2 - Book (Detalhes do Livro)**:
  - Exibe dados do livro e autor com base no livro clicado.
  - Permite escolher entre formato digital ou físico (mas ignore o físico, pois não foi implementado no frontend e não está completo na estrutura do banco).
  - Os botões "Adicionar ao carrinho" e "Ver livros" ainda **não estão funcionando**, ignore-os. 
-----LEVE EM CONSIDERAÇÃO O QUE ESTÁ AQUI-------------------
    
## ❌ Funcionalidades Ainda Não Implementadas (Ignore também):
- Adição ao carrinho + feedback.
- Botão "Ver livros" na tela de detalhes, que leva pra outra tela.
- Recuperação de senha.
- mais formatação nas caixas

---

### ✉️ Dúvidas ou bugs
O projeto está em andamento e algumas funcionalidades estão sendo finalizadas. Para avaliação, por favor considerar os pontos descritos acima.

---------------------------------------------------------------------------------------------------------------
 OBS: CASO DÊ ALGUM ERRO POR FALTA DE ALGUMA INSTALAÇÃO, RODE:
```bash
pip install Flask==3.1.0 Flask-RESTX==1.1.0 python-dotenv==1.0.0
```
ESSE PACOTE DE CIMA RESOLVE ESSE ERRO DE BAIXO:

```bash
Error: While importing 'manage', an ImportError was raised:

Traceback (most recent call last):
  File "C:\Users\laura\AppData\Local\Programs\Python\Python311\Lib\site-packages\flask\cli.py", line 218, in locate_app
    _import_(module_name)
  File "C:\Users\laura\Desktop\Lumyk\Lumyk---backend\manage.py", line 2, in <module>
    from backend.app import create_app
  File "C:\Users\laura\Desktop\Lumyk\Lumyk---backend\backend\app\_init_.py", line 3, in <module>
    from flask_restx import Api
  File "C:\Users\laura\AppData\Local\Programs\Python\Python311\Lib\site-packages\flask_restx\_init_.py", line 2, in <module>
    from .api import Api  # noqa
    ^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\laura\AppData\Local\Programs\Python\Python311\Lib\site-packages\flask_restx\api.py", line 35, in <module>
    from werkzeug import _version_ as werkzeug_version
ImportError: cannot import name '_version' from 'werkzeug' (C:\Users\laura\AppData\Local\Programs\Python\Python311\Lib\site-packages\werkzeug\init_.py)
```
---------------------------------------------------------------------------------------------------------------
E SE TIVER OUTRO ERRO RELACIONADO A NAO TER ACHADO UM MODULO BCRYPT, INSTALE:
```bash
pip install bcrypt
```

```bash
Error: While importing 'manage', an ImportError was raised:

Traceback (most recent call last):
  File "C:\Users\laura\AppData\Local\Programs\Python\Python311\Lib\site-packages\flask\cli.py", line 245, in locate_app
    _import_(module_name)
  File "C:\Users\laura\Desktop\Lumyk\Lumyk---backend\manage.py", line 2, in <module>
    from backend.app import create_app
  File "C:\Users\laura\Desktop\Lumyk\Lumyk---backend\backend\app\_init_.py", line 6, in <module>
    from backend.app.routes.usuario_routes import api as usuario
  File "C:\Users\laura\Desktop\Lumyk\Lumyk---backend\backend\app\routes\usuario_routes.py", line 3, in <module>
    from backend.app.controllers import UsuarioController
  File "C:\Users\laura\Desktop\Lumyk\Lumyk---backend\backend\app\controllers\_init_.py", line 1, in <module>
    from .authUsuario import *
  File "C:\Users\laura\Desktop\Lumyk\Lumyk---backend\backend\app\controllers\authUsuario.py", line 1, in <module>
    import bcrypt
ModuleNotFoundError: No module named 'bcrypt'
```



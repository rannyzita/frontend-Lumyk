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
### ✅ Telas Semi-funcionais:
- **Login**: apenas o botão de "Entrar" está funcionando (não há validação ainda).
- **Home**:
  - Possui filtro por gênero.
  - Filtro por estado com busca (foi criado um objeto manual para simular o frete).
  - Busca por título do livro.
  - Exibe livros de forma aleatória.
- **Book (Detalhes do Livro)**:
  - Exibe dados do livro e autor.
  - Permite escolher entre formato digital ou físico (mas ignore o físico, pois não foi implementado no banco).
  - Os botões "Adicionar ao carrinho" e "Ver livros" ainda **não estão funcionando**.

## ❌ Funcionalidades Ainda Não Implementadas
- Adição ao carrinho.
- Botão "Ver livros" na tela de detalhes.
- Recuperação de senha.
- Conexão real com banco de estados ou capas de livros físicos.

---

### ✉️ Dúvidas ou bugs
O projeto está em andamento e algumas funcionalidades estão sendo finalizadas. Para avaliação, por favor considerar os pontos descritos acima.

---

Feito com carinho ❤️ por Ranny e Kariny :)


# Projeto de Sistema de Gerenciamento de Clientes, Produtos e Pedidos

## Descrição
Este projeto é uma aplicação completa que inclui um backend desenvolvido com NestJS e um frontend desenvolvido com Next.js. Ele gerencia clientes (Pessoa Jurídica), produtos e pedidos, utilizando Docker para conteinerização e PostgreSQL como banco de dados.

## Tecnologias Utilizadas

### Backend
- **Node.js** com **NestJS**
- **PostgreSQL** como banco de dados
- **TypeORM** para interação com o banco de dados
- Conteinerização com **Docker**

### Frontend
- **Next.js** com **App Router**
- **Material-UI** para estilização

## Funcionalidades

### Clientes (Pessoa Jurídica)
- Tela de listagem de clientes com campos: ID, Razão Social, CNPJ, E-mail.
- Botão para acessar a tela de cadastro de clientes.
- Integração com a API pública [https://www.cnpj.ws](https://www.cnpj.ws) para preenchimento automático dos dados.

### Produtos
- Tela de listagem de produtos, com opções de editar e excluir.
- Tela de cadastro de produtos com upload de imagens.
- Tela de edição de produtos.
- Confirmação de exclusão via modal.

### Pedidos
- Tela de listagem de pedidos, com opção de exclusão.
- Tela de criação de pedidos, permitindo:
  - Vincular clientes aos pedidos.
  - Adicionar produtos aos pedidos.
  - Definir quantidades por produto.
- Confirmação de exclusão via modal.

### Autenticação
- Rotas protegidas para acessar o sistema.
- Login e cadastro de usuários utilizando Context Provider.

## Configuração e Execução

### Requisitos
- Docker e Docker Compose instalados.

### Passos para Execução

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
   ```

2. Configure o arquivo `.env`:
   Crie um arquivo `.env` na raiz do projeto backend com o seguinte conteúdo:
   ```env
   DATABASE_URL=postgres://postgres:postgres@postgres_db:5432/app_db
   JWT_SECRET=<sua-chave-secreta>
   ```

3. Suba os containers com Docker Compose:
   ```bash
   cd backend/
   docker-compose up -d --build
   ```

4. Execute e acesse o frontend:
  ```bash
   cd frontend/
   npm run build
   npm run start
   ```
   Abra o navegador e acesse [http://localhost:3002](http://localhost:3002).

### Scripts de Inicialização
O arquivo `init.sql` será executado automaticamente no PostgreSQL durante a inicialização do container para criar as tabelas necessárias.


## Melhorias Futuras
- Implementação de testes.
- Adição de autenticação baseada em OpenID Connect.
- Integração com um serviço de upload de imagens (S3 ou similar).
- Logs estruturados para monitoramento.



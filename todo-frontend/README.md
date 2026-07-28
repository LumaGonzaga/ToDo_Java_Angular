# ToDo Frontend

> ⚠️ **Nota de autoria:** o **backend** (`../ToDo`) foi desenvolvido **totalmente manualmente**. Este **frontend** foi desenvolvido com o auxílio do **Claude Code**.

Frontend em Angular para a aplicação de gerenciamento de tarefas (To-Do List) do teste prático Fullstack. Consome a API REST do backend em `../ToDo` (Spring Boot).

## Tecnologias utilizadas

- Angular 19 (módulos, sem standalone components)
- TypeScript
- RxJS
- Reactive Forms (`@angular/forms`)
- HttpClient (`@angular/common/http`)

## Telas

- **Lista de tarefas** (`/`): exibe título, status (com badge colorido) e data de criação de cada tarefa; permite editar ou excluir (com confirmação).
- **Cadastro/Edição** (`/novo` e `/editar/:id`): formulário com título, descrição e status, com validação e mensagens de erro.
- Mensagens de sucesso/erro para todas as operações são exibidas em um *toast* no canto superior direito.

## Como o frontend conversa com o backend

O backend expõe a API em `/todo` (não `/tasks`), com os campos em português (`titulo`, `descricao`, `status`, `dataCriacao`, `dataUltimaAtualizacao`). O frontend foi adaptado a esse contrato existente, sem nenhuma alteração no backend.

Como o frontend (`localhost:4200`) e o backend (`localhost:8080`) rodam em portas diferentes, o `ng serve` usa um proxy (`proxy.conf.json`) que encaminha as chamadas `/todo` para `http://localhost:8080` sem precisar alterar o backend. A URL da API é configurável em `src/environments/environment.ts` (`apiUrl`, padrão `/todo`).

> **Limitação conhecida:** esse proxy só funciona em modo de desenvolvimento (`ng serve`). Para servir o build de produção (`ng build`) separado do backend, seria necessário um reverse proxy (ex.: Nginx) na frente dos dois — não implementado nesta entrega.

## Como executar manualmente

Pré-requisitos: Node.js 18+ e o backend rodando (veja o README em `../ToDo`).

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Suba o backend (em outro terminal), padrão na porta `8080`:
   ```bash
   cd ../ToDo
   ./mvnw spring-boot:run
   ```
3. Suba o frontend com o proxy já configurado:
   ```bash
   npm start
   ```
4. Acesse `http://localhost:4200`.

## Como executar utilizando Docker

Ainda não há Dockerfile/`docker-compose.yml` para o frontend neste repositório — item não implementado nesta entrega.

## Build de produção

```bash
npm run build
```
Os artefatos ficam em `dist/todo-frontend`.

## Testes

```bash
npm test
```
Executa os testes unitários com Karma/Jasmine.

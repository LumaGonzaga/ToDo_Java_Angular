# ToDo Frontend

> Este README cobre apenas os detalhes específicos do frontend. Para a visão geral do projeto (objetivo, stack completa, Docker, execução manual, API), veja o [README.md na raiz do repositório](../README.md).

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

> **Limitação conhecida:** esse proxy só funciona em modo de desenvolvimento (`ng serve`). Ao rodar via Docker, o mesmo problema é resolvido de outra forma: veja a seção [Como executar utilizando Docker](#como-executar-utilizando-docker).

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

Pré-requisito: Docker e Docker Compose instalados. Na raiz do repositório (um nível acima desta pasta):

```bash
docker compose up --build
```

Isso sobe dois containers:

- `todo-backend`: build multi-stage do backend (`../ToDo/Dockerfile`), expõe a porta `8080`.
- `todo-frontend`: build multi-stage do Angular (`Dockerfile`), servido por Nginx na porta `80` do container, mapeada para `4200` no host.

O `nginx.conf` do container do frontend faz o papel que o proxy do `ng serve` fazia em desenvolvimento: encaminha as chamadas `/todo` para o serviço `backend` (via rede interna do Compose, `http://backend:8080`), então o navegador só enxerga a origem do frontend — sem precisar de CORS no backend.

Acesse a aplicação em `http://localhost:4200` (a mesma URL usada em desenvolvimento).

Para parar e remover os containers:

```bash
docker compose down
```

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

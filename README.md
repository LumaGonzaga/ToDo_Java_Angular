# To-Do List — Teste Prático Fullstack

> ⚠️ **Nota de autoria:** o **backend** (`ToDo/`) foi desenvolvido **totalmente manualmente**. O **frontend** (`todo-frontend/`) foi desenvolvido com o auxílio do **Claude Code**.

## Objetivo da aplicação

Aplicação web simples de gerenciamento de tarefas (To-Do List), que permite criar, listar, editar e remover tarefas. Cada tarefa possui título, descrição, status (`PENDING`, `IN_PROGRESS`, `DONE`) e datas de criação/última atualização preenchidas automaticamente pelo sistema. Não há autenticação.

O projeto é dividido em dois módulos:

```
ToDo/             # Backend Java + Spring Boot
todo-frontend/    # Frontend Angular
docker-compose.yml
```

## Tecnologias utilizadas

**Backend** (`ToDo/`)
- Java 21
- Spring Boot 4.1 (Web MVC, Data JPA)
- H2 Database (em memória)
- Lombok
- Maven

**Frontend** (`todo-frontend/`)
- Angular 19 (módulos, sem standalone components)
- TypeScript / RxJS
- Reactive Forms
- HttpClient

**Infraestrutura**
- Docker / Docker Compose
- Nginx (serve os estáticos do Angular e faz proxy reverso para a API em produção)

## Como executar utilizando Docker

Pré-requisito: Docker e Docker Compose instalados.

Na raiz do repositório:

```bash
docker compose up --build
```

Isso sobe dois containers com um único comando:

- `todo-backend`: build multi-stage do backend, expõe a porta `8080`.
- `todo-frontend`: build multi-stage do Angular, servido por Nginx, mapeado para a porta `4200` no host.

O Nginx do container do frontend encaminha as chamadas `/todo` para o serviço `backend` pela rede interna do Compose, então o navegador só enxerga a origem do frontend (não é necessário configurar CORS no backend).

Para parar e remover os containers:

```bash
docker compose down
```

## Como executar manualmente

Pré-requisitos: JDK 21, Node.js 18+ (o Maven pode ser baixado automaticamente pelo `mvnw`).

**1. Backend** (em um terminal, a partir de `ToDo/`):

```bash
cd ToDo
./mvnw spring-boot:run
```

O backend sobe em `http://localhost:8080`.

**2. Frontend** (em outro terminal, a partir de `todo-frontend/`):

```bash
cd todo-frontend
npm install
npm start
```

O frontend sobe em `http://localhost:4200`. Como o backend não tem CORS configurado, o `npm start` (`ng serve`) usa um proxy (`todo-frontend/proxy.conf.json`) que encaminha as chamadas `/todo` para `http://localhost:8080` sem precisar alterar o backend — mais detalhes em [todo-frontend/README.md](todo-frontend/README.md).

## Como acessar a aplicação

Com o backend e o frontend no ar (via Docker ou manualmente), acesse:

```
http://localhost:4200
```

## Como acessar a API

A API REST do backend fica disponível em `http://localhost:8080/todo` (endpoint `/todo`, e não `/tasks`).

| Ação | Método | Endpoint |
|---|---|---|
| Listar tarefas | `GET` | `/todo` |
| Buscar tarefa por ID | `GET` | `/todo/{id}` |
| Criar tarefa | `POST` | `/todo` |
| Atualizar tarefa | `PUT` | `/todo/{id}` |
| Excluir tarefa | `DELETE` | `/todo/{id}` |

Os campos da tarefa são em português: `titulo`, `descricao`, `status` (`PENDING`, `IN_PROGRESS` ou `DONE`), `dataCriacao` e `dataUltimaAtualizacao` (preenchidas automaticamente pelo backend).

Exemplo de criação de tarefa:

```bash
curl -X POST http://localhost:8080/todo \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar Spring Boot",
    "descricao": "Finalizar curso",
    "status": "PENDING"
  }'
```

O console do H2 (banco em memória) fica disponível em `http://localhost:8080/h2-console` enquanto o backend estiver rodando.

## Como executar os testes

**Backend:**

```bash
cd ToDo
./mvnw test
```

**Frontend** (Karma/Jasmine):

```bash
cd todo-frontend
npm test
```

## Decisões e limitações

- O backend já existia com o endpoint `/todo` e campos em português (`titulo`, `descricao`, `status`, `dataCriacao`, `dataUltimaAtualizacao`), diferente do `/tasks` sugerido no enunciado. O frontend foi adaptado a esse contrato, sem nenhuma alteração no backend.
- O backend não possui configuração de CORS. Em vez de alterá-lo, o acesso do frontend à API é resolvido por proxy: o proxy do `ng serve` em desenvolvimento, e o Nginx do container em produção/Docker.
- O banco H2 é em memória: os dados são perdidos a cada reinício do backend.
- Não há autenticação, conforme especificado.

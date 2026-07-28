export type TodoStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';

export interface Todo {
  id?: number;
  titulo: string;
  descricao: string;
  status: TodoStatus;
  dataCriacao?: string;
  dataUltimaAtualizacao?: string;
}

export const TODO_STATUS_LABELS: Record<TodoStatus, string> = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em andamento',
  DONE: 'Concluída'
};

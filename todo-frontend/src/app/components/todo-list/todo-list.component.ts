import { Component, OnInit } from '@angular/core';

import { Todo, TODO_STATUS_LABELS, TodoStatus } from '../../models/todo.model';
import { NotificationService } from '../../services/notification.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;
  loadError = false;
  todoToDelete: Todo | null = null;
  statusLabels = TODO_STATUS_LABELS;

  constructor(
    private readonly todoService: TodoService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.loadError = false;
    this.todoService.getAll().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: () => {
        this.loadError = true;
        this.loading = false;
        this.notificationService.error('Não foi possível carregar as tarefas.');
      }
    });
  }

  statusLabel(status: TodoStatus): string {
    return this.statusLabels[status];
  }

  confirmDelete(todo: Todo): void {
    this.todoToDelete = todo;
  }

  cancelDelete(): void {
    this.todoToDelete = null;
  }

  deleteConfirmed(): void {
    if (!this.todoToDelete?.id) {
      return;
    }

    const id = this.todoToDelete.id;
    this.todoService.delete(id).subscribe({
      next: () => {
        this.notificationService.success('Tarefa excluída com sucesso.');
        this.todoToDelete = null;
        this.loadTodos();
      },
      error: () => {
        this.notificationService.error('Erro ao excluir a tarefa.');
        this.todoToDelete = null;
      }
    });
  }
}

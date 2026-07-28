import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Todo, TodoStatus } from '../../models/todo.model';
import { NotificationService } from '../../services/notification.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  standalone: false,
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent implements OnInit {
  form: FormGroup;
  editingId: number | null = null;
  loading = false;
  saving = false;
  loadError = false;

  readonly statusOptions: { value: TodoStatus; label: string }[] = [
    { value: 'PENDING', label: 'Pendente' },
    { value: 'IN_PROGRESS', label: 'Em andamento' },
    { value: 'DONE', label: 'Concluída' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly todoService: TodoService,
    private readonly notificationService: NotificationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      status: ['PENDING' as TodoStatus, Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editingId = Number(idParam);
      this.loadTodo(this.editingId);
    }
  }

  get isEditing(): boolean {
    return this.editingId !== null;
  }

  loadTodo(id: number): void {
    this.loading = true;
    this.loadError = false;
    this.todoService.getById(id).subscribe({
      next: (todo) => {
        this.form.patchValue(todo);
        this.loading = false;
      },
      error: () => {
        this.loadError = true;
        this.loading = false;
        this.notificationService.error('Não foi possível carregar a tarefa.');
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const todo: Todo = this.form.value;
    this.saving = true;

    if (this.isEditing && this.editingId !== null) {
      this.todoService.update(this.editingId, todo).subscribe({
        next: () => {
          this.notificationService.success('Tarefa atualizada com sucesso.');
          this.router.navigate(['/']);
        },
        error: (err) => this.handleError(err, 'Erro ao atualizar a tarefa.')
      });
      return;
    }

    this.todoService.create(todo).subscribe({
      next: () => {
        this.notificationService.success('Tarefa criada com sucesso.');
        this.router.navigate(['/']);
      },
      error: (err) => this.handleError(err, 'Erro ao criar a tarefa.')
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  private handleError(err: { error?: string }, fallback: string): void {
    this.saving = false;
    const message = typeof err?.error === 'string' && err.error.trim() ? err.error : fallback;
    this.notificationService.error(message);
  }
}

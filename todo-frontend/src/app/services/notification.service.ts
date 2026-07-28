import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error';

export interface Notification {
  type: NotificationType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly notification$ = new BehaviorSubject<Notification | null>(null);
  readonly current$ = this.notification$.asObservable();
  private timeoutId?: ReturnType<typeof setTimeout>;

  success(message: string): void {
    this.show({ type: 'success', message });
  }

  error(message: string): void {
    this.show({ type: 'error', message });
  }

  clear(): void {
    this.notification$.next(null);
  }

  private show(notification: Notification): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.notification$.next(notification);
    this.timeoutId = setTimeout(() => this.clear(), 4000);
  }
}

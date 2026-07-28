import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Notification, NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  notification$: Observable<Notification | null>;

  constructor(private readonly notificationService: NotificationService) {
    this.notification$ = this.notificationService.current$;
  }

  close(): void {
    this.notificationService.clear();
  }
}

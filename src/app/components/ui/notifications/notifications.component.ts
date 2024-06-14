import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppNotification } from '../../../models/appNotification';
import { NotificationsService } from '../../../services/notifications.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: AppNotification[];
  subscription: Subscription;

  constructor(private notificationService: NotificationsService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notifications$.subscribe(
      (notifications) => {
        this.notifications = notifications;
        this.startFadeOut();
      }
    );
  }

  startFadeOut(): void {
    this.notifications.forEach((notification, index) => {
      notification.fadeIn = true;
      setTimeout(() => {
        this.notificationService.remove(index);
      }, 6000);
    });
  }

  dismiss(index: number) {
    this.notificationService.remove(index);
  }

  defineIcon(notification: AppNotification) {
    switch (notification.type) {
      case 'success':
        return 'check_circle';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
    }
  }
}

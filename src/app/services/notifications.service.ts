import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppNotification } from '../models/appNotification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}

  private _subject = new BehaviorSubject<AppNotification[]>([]);
  notifications$ = this._subject.asObservable();

  show(
    type: 'success' | 'error' | 'info' | 'warning',
    message: string,
    title: string = ''
  ) {
    if (!title) {
      switch (type) {
        case 'success':
          title = 'Success';
          break;
        case 'warning':
          title = 'Warning';
          break;
        case 'info':
          title = 'Info';
          break;
        case 'error':
          title = 'An error has ocurred.';
          break;
      }
    }

    let notifications = this._subject.getValue();
    notifications.push({ type, message, title });
    if (notifications.length > 3) {
      notifications = notifications.slice(notifications.length - 3);
    }
    this._subject.next(notifications);
  }

  remove(index: number) {
    let notifications = this._subject.getValue();
    notifications.splice(index, 1);
    this._subject.next(notifications);
  }
}

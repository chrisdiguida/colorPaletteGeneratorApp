import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ApiExceptionDto } from '../models/apiExceptionDto';
import { AppUsersService } from '../services/app-users.service';
import { NotificationsService } from '../services/notifications.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private notificationsService: NotificationsService,
    private appUsersService: AppUsersService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let error: ApiExceptionDto = err?.error;

        if (typeof error === 'string') {
          error = JSON.parse(err?.error);
        }

        this.notificationsService.show(
          'error',
          error?.ErrorMessage ?? 'Internal Server Error.'
        );

        if (err?.status === 401 && !window.location.href.includes('signin')) {
          this.appUsersService.signOut();
          this.router.navigateByUrl('signin');
        }

        return of(null);
      })
    );
  }
}

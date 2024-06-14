import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AppUsersService } from '../services/app-users.service';

export const authGuard: CanActivateFn = (route, state) => {
  const appUsersService = inject(AppUsersService);
  const router = inject(Router);

  return appUsersService.currentAppUser$.pipe(
    switchMap((appUser) => {
      if (appUser) {
        return of(true);
      } else if (localStorage.getItem(environment.localStorageNames.token)) {
        return appUsersService.getCurrentAppUser().pipe(
          map(() => true),
          catchError(() => {
            appUsersService.signOut();
            return of(false);
          })
        );
      } else {
        router.navigate(['signin']);
        return of(false);
      }
    })
  );
};

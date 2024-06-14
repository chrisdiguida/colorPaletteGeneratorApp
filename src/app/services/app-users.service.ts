import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppUserDto } from '../models/appUserDto';
import { GetCurrentAppUserResponseDto } from '../models/getCurrentAppUserResponseDto';
import { SignInRequestDto } from '../models/signInRequestDto';
import { SignInResponseDto } from '../models/signInResponseDto';
import { SignUpRequestDto } from '../models/signUpRequestDto';

@Injectable({
  providedIn: 'root',
})
export class AppUsersService {
  private currentAppUserSource = new BehaviorSubject<AppUserDto | null>(null);
  currentAppUser$ = this.currentAppUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  signIn(request: SignInRequestDto) {
    return this.http
      .post<SignInResponseDto>(environment.api.appUsers.signIn, request)
      .pipe(
        switchMap(async (res) => {
          if (res.token) {
            this.setCurrentAppUserAndToken({ ...res }, res.token);
          }
          return res;
        })
      );
  }

  signUp(request: SignUpRequestDto) {
    return this.http
      .post<SignInResponseDto>(environment.api.appUsers.signUp, request)
      .pipe(
        switchMap(async (res) => {
          if (res.token) {
            this.setCurrentAppUserAndToken({ ...res }, res.token);
          }
          return res;
        })
      );
  }

  signOut() {
    this.currentAppUserSource.next(null);
    localStorage.removeItem(environment.localStorageNames.token);
    this.router.navigateByUrl('signin');
  }

  getCurrentAppUser() {
    return this.http
      .get<GetCurrentAppUserResponseDto>(
        environment.api.appUsers.getCurrentAppUser
      )
      .pipe(
        map((res) => {
          if (!res) {
            this.signOut();
            return null;
          }
          this.setCurrentAppUser({ ...res });
          return res;
        })
      );
  }

  private setCurrentAppUserAndToken(appUser: AppUserDto, token: string) {
    this.setCurrentAppUser(appUser);
    localStorage.setItem(environment.localStorageNames.token, token);
  }

  private setCurrentAppUser(appUser: AppUserDto) {
    this.currentAppUserSource.next(appUser);
  }

  hasAppUser() {
    return this.currentAppUserSource.getValue() !== null;
  }

  hasToken() {
    return localStorage.getItem(environment.localStorageNames.token) !== null;
  }
}

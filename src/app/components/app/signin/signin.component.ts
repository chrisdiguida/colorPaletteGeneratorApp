import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInRequestDto } from '../../../models/signInRequestDto';
import { AppUsersService } from '../../../services/app-users.service';
import { FormValidationService } from '../../../services/form-validation.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  isLoading: string;
  signInForm = new FormGroup({
    email: new FormControl('', [this.formValidationService.email()]),
    password: new FormControl('', [this.formValidationService.minLength(8)]),
  });

  constructor(
    private formValidationService: FormValidationService,
    private appUsersService: AppUsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.appUsersService.hasToken()) this.router.navigateByUrl('app');
  }

  signIn() {
    if (!this.signInForm.isValid()) return;
    this.isLoading = 'sign-in';
    const request: SignInRequestDto = {
      email: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value,
    };
    this.appUsersService
      .signIn(request)
      .subscribe({
        next: (res) => {
          if (res.token) {
            this.router.navigateByUrl('app');
          }
        },
      })
      .add(() => (this.isLoading = null));
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpRequestDto } from '../../../models/signUpRequestDto';
import { AppUsersService } from '../../../services/app-users.service';
import { FormValidationService } from '../../../services/form-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  isLoading: string;
  signUpForm = new FormGroup({
    name: new FormControl('', [this.formValidationService.required()]),
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

  signUp() {
    if (!this.signUpForm.isValid()) return;
    this.isLoading = 'signup';

    const request: SignUpRequestDto = {
      name: this.signUpForm.controls.name.value,
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value,
    };

    this.appUsersService
      .signUp(request)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('app');
        },
      })
      .add(() => (this.isLoading = null));
  }

  navigateToSignIn() {
    this.router.navigate(['/signin'], { queryParamsHandling: 'preserve' });
  }
}

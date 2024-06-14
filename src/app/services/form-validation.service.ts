import { Injectable } from '@angular/core';
import {
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  required(): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
      const value: string = control.value?.toString();
      return (!value && control.touched && value !== '0') ||
        value?.length === 0 ||
        this.containsOnlySpaces(value)
        ? new ValidationMessage(ValidationMessages.InfoRequiredValue)
        : null;
    };
  }

  email(): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
      if (!control.value)
        return new ValidationMessage(ValidationMessages.InfoRequiredValue);
      if (Validators.email(control))
        return new ValidationMessage(ValidationMessages.ErrorEmailIsWrong);

      return null;
    };
  }

  minLength(length: number): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
      if (typeof control.value === 'string' || Array.isArray(control.value)) {
        if (control.value.length < length) {
          let errorMessage: string = `Insert a value with a length greater than or equal to ${length}.`;
          return new ValidationMessage(errorMessage);
        }
      }
      return null;
    };
  }

  isValidHexValue(required: boolean) {
    return (control: FormControl) => {
      if (!control.value) {
        return required
          ? new ValidationMessage(ValidationMessages.ErrorInvalidValue)
          : null;
      }

      const hexColorRegExp = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

      if (!hexColorRegExp.test(control.value))
        return new ValidationMessage(
          `The inserted value is not a valid hex color.`
        );

      return null;
    };
  }

  private containsOnlySpaces(text: string) {
    return text?.split('').every((x) => x === ' ');
  }
}

export class ValidationMessage {
  errorMsg: string;

  constructor(errorMsg: string) {
    this.errorMsg = errorMsg;
  }
}

enum ValidationMessages {
  InfoRequiredValue = 'The field is required.',
  ErrorEmailIsWrong = 'Insert a valid email address.',
  ErrorInvalidValue = 'The inserted value is not valid.',
}

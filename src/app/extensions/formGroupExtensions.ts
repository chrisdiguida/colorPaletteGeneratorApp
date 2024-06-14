export {};

import { AbstractControl, FormGroup } from '@angular/forms';

declare module '@angular/forms' {
  interface FormGroup {
    isValid: () => boolean;
    hasAnyValue: (excludedControls?: string[]) => boolean;
  }
}

FormGroup.prototype.isValid = function () {
  this.markAllAsTouched();
  this.updateValueAndValidity({ emitEvent: false });
  for (const key in this.controls) {
    if (Object.prototype.hasOwnProperty.call(this.controls, key)) {
      const control: AbstractControl = this.controls[key];
      control.updateValueAndValidity({ emitEvent: false });
      control.markAsDirty();
    }
  }
  return this.valid;
};

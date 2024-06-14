export {};

import { FormControl } from "@angular/forms";

declare module "@angular/forms" {
  interface FormControl {
    isValid: () => boolean;
  }
}

FormControl.prototype.isValid = function () {
  this.markAsTouched();
  this.updateValueAndValidity();
  this.markAsDirty();
  return this.valid;
};

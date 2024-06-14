import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.css'],
})
export class AppInputComponent implements OnInit {
  @Input() inputFormControl: FormControl = new FormControl('');
  @Input() placeholder: string;
  @Input() label: string;
  @Input() type: string = 'text';

  constructor() {}

  ngOnInit(): void {
    if (!this.placeholder) this.placeholder = this.label;
  }

  showErrorMessage() {
    return this.hasErrorMessage() && this.inputFormControl?.touched;
  }

  hasErrorMessage(): boolean {
    return !!this.inputFormControl && !!this.inputFormControl.errors;
  }
}

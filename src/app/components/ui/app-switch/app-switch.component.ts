import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppSwitchOption } from '../../../models/appSwitchOption';

@Component({
  selector: 'app-switch',
  templateUrl: './app-switch.component.html',
  styleUrl: './app-switch.component.css',
})
export class AppSwitchComponent {
  @Input() options: AppSwitchOption[] = [];
  @Output() optionChanged = new EventEmitter<AppSwitchOption>();

  constructor(private router: Router) {}

  selectOption(option: AppSwitchOption) {
    this.optionChanged.emit(option);
  }

  defineSelectedOption() {
    const selectedOption = this.options.find(
      (x) => x.value === this.router.url
    );
    return selectedOption;
  }
}

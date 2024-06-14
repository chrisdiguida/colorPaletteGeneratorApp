import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppSwitchOption } from '../../../models/appSwitchOption';

@Component({
  selector: 'app-switch',
  templateUrl: './app-switch.component.html',
  styleUrl: './app-switch.component.css',
})
export class AppSwitchComponent implements OnInit {
  @Input() options: AppSwitchOption[] = [];
  @Output() optionChanged = new EventEmitter<AppSwitchOption>();
  selectedOption: string;

  ngOnInit(): void {
    this.selectedOption = this.options.find((x) => x.checked).value;
  }

  selectOption(option: AppSwitchOption) {
    this.selectedOption = option.value;
    this.optionChanged.emit(option);
  }
}

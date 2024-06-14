import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.css'],
})
export class AppButtonComponent implements OnInit {
  @Input() text: string;
  @Input() backgroundColor: string = '#146ef6';
  @Input() textColor: string = '#FFFFFF';
  @Input() type: string = 'button';
  @Input() enableSpinner: boolean = false;
  @Input() spinnerSize: string = '30px';
  @Input() disabled: boolean;
  @Input() isWhite: boolean;
  @Input() materialIcon: string;
  @Output() clickEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emitClick(event: any) {
    this.clickEvent.emit(event);
  }
}

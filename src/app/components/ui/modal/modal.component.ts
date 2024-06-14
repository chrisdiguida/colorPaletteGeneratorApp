import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class AppModalComponent implements OnInit, OnDestroy {
  @Input() showModal: boolean;
  @Input() allowClose: boolean = true;
  @Input() title: string;
  @Input() description: string;
  @Input() width: string = '50%';
  @Input() height: string = '50%';
  @Output() closeModal = new EventEmitter();

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnDestroy(): void {
    this.removeFromBody();
  }

  emitCloseDialog(event) {
    this.closeModal.emit(event);
  }

  ngOnInit() {
    if (this.showModal) {
      this.addToBody();
    }
  }

  addToBody() {
    const modalElement = this.elementRef.nativeElement;
    this.renderer.appendChild(document.body, modalElement);
  }

  removeFromBody() {
    if (!this.showModal) return;

    const modalElement = this.elementRef.nativeElement;
    const parentElement = modalElement.parentElement;

    // Check if the parent of the modal element is the body element
    if (parentElement === document.body) {
      this.renderer.removeChild(document.body, modalElement);
    }
  }
}

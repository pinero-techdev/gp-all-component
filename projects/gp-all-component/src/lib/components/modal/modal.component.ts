import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input()
  header;

  @Input()
  visible;

  @Input()
  customStyle;

  @Output()
  onHideEvent = new EventEmitter<boolean>();

  onHide() {
    return this.onHideEvent.emit(true);
  }
}

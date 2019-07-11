import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BUTTON_TYPES, BUTTON_SEVERITY } from './../../resources/constants/button.constants';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'gp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input()
  type = BUTTON_TYPES.BASIC;

  @Input()
  label: string;

  @Input()
  icon: string;

  @Input()
  items: MenuItem[];

  @Input()
  disabled: boolean;

  // @Input()
  // clickEvent: () => any;

  @Input()
  severity: string;

  @Output()
  clicked = new EventEmitter<boolean>();

  readonly buttonType = BUTTON_TYPES;
  readonly buttonSeverity = BUTTON_SEVERITY;
  splitItems: any[];

  ngOnInit() {
    if (this.type === BUTTON_TYPES.SPLIT) {
      this.splitItems = [...this.items];
      this.getSplitButtonSeverity();
    }
  }

  event() {
    return this.clicked.emit(true);
  }

  getSplitButtonSeverity() {
    return this.severity === this.buttonSeverity.DANGER
      ? 'ui-button-danger'
      : this.severity === this.buttonSeverity.SECONDARY
      ? 'ui-button-secondary'
      : '';
  }
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonType, ButtonSeverity } from './../../resources/constants/button.enum';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'gp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input()
  type: ButtonType = ButtonType.Basic;

  @Input()
  severity: ButtonSeverity = ButtonSeverity.Primary;

  @Input()
  label: string;

  @Input()
  icon: string;

  @Input()
  items: MenuItem[];

  @Input()
  disabled = false;

  @Output()
  onClickEvent = new EventEmitter<boolean>();

  splitItems: MenuItem[];
  splitButtonSeverity: string;

  ngOnInit() {
    if (this.type === ButtonType.Split) {
      this.splitItems = [...this.items];
      this.splitButtonSeverity = this.getSplitButtonSeverity();
    }
  }

  event() {
    return this.onClickEvent.emit(true);
  }

  getSplitButtonSeverity() {
    const severityClassName =
      this.severity === ButtonSeverity.Danger
        ? 'ui-button-danger'
        : this.severity === ButtonSeverity.Secondary
        ? 'ui-button-secondary'
        : '';
    return severityClassName;
  }
}

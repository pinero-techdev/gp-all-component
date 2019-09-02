import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonType, ButtonSeverity, ButtonWidth } from './../../resources/constants/button.enum';
import { GpMenuItem } from './../../resources/data/gp-menu-item.model';

@Component({
  selector: 'gp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  /**
   * Button type, submit, button
   */
  @Input() buttonType = 'button';

  /**
   * Button type, basic by default
   */
  @Input()
  type: ButtonType = ButtonType.Basic;

  /**
   * Button severity, primary by default
   */
  @Input()
  severity: ButtonSeverity = ButtonSeverity.Primary;

  /**
   * Button width, default by default
   */
  @Input()
  width: ButtonWidth = ButtonWidth.Default;

  /**
   * Button label
   */
  @Input()
  label: string;

  /**
   * Button icon
   */
  @Input()
  icon: string;

  /**
   * Item buttons to show in overlaypanel in case of splitbutton
   */
  @Input()
  items: GpMenuItem[];

  /**
   * Button accesibility. Every button is enabled by default
   */
  @Input()
  disabled = false;

  /**
   * Event to emit when a button is clicked
   */
  @Output()
  onClickEvent = new EventEmitter<boolean>();

  /**
   * Items to show if button is type splitbutton
   */
  splitItems: GpMenuItem[];

  /**
   * Severity for splitbutton to bind in template
   */
  splitButtonSeverity: string;

  /**
   * When component is initialized splitItems array and splitButtonSeverity must be asigned
   */
  ngOnInit() {
    if (this.type === ButtonType.Split) {
      this.splitItems = [...this.items];
      this.splitButtonSeverity = this.getSplitButtonSeverity();
    }
  }

  /**
   * Returns the click event emit
   */
  onClick() {
    return this.onClickEvent.emit(true);
  }

  /**
   * Returns the class for splitbutton severity
   */
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

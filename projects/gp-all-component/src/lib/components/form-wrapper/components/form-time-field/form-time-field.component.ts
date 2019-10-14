import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-form-time-field',
  templateUrl: './form-time-field.component.html',
  styleUrls: ['./form-time-field.component.scss'],
})
export class FormTimeFieldComponent extends GpFormFieldControl {
  /**
   * Current form field value
   */
  @Input() set currentValue(v: string) {
    this._currentValue = GPUtil.isNullOrUndefined(v) ? false : v;
    this.copyValueFromControlToEditedRow(this.formField.formControl.editedRow);
  }

  get currentValue() {
    return this._currentValue;
  }
}

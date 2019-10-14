import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-form-nullable-checkbox-field',
  templateUrl: './form-nullable-checkbox-field.component.html',
  styleUrls: ['./form-nullable-checkbox-field.component.scss'],
})
export class FormNullableCheckboxComponent extends GpFormFieldControl {
  /**
   * Current form field value
   */
  @Input() set currentValue(v: boolean) {
    this._currentValue = GPUtil.isUndefined(v) ? null : v;
    this.copyValueFromControlToEditedRow(this.formField.formControl.editedRow);
  }

  get currentValue() {
    return this._currentValue;
  }
}

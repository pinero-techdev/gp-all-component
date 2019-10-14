import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-form-number-field',
  templateUrl: './form-number-field.component.html',
  styleUrls: ['./form-number-field.component.scss'],
})
export class FormNumberFieldComponent extends GpFormFieldControl {
  /**
   * Translation keys for field
   */
  translationKeys = '';
  textboxClass = 'full-width';

  /**
   * Current form field value
   */
  @Input() set currentValue(v: any) {
    this._currentValue = GPUtil.isNullOrUndefined(v) ? null : Number(v);
    this.copyValueFromControlToEditedRow(this.formField.formControl.editedRow);
  }

  get currentValue() {
    return this._currentValue;
  }
}

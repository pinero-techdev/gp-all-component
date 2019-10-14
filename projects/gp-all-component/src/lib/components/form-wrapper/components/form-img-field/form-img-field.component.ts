import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-form-img-field',
  templateUrl: './form-img-field.component.html',
  styleUrls: ['./form-img-field.component.scss'],
})
export class FormImgFieldComponent extends GpFormFieldControl {
  /**
   * Current form field value
   */
  @Input() set currentValue(v: string) {
    this._currentValue = GPUtil.isNullOrUndefined(v) ? null : v;

    if (this.formField) {
      this._currentValue = this.setTextProperties(v);
      this.copyValueFromControlToEditedRow(this.formField.formControl.editedRow);
    }
  }

  get currentValue() {
    return this._currentValue;
  }
}

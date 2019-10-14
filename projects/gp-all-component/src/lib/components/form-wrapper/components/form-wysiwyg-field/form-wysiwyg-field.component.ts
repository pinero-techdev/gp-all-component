import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from './../../resources/form-field-control.class';
import { GPUtil } from '../../../../services/core/gp-util.service';
@Component({
  selector: 'gp-form-wysiwyg-field',
  templateUrl: './form-wysiwyg-field.component.html',
  styleUrls: ['./form-wysiwyg-field.component.scss'],
})
export class FormWysiwygFieldComponent extends GpFormFieldControl {
  /**
   * Current form field value
   */
  @Input() set currentValue(v: string) {
    const value = GPUtil.isNullOrUndefined(v) ? null : v;
    this._currentValue = this.setTextProperties(value);
    this.copyValueFromControlToEditedRow(this.formField.formControl.editedRow);
  }

  get currentValue() {
    return this._currentValue;
  }

  onChangeEvent($event: any) {
    if ($event) {
      this.currentValue = $event.htmlValue;
      this.onFieldChange();
    }
  }
}

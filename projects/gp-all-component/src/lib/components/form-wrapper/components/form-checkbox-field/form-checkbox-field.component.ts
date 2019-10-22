import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-form-checkbox-field',
  templateUrl: './form-checkbox-field.component.html',
  styleUrls: ['./form-checkbox-field.component.scss'],
})
export class FormCheckboxFieldComponent extends GpFormFieldControl {
  /**
   * Current form field value
   */
  @Input() set currentValue(v: boolean) {
    this._currentValue = GPUtil.isNullOrUndefined(v) ? false : v;
  }

  get currentValue() {
    return this._currentValue;
  }

  /**
   * Copies value from control to editing row
   * @param editedRow The editing row
   */
  copyValueFromControlToEditedRow(editedRow: any) {
    if (editedRow && this.formField) {
      const newValue = this.currentValue
        ? this.formField.fieldMetadata.displayInfo.checkedValue
        : this.formField.fieldMetadata.displayInfo.uncheckedValue;

      editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    }
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any) {
    if (editedRow && this.formField) {
      this.currentValue =
        this.formField.fieldMetadata.displayInfo.checkedValue ===
        editedRow[this.formField.fieldMetadata.fieldName];
    }
  }
}

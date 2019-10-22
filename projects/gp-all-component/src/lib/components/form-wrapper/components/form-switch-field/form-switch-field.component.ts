import { Component } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';

@Component({
  selector: 'gp-form-switch-field',
  templateUrl: './form-switch-field.component.html',
  styleUrls: ['./form-switch-field.component.scss'],
})
export class FormSwitchFieldComponent extends GpFormFieldControl {
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

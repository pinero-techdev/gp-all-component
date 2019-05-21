import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GpFormField } from '../../resources/form-field.model';
import { DataTableMetaDataField } from './../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';

@Component({
  selector: 'gp-form-checkbox-field',
  templateUrl: './form-checkbox-field.component.html',
})
export class FormCheckboxFieldComponent extends GpFormFieldControl {
  /**
   * The formField for this component
   */
  @Input() formField: GpFormField;

  constructor() {
    super();
  }

  /**
   * Returns current form field
   */
  getFormField(): GpFormField {
    return this.formField;
  }

  /**
   * Returns current field metadata
   */
  getFieldMetadata(): DataTableMetaDataField {
    return this.formField ? this.formField.fieldMetadata : null;
  }

  /**
   * Copies value from control to editing row
   * @param editedRow The editing row
   */
  copyValueFromControlToEditedRow(editedRow: any): void {
    editedRow[this.formField.fieldMetadata.fieldName] = this.currentValue
      ? this.formField.fieldMetadata.displayInfo.checkedValue
      : this.formField.fieldMetadata.displayInfo.uncheckedValue;
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any): void {
    this.currentValue =
      this.formField.fieldMetadata.displayInfo.checkedValue ===
      editedRow[this.formField.fieldMetadata.fieldName];
  }

  /**
   * Starts validation for editing row
   * @param editedRow The editing row
   */
  validateField(): boolean {
    // A checkbox is always valid.
    if (this.formField !== undefined) {
      this.formField.validField = true;
      this.formField.fieldMsgs = null;
      return this.formField.validField;
    }

    return false;
  }
}

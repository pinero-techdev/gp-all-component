import { Component, Input, OnInit } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GpFormField } from '../../resources/form-field.model';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';

@Component({
  selector: 'gp-form-switch-field',
  templateUrl: './form-switch-field.component.html',
  styleUrls: ['./form-switch-field.component.scss'],
})
export class FormSwitchFieldComponent extends GpFormFieldControl implements OnInit {
  /**
   * The formField for this component
   */

  @Input() formField: GpFormField;

  /**
   * Returns current form field
   */
  public getFormField(): GpFormField {
    return this.formField;
  }

  ngOnInit() {
    this.isDisabled = this.controlDisabled();
  }

  /**
   * Returns current field metadata
   */
  getFieldMetadata(): DataTableMetaDataField {
    return this.formField && this.formField.fieldMetadata ? this.formField.fieldMetadata : null;
  }

  /**
   * Copies value from control to editing row
   * @param editedRow The editing row
   */
  copyValueFromControlToEditedRow(editedRow: any) {
    const newValue = this.currentValue
      ? this.formField.fieldMetadata.displayInfo.checkedValue
      : this.formField.fieldMetadata.displayInfo.uncheckedValue;

    editedRow[this.formField.fieldMetadata.fieldName] = newValue;
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any) {
    const value =
      this.formField.fieldMetadata.displayInfo.checkedValue ===
      editedRow[this.formField.fieldMetadata.fieldName];

    this._currentValue = value;
  }

  /**
   * Starts validation for editing row
   * @param editedRow The editing row
   */
  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;
    return this.formField.validField;
  }
}

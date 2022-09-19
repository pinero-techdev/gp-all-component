import { Component, Input, OnInit } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GpFormField } from '../../resources/form-field.model';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';


@Component({
  selector: 'gp-form-nullable-checkbox-field',
  templateUrl: './form-nullable-checkbox-field.component.html',
  styleUrls: ['./form-nullable-checkbox-field.component.scss'],
})
export class FormNullableCheckboxComponent extends GpFormFieldControl implements OnInit {
  /**
   * The formField for this component
   */
  @Input() formField: GpFormField;

  constructor() {
    super();
  }

  ngOnInit() {
    this.isDisabled = this.controlDisabled();
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
    if (!this.currentValue) {
      editedRow[this.formField.fieldMetadata.fieldName] = null;
    } else {
      if (this.currentValue) {
        editedRow[
          this.formField.fieldMetadata.fieldName
        ] = this.formField.fieldMetadata.displayInfo.checkedValue;
      } else {
        editedRow[
          this.formField.fieldMetadata.fieldName
        ] = this.formField.fieldMetadata.displayInfo.uncheckedValue;
      }
    }
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any): void {
    if (!editedRow[this.formField.fieldMetadata.fieldName]) {
      this._currentValue = null;
    } else {
      this._currentValue =
        this.formField.fieldMetadata.displayInfo.checkedValue ===
        editedRow[this.formField.fieldMetadata.fieldName];
    }
  }

  /**
   * Starts validation for editing row
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

import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GpFormField } from '../../resources/form-field.model';
import { DataTableMetaDataField } from './../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { FormGenericField } from '../../resources/form-generic-field.interface';

@Component({
  selector: 'gp-form-checkbox-field',
  templateUrl: './form-checkbox-field.component.html',
  styleUrls: ['./form-checkbox-field.component.scss'],
})
export class FormCheckboxFieldComponent extends GpFormFieldControl implements FormGenericField {
  /**
   * The formField for this component
   */
  @Input() formField: GpFormField;

  constructor() {
    super();
  }

  getFormField(): GpFormField {
    return this.formField;
  }

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField ? this.formField.fieldMetadata : null;
  }

  copyValueFromControlToEditedRow(editedRow: any): void {
    editedRow[this.formField.fieldMetadata.fieldName] = this.currentValue
      ? this.formField.fieldMetadata.displayInfo.checkedValue
      : this.formField.fieldMetadata.displayInfo.uncheckedValue;
  }

  copyValueFromEditedRowToControl(editedRow: any): void {
    this.currentValue =
      this.formField.fieldMetadata.displayInfo.checkedValue ===
      editedRow[this.formField.fieldMetadata.fieldName];
  }

  validateField(editedRow: any = null): boolean {
    // A checkbox is always valid.
    if (this.formField !== undefined) {
      this.formField.validField = true;
      this.formField.fieldMsgs = null;
      return this.formField.validField;
    }
  }
}

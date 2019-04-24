import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/gp-form-field-control';
import { GpFormField } from '../../resources/gp-form-field.model';
import { DataTableMetaDataField } from '@lib/resources/data/data-table/meta-data/data-table-meta-data-field.model';

@Component({
  selector: 'gp-form-checkbox-field',
  templateUrl: './form-checkbox-field.component.html',
  styleUrls: ['./form-checkbox-field.component.scss'],
})
export class FormCheckboxFieldComponent extends GpFormFieldControl {
  @Input() formField: GpFormField;

  constructor() {
    super();
  }

  public getFormField(): GpFormField {
    return this.formField;
  }

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField.fieldMetadata;
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    editedRow[this.formField.fieldMetadata.fieldName] = this.currentValue
      ? this.formField.fieldMetadata.displayInfo.checkedValue
      : this.formField.fieldMetadata.displayInfo.uncheckedValue;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    this.currentValue =
      this.formField.fieldMetadata.displayInfo.checkedValue ===
      editedRow[this.formField.fieldMetadata.fieldName];
  }

  validateField(editedRow: any) {
    // Un checkbox siempre es valido.
    this.formField.validField = true;
    this.formField.fieldMsgs = null;
    return this.formField.validField;
  }
}

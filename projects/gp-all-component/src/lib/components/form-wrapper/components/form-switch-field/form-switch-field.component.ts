import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/gp-form-field-control';
import { GpFormField } from '../../resources/gp-form-field.model';
import { DataTableMetaDataField } from '@lib/resources/data/data-table/meta-data/data-table-meta-data-field.model';

@Component({
  selector: 'gp-form-switch-field',
  templateUrl: './form-switch-field.component.html',
  styleUrls: ['./form-switch-field.component.scss'],
})
export class FormSwitchFieldComponent extends GpFormFieldControl {
  @Input() formField: GpFormField;

  public getFormField(): GpFormField {
    return this.formField;
  }

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField.fieldMetadata;
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    const newValue = this.currentValue
      ? this.formField.fieldMetadata.displayInfo.checkedValue
      : this.formField.fieldMetadata.displayInfo.uncheckedValue;
    editedRow[this.formField.fieldMetadata.fieldName] = newValue;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    const value =
      this.formField.fieldMetadata.displayInfo.checkedValue ===
      editedRow[this.formField.fieldMetadata.fieldName];
    this.currentValue = value;
  }

  validateField(editedRow: any) {
    // Un switch siempre es valido.
    this.formField.validField = true;
    this.formField.fieldMsgs = null;
    return this.formField.validField;
  }
}

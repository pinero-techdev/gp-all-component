import {Component, Input} from '@angular/core';
import {DataTableMetaDataField} from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import {GpFormFieldControl} from '../resources/gp-form-field-control';
import {GpFormField} from '../resources/gp-form-field.model';

@Component({
  selector: 'gp-form-checkbox-field',
  templateUrl: './gp-form-checkbox-field.component.html'
})
export class GpFormCheckboxFieldComponent extends GpFormFieldControl {
  public getFormField(): GpFormField {
    return this.formField;
  }

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField.fieldMetadata;
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    editedRow[this.formField.fieldMetadata.fieldName] =
      this.currentValue ? this.formField.fieldMetadata.displayInfo.checkedValue : this.formField.fieldMetadata.displayInfo.uncheckedValue;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    this.currentValue =
      this.formField.fieldMetadata.displayInfo.checkedValue === editedRow[this.formField.fieldMetadata.fieldName];
  }

  validateField(editedRow: any) {
    // Un checkbox siempre es valido.
    this.formField.validField = true;
    this.formField.fieldMsgs = null;
    return this.formField.validField;
  }
}

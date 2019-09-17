import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../resources/form-field.model';
import { LocaleES } from '../../../../resources/localization';

@Component({
  selector: 'gp-form-number-field',
  templateUrl: './form-number-field.component.html',
  styleUrls: ['./form-number-field.component.scss'],
})
export class FormNumberFieldComponent extends GpFormFieldControl {
  /**
   * The formField for this component
   */
  @Input() formField: GpFormField;

  /**
   * Class for textbox
   */
  textboxClass = 'full-width';

  /**
   * Min length validation value
   */
  minLength: number;

  /**
   * Max length validation value
   */
  maxLength: number;

  /**
   * Translation keys for field
   */
  translationKeys = '';

  /**
   * Returns current field metadata
   */
  getFieldMetadata(): DataTableMetaDataField {
    return this.formField.fieldMetadata;
  }

  /**
   * Returns current form field
   */
  getFormField(): GpFormField {
    return this.formField;
  }

  /**
   * Copies value from control to editing row
   * @param editedRow The editing row
   */
  copyValueFromControlToEditedRow(editedRow: any) {
    editedRow[this.formField.fieldMetadata.fieldName] = this.currentValue;
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any) {
    this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];
  }

  /**
   * Starts validation for editing row
   * @param editedRow The editing row
   */
  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;

    const fieldValue = editedRow[this.formField.fieldMetadata.fieldName];

    // Start field validation rules

    // a) Check nullability
    const notNullable =
      this.formField.fieldMetadata.notNull && (fieldValue === '' || fieldValue === null);

    if (notNullable) {
      this.formField.validField = false;
      this.validateFieldAddMsgs(LocaleES.VALUE_IS_REQUIRED);
      return false;
    }
    return this.formField.validField;
  }
}

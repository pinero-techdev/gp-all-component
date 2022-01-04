import { LocaleES } from '../../../../resources/localization/es-ES.lang';
import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../resources/form-field.model';
import { TableService } from '../../../../services/api/table/table.service';
import { GpTableRestrictions } from '../../../table-wrapper/resources/gp-table-restrictions.enum';
import { RegexValidations } from '../../resources/regex-validations.type';

@Component({
  selector: 'gp-form-time-field',
  templateUrl: './form-time-field.component.html',
  styleUrls: ['./form-time-field.component.scss'],
})
export class FormTimeFieldComponent extends GpFormFieldControl {
  /**
   * The formField for this component
   */
  @Input() formField: GpFormField;

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

    let fieldValue = editedRow[this.formField.fieldMetadata.fieldName];

    const isTextDisplayType =
      typeof fieldValue === 'string' &&
      this.formField.fieldMetadata.displayInfo.displayType === TableService.TEXT_DISPLAY_TYPE;

    if (isTextDisplayType) {
      fieldValue = fieldValue.trim();
    }

    // a) Check nullability
    const notNullable =
      this.formField.fieldMetadata.notNull && (fieldValue === '' || fieldValue === null);

    if (notNullable) {
      this.formField.validField = false;
      this.validateFieldAddMsgs(LocaleES.VALUE_IS_REQUIRED);
      return false;
    }

    // b) Length validation
    const restrictions = this.formField.fieldMetadata.restrictions;
    if (restrictions) {
      for (const restriction of restrictions) {
        const hasMinLength =
          restriction.restrictionType === GpTableRestrictions.MIN_LENGTH &&
          typeof fieldValue === 'string';

        const hasMaxLength =
          restriction.restrictionType === GpTableRestrictions.MAX_LENGTH &&
          typeof fieldValue === 'string';

        if (hasMinLength) {
          if (fieldValue.length < restriction.minLength) {
            this.formField.validField = false;
            this.validateFieldAddMsgs(LocaleES.VALIDATION_VALUE_TOO_SHORT(restriction.minLength));
          }
        }

        if (hasMaxLength) {
          if (fieldValue.length > restriction.maxLength) {
            this.formField.validField = false;
            this.validateFieldAddMsgs(LocaleES.VALIDATION_VALUE_TOO_LONG(restriction.maxLength));
          }
        }
      }
    }

    // c) Time validation (hh:mm / 24h)
    if (fieldValue && fieldValue.length > 0 && !RegexValidations.isTime24Hours(fieldValue)) {
      this.formField.validField = false;
      this.validateFieldAddMsgs(LocaleES.VALIDATION_TIME_FORMAT);
    }
    return this.formField.validField;
  }
}

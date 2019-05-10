import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { DataTableMetaDataField } from './../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../resources/form-field.model';
import { GPUtil } from './../../../../services/core/gp-util.service';
import { TableService } from './../../../../services/api/table/table.service';
import { GpTableRestrictions } from './../../../../components/table-wrapper/resources/gp-table-restrictions.enum';
import { RegexValidations } from '../../resources/regex-validations.type';

@Component({
  selector: 'gp-form-time-field',
  templateUrl: './form-time-field.component.html',
})
export class FormTimeFieldComponent extends GpFormFieldControl {
  /**
   * The formField for this component
   */
  @Input() formField: GpFormField;

  /**
   * Time default format
   */
  timeFormat = 'hh:mm';

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
    editedRow[this.formField.fieldMetadata.fieldName] = GPUtil.dateTohhmm(this.currentValue);
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any) {
    const value = editedRow[this.formField.fieldMetadata.fieldName];
    this.currentValue = GPUtil.str2Date(value, this.timeFormat);
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
      this.validateFieldAddMsgs('El valor es obligatorio.');
      return false;
    }

    // b) Length validation
    const restrictions = this.formField.fieldMetadata.restrictions;
    if (restrictions) {
      for (const restriction of restrictions) {
        const invalidMinLength =
          restriction.restrictionType === GpTableRestrictions.MIN_LENGTH &&
          typeof fieldValue === 'string' &&
          fieldValue.length < restriction.minLength;

        if (invalidMinLength) {
          this.formField.validField = false;
          this.validateFieldAddMsgs(
            'Valor demasiado corto (longitud mínima ' + restriction.minLength + ')'
          );
        }

        const invalidMaxLength =
          restriction.restrictionType === GpTableRestrictions.MAX_LENGTH &&
          typeof fieldValue === 'string' &&
          fieldValue.length > restriction.maxLength;

        if (invalidMaxLength) {
          this.formField.validField = false;
          this.validateFieldAddMsgs(
            'Valor demasiado largo (longitud máxima ' + restriction.maxLength + ')'
          );
        }
      }
    }

    // c) Time validation (hh:mm / 24h)
    if (!RegexValidations.isTime24Hours(fieldValue)) {
      this.formField.validField = false;
      this.validateFieldAddMsgs(
        `El valor indicado no cumple con un formato 
                válido: "hh:mm". Ejemplo  de hora válida: 01:45`
      );
    }
    return this.formField.validField;
  }
}

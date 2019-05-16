import { Component, Input } from '@angular/core';
import { LocaleES } from '../../../../resources/localization/es-ES.lang';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GpFormField } from '../../resources/form-field.model';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GPUtil } from '../../../../services/core/gp-util.service';
import { CalendarLocaleConfigES } from '../../../../resources/data/calendar/calendar-locale.config';

@Component({
  selector: 'gp-form-calendar-field',
  templateUrl: './form-calendar-field.component.html',
})
export class FormCalendarFieldComponent extends GpFormFieldControl {
  /**
   * The formField for this component
   */
  @Input() formField: GpFormField;

  /**
   * The locale configuration for component
   */
  config = CalendarLocaleConfigES;

  /**
   * Date default format
   */
  dateFormat = 'dd/mm/yy';

  constructor() {
    super();
  }

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
    editedRow[this.formField.fieldMetadata.fieldName] = GPUtil.dateToYyyymmdd(this.currentValue);
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any) {
    const value = editedRow[this.formField.fieldMetadata.fieldName];
    this.currentValue = GPUtil.str2Date(value, 'YYYY-MM-DD');
  }

  /**
   * Starts validation for editing row
   * @param editedRow The editing row
   */
  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;
    const inputValue = editedRow[this.formField.fieldMetadata.fieldName];

    // a) Check nullability
    const notNullable =
      this.formField.fieldMetadata.notNull && (inputValue === '' || inputValue === null);

    if (notNullable) {
      this.formField.validField = false;
      this.validateFieldAddMsgs(LocaleES.VALUE_IS_REQUIRED);
      return false;
    }

    return this.formField.validField;
  }
}

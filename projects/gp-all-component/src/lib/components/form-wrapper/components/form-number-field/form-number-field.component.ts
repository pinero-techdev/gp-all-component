import { Component, OnInit, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../resources/form-field.model';
import { GpTableRestrictions } from '../../../table-wrapper/resources/gp-table-restrictions.enum';
import { LocaleES } from '../../../../resources/localization/es-ES.lang';

@Component({
  selector: 'gp-form-number-field',
  templateUrl: './form-number-field.component.html',
  styleUrls: ['./form-number-field.component.scss'],
})
export class FormNumberFieldComponent extends GpFormFieldControl implements OnInit {
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

  ngOnInit() {
    this.init();
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
   * Initializes current component,
   * and sets length validation properties
   */
  init() {
    const restrictions = this.formField.fieldMetadata.restrictions;

    // Setup restrictions
    if (restrictions) {
      for (const restriction of restrictions) {
        const isMinLength = restriction.restrictionType === GpTableRestrictions.MIN_LENGTH;
        const isMaxLength = restriction.restrictionType === GpTableRestrictions.MAX_LENGTH;

        if (isMinLength) {
          this.minLength = restriction.minLength;
        }

        if (isMaxLength) {
          this.maxLength = restriction.maxLength;
        }
      }
    }
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

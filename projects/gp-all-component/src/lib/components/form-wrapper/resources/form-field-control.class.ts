import { GPUtil } from './../../../services/core/gp-util.service';
import { RegexValidations } from './regex-validations.type';
import { LocaleES } from './../../../resources/localization/es-ES.lang';
import { GpTableRestrictions } from '@lib/components/table-wrapper/resources/gp-table-restrictions.enum';
import { Message } from 'primeng/api';
import { isNullOrUndefined } from 'util';
import { Input } from '@angular/core';
import { GpFormControl } from './form-control.model';
import { GpFormField } from './form-field.model';
import { GpFormFieldControlInterface } from './form-field-control.interface';
import { TableService } from '../../../services/api/table/table.service';

export abstract class GpFormFieldControl extends GpFormControl
  implements GpFormFieldControlInterface {
  /**
   * The current form field
   */
  @Input() formField: GpFormField;

  /**
   * Current form field value
   */
  currentValue: any;

  /**
   * isDisabled is set up when OnInit is called, used in the template.
   */
  isDisabled = false;

  /**
   * Min length validation value
   */
  minLength: number;

  /**
   * Max length validation value
   */
  maxLength: number;

  /**
   * Returns the current form field object.
   */
  abstract getFormField(): GpFormField;

  /**
   * Get the field value and set the accurate row object.
   * @param editedRow object
   */
  abstract copyValueFromControlToEditedRow(editedRow: any);

  /**
   * Get the row value and set the control value up.
   * @param editedRow object
   */
  abstract copyValueFromEditedRowToControl(editedRow: any);

  /**
   * Validate the field.
   * @param editedRow object
   */
  abstract validateField(editedRow: any);

  /**
   * Set a new message to the messages queue for showing an error/warning.
   * @param msg message string
   */
  validateFieldAddMsgs(msg: string) {
    const formField = this.getFormField();
    if (formField) {
      formField.validField = false;
      if (isNullOrUndefined(formField.fieldMsgs)) {
        formField.fieldMsgs = [];
      }
      formField.fieldMsgs.push({ severity: 'error', detail: msg } as Message);
    }
  }

  /**
   * Clear the validations messages and set the field as valid.
   */
  clearValidations() {
    const formField = this.getFormField();
    if (formField) {
      formField.fieldMsgs = null;
      formField.validField = true;
    }
  }

  /**
   * Set the flag isDisabled to true if the field is readonly/locked.
   */
  controlDisabled(): boolean {
    const formField = this.getFormField();
    return (
      !isNullOrUndefined(formField) &&
      (formField.formControl.lockFields ||
        formField.fieldMetadata.readOnly ||
        (formField.fieldMetadata.id && formField.formControl.edicionEdit))
    );
  }

  /**
   * Event when the field is changed by user
   */
  onFieldChange() {
    const field = this.getFormField();
    if (!field || !field.formControl) {
      return;
    }
    this.copyValueFromControlToEditedRow(field.formControl.editedRow);
  }

  /**
   * Starts validation for editing row
   * @param editedRow The editing row
   */
  validateTextField(editedRow: any = null) {
    if (this.formField && editedRow) {
      this.formField.validField = true;
      this.formField.fieldMsgs = null;

      let fieldValue = editedRow[this.formField.fieldMetadata.fieldName];

      const isDisplayType =
        typeof fieldValue === 'string' &&
        this.formField.fieldMetadata.displayInfo.displayType === TableService.TEXT_DISPLAY_TYPE;

      if (isDisplayType) {
        fieldValue = fieldValue.trim();
      }

      // Start field validation rules

      // a) Check nullability
      const notNullable =
        this.formField.fieldMetadata.notNull && (fieldValue === '' || fieldValue === null);

      if (notNullable) {
        this.formField.validField = false;
        this.validateFieldAddMsgs(LocaleES.VALUE_IS_REQUIRED);
        return false;
      }

      // b) Check length restrictions
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

      // c) Check ascii and special characters
      const allowsAscii = this.formField.fieldMetadata.allowAscii;

      if (!allowsAscii) {
        const hasBlankSpace = RegexValidations.hasBlankSpace(fieldValue);
        const disallowsSpaces =
          this.formField.fieldMetadata.displayInfo.textProperties !== null &&
          this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
            TableService.TEXT_NO_SPACE
          ) !== -1;

        if (disallowsSpaces && hasBlankSpace) {
          this.formField.validField = false;
          this.validateFieldAddMsgs(LocaleES.VALIDATION_SPACES);
          fieldValue = fieldValue.replace(RegexValidations.BLANK_SPACE, '');
          this.currentValue = fieldValue;
        }

        if (RegexValidations.hasControlSpace(fieldValue)) {
          this.formField.validField = false;
          this.validateFieldAddMsgs(LocaleES.VALIDATION_CONTROL_SPACES);
          fieldValue = fieldValue.replace(RegexValidations.CONTROL_SPACE, ' ');
          this.currentValue = fieldValue;
        }

        if (RegexValidations.hasSpecialCharacters(fieldValue)) {
          this.formField.validField = false;
          this.validateFieldAddMsgs(LocaleES.VALIDATION_SPECIAL_CHARACTERS);
          fieldValue = GPUtil.normalize(fieldValue);
          this.currentValue = fieldValue;
        }
      }
    }
    return this.formField && editedRow ? this.formField.validField : false;
  }

  /**
   * Setup restrictions used in text fields
   */
  setRestrictions() {
    const restrictions =
      this.formField && this.formField.fieldMetadata
        ? this.formField.fieldMetadata.restrictions
        : null;

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
}

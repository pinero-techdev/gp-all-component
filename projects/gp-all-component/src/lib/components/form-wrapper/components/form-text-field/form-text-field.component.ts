import { Component, Input, OnInit } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../resources/form-field.model';
import { TableService } from '../../../../services/api/table/table.service';
import { GpTableRestrictions } from '../../../table-wrapper/resources/gp-table-restrictions.enum';
import { GPUtil } from '../../../../services/core/gp-util.service';
import { RegexValidations } from '../../resources/regex-validations.type';
import { LocaleES } from '../../../../resources/localization/es-ES.lang';


@Component({
  selector: 'gp-form-text-field',
  templateUrl: './form-text-field.component.html',
  styleUrls: ['./form-text-field.component.scss'],
})
export class FormTextFieldComponent extends GpFormFieldControl implements OnInit {
  /**
   * The formField for this component
   */
  @Input() formField1: GpFormField;

  @Input() canTranslate = true;

  /**
   * Class for textbox
   */
  textboxClass = 'full-width';

  /**
   * Min length validation value
   */
  minLength1: number;

  /**
   * Max length validation value
   */
  maxLength1: number;

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
    const hasTextProperties =
      this.formField.fieldMetadata.displayInfo &&
      this.formField.fieldMetadata.displayInfo.textProperties !== null;

    if (hasTextProperties) {
      const markedAsUppercase =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
          TableService.TEXT_UPPERCASE
        ) !== -1;

      if (markedAsUppercase) {
        this.textboxClass = 'full-width text-uppercase';
      }
    }

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
    let newValue = this.currentValue;
    const hasTextProperties =
      this.formField.fieldMetadata.displayInfo &&
      this.formField.fieldMetadata.displayInfo.textProperties !== null;

    if (hasTextProperties) {
      const markedAsUppercase =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
          TableService.TEXT_UPPERCASE
        ) !== -1;

      const markedAsTrim =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_TRIM) >=
        0;

      if (markedAsUppercase) {
        newValue = newValue==null ? null : newValue.toUpperCase();
        this.currentValue = newValue;
      }

      if (markedAsTrim) {
        newValue = newValue == null ? null : newValue.trim();
        this.currentValue = newValue;
      }
    }
    editedRow[this.formField.fieldMetadata.fieldName] = newValue;
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any) {
    // tslint:disable
    const hasTranslationKeyFields =
      this.formField.fieldMetadata.displayInfo.translationInfo != null &&
      this.formField.fieldMetadata.displayInfo.translationInfo.keyFields != null;
    // tslint:enable
    this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];

    if (hasTranslationKeyFields) {
      const keyFields = this.formField.fieldMetadata.displayInfo.translationInfo.keyFields;

      this.translationKeys = '';
      for (const keyField of keyFields) {
        this.translationKeys += editedRow[keyField];
      }
    }
  }

  /**
   * Starts validation for editing row
   * @param editedRow The editing row
   */
  validateField(editedRow: any) {
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
    return this.formField.validField;
  }
}

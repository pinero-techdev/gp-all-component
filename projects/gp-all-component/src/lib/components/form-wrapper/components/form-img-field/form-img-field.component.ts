import { Component, OnInit, Input } from '@angular/core';
import { DataTableMetaDataField } from './../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GpFormField } from '../../resources/form-field.model';
import { TableService } from './../../../../services/api/table/table.service';
import { GpTableRestrictions } from './../../../table-wrapper/resources/gp-table-restrictions.enum';
import { LocaleES } from '@lib/resources/localization/es-ES.lang';
import { RegexValidations } from '../../resources/regex-validations.type';

@Component({
  selector: 'gp-form-img-field',
  templateUrl: './form-img-field.component.html',
  styleUrls: ['./form-img-field.component.scss'],
})
export class FormImgFieldComponent extends GpFormFieldControl implements OnInit {
  @Input() formField: GpFormField;

  textboxClass: string;
  minLength: number;
  maxLength: number;

  /**
   * Translation keys for field
   */
  translationKeys = '';

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField && this.formField.fieldMetadata ? this.formField.fieldMetadata : null;
  }

  public getFormField(): GpFormField {
    return this.formField;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    const restrictions = this.formField.fieldMetadata.restrictions;
    const hasTextProperties =
      this.formField.fieldMetadata.displayInfo &&
      this.formField.fieldMetadata.displayInfo.textProperties !== null;

    if (hasTextProperties) {
      const setUppercase =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
          TableService.TEXT_UPPERCASE
        ) !== -1;

      if (setUppercase) {
        this.textboxClass = 'text-uppercase';
      }
    }

    // Restrictions set up.
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

  copyValueFromControlToEditedRow(editedRow: any) {
    const hasTextProperties =
      this.formField.fieldMetadata.displayInfo && this.formField.fieldMetadata.displayInfo;

    let newValue = this.currentValue;

    if (hasTextProperties) {
      const setUppercase =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
          TableService.TEXT_UPPERCASE
        ) !== -1;

      const setTrimText =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_TRIM) !==
        -1;

      if (setUppercase) {
        newValue = newValue === null ? null : newValue.toUpperCase();
        this.currentValue = newValue;
      }

      if (setTrimText) {
        newValue = newValue === null ? null : newValue.trim();
        this.currentValue = newValue;
      }
    }

    editedRow[this.formField.fieldMetadata.fieldName] = newValue;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    const hasTranslationKeyFields =
      this.formField.fieldMetadata.displayInfo.translationInfo !== null &&
      this.formField.fieldMetadata.displayInfo.translationInfo.keyFields !== null;

    this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];

    if (hasTranslationKeyFields) {
      const keyFields = this.formField.fieldMetadata.displayInfo.translationInfo.keyFields;
      this.translationKeys = '';

      for (const keyField of keyFields) {
        this.translationKeys += editedRow[keyField];
      }
    }
  }

  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;
    let fieldValue = editedRow[this.formField.fieldMetadata.fieldName];

    const isDisplayType =
      typeof fieldValue === 'string' &&
      this.formField.fieldMetadata.displayInfo.displayType === TableService.TEXT_DISPLAY_TYPE;

    const notNullable =
      this.formField.fieldMetadata.notNull && (fieldValue === '' || fieldValue === null);

    const restrictions = this.formField.fieldMetadata.restrictions;
    const allowAcii = this.formField.fieldMetadata.allowAscii;

    if (isDisplayType) {
      fieldValue = fieldValue.trim();
    }

    /*
        Field validation rules.
        a) Check nullability
    */
    if (notNullable) {
      this.formField.validField = false;
      this.validateFieldAddMsgs(LocaleES.VALUE_IS_REQUIRED);
      return false;
    }
    // b) check restrictions
    if (restrictions) {
      for (const restriction of restrictions) {
        const hasMinLength =
          typeof fieldValue === 'string' &&
          restriction.restrictionType === GpTableRestrictions.MIN_LENGTH;

        const hasMaxLength =
          typeof fieldValue === 'string' &&
          restriction.restrictionType === GpTableRestrictions.MAX_LENGTH;

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
    if (!allowAcii) {
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
    }
    return this.formField.validField;
  }
}

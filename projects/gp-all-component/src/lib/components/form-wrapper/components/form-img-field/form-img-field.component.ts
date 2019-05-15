import { LocaleES } from './../../../../resources/localization/es-ES.lang';
import { Component, OnInit, Input } from '@angular/core';
import { DataTableMetaDataField } from './../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GpFormField } from '../../resources/form-field.model';
import { TableService } from './../../../../services/api/table/table.service';
import { GpTableRestrictions } from './../../../table-wrapper/resources/gp-table-restrictions.enum';
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
    this.isDisabled = this.controlDisabled();
  }

  init() {
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

    this.setRestrictions();
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
    return this.validateTextField(editedRow);
  }
}

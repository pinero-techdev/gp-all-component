import { Component, OnInit, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../resources/form-field.model';
import { TableService } from '../../../../services/api/table/table.service';
import { isUndefined } from 'util';

@Component({
  selector: 'gp-form-textarea-field',
  templateUrl: './form-text-area-field.component.html',
  styleUrls: ['./form-text-area-field.component.scss'],
})
export class FormTextAreaFieldComponent extends GpFormFieldControl implements OnInit {
  @Input() formField: GpFormField;
  @Input() canTranslate = true;
  maxLength: number;
  name = 'field-textarea';
  minLength: number;
  rows: number;
  textboxClass: string;
  translationKeys: string;

  ngOnInit() {
    this.init();
    this.isDisabled = this.controlDisabled();
  }

  get displayInfo() {
    const metadata = this.getFieldMetadata();
    return metadata ? metadata.displayInfo : null;
  }

  get translateInfo() {
    return this.displayInfo ? this.displayInfo.translationInfo : null;
  }

  /**
   * Returns current field metadata
   */
  getFieldMetadata(): DataTableMetaDataField {
    return this.formField ? this.formField.fieldMetadata : null;
  }

  /**
   * Returns current form field
   */
  getFormField(): GpFormField {
    return isUndefined(this.formField) ? null : this.formField;
  }

  /**
   * Initializes current component,
   * and sets length validation properties
   */
  init() {
    if (this.displayInfo) {
      if (
        this.displayInfo.textProperties &&
        this.displayInfo.textProperties.indexOf(TableService.TEXT_UPPERCASE) !== -1
      ) {
        this.textboxClass = 'text-uppercase';
      }

      this.rows =
        this.displayInfo.rowsTextArea && this.displayInfo.rowsTextArea > 0
          ? this.displayInfo.rowsTextArea
          : 3;
    }
    const metadata = this.getFieldMetadata();
    this.name = metadata ? metadata.fieldName : '';
    this.setRestrictions();
  }

  /**
   * Copies value from control to editing row
   * @param editedRow The editing row
   */
  copyValueFromControlToEditedRow(editedRow: any = null) {
    if (this.displayInfo.textProperties) {
      if (this.displayInfo.textProperties.indexOf(TableService.TEXT_UPPERCASE) >= 0) {
        this.currentValue = !this.currentValue ? null : this.currentValue.toUpperCase();
      }
      if (this.displayInfo.textProperties.indexOf(TableService.TEXT_TRIM) >= 0) {
        this.currentValue = !this.currentValue ? null : this.currentValue.trim();
      }
    }

    const metadata = this.getFieldMetadata();
    if (metadata && editedRow) {
      editedRow[metadata.fieldName] = this.currentValue;
    }
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any = null) {
    const metadata = this.getFieldMetadata();

    if (metadata && editedRow) {
      const keyFields =
        this.displayInfo && this.displayInfo.translationInfo
          ? this.displayInfo.translationInfo.keyFields
          : [];

      this.currentValue = editedRow[metadata.fieldName];

      /* If it has translation, we collect all the values of the fields that act as
      identifiers and put them together to create the translation table identifier */
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
  validateField(editedRow: any = null) {
    return this.validateTextField(editedRow);
  }
}

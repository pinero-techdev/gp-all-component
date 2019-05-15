import { Component, OnInit, Input } from '@angular/core';
import { GpFormFieldControl } from './../../resources/form-field-control.class';
import { DataTableMetaDataField } from './../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from './../../resources/form-field.model';
import { TableService } from './../../../../services/api/table/table.service';

@Component({
  selector: 'gp-form-wysiwyg-field',
  templateUrl: './form-wysiwyg-field.component.html',
  styleUrls: ['./form-wysiwyg-field.component.scss'],
})
export class FormWysiwygFieldComponent extends GpFormFieldControl implements OnInit {
  @Input() formField: GpFormField;

  textboxClass: string;
  minLength: number;
  maxLength: number;

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField && this.formField.fieldMetadata ? this.formField.fieldMetadata : null;
  }

  ngOnInit() {
    this.init();
  }

  public getFormField(): GpFormField {
    return this.formField;
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
      this.formField.fieldMetadata.displayInfo &&
      this.formField.fieldMetadata.displayInfo.textProperties;
    let newValue = this.currentValue;

    if (hasTextProperties) {
      const setUppercase =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(
          TableService.TEXT_UPPERCASE
        ) !== -1;
      const setTrim =
        this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_TRIM) !==
        -1;

      if (setUppercase) {
        newValue = newValue === null ? null : newValue.toUpperCase();
        this.currentValue = newValue;
      }
      if (setTrim) {
        newValue = newValue === null ? null : newValue.trim();
        this.currentValue = newValue;
      }
    }

    editedRow[this.formField.fieldMetadata.fieldName] = newValue;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    if (this.formField.fieldMetadata.fieldName) {
      this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];
    }
  }

  validateField(editedRow: any) {
    return this.validateTextField(editedRow);
  }
}

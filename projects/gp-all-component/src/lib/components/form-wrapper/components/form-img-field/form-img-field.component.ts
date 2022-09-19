import { Component, OnInit, Input } from '@angular/core';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GpFormField } from '../../resources/form-field.model';
import { TableService } from '../../../../services/api/table/table.service';

@Component({
  selector: 'gp-form-img-field',
  templateUrl: './form-img-field.component.html',
  styleUrls: ['./form-img-field.component.scss'],
})
export class FormImgFieldComponent extends GpFormFieldControl implements OnInit {
  @Input() formField: GpFormField;

  /* Add textboxClass to file input*/
  textboxClass: string;

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField && this.formField.fieldMetadata ? this.formField.fieldMetadata : null;
  }

  public getFormField(): GpFormField {
    return this.formField ? this.formField : null;
  }

  ngOnInit() {
    this.init();
    this.isDisabled = this.controlDisabled();
  }

  /* Init method to setup  */
  init() {
    const hasTextProperties =
      (this.formField.fieldMetadata.displayInfo) &&
      (this.formField.fieldMetadata.displayInfo.textProperties);

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

  /* Depending of the restrictions, the current value is formatted */
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
    if (editedRow) {
      editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    }
  }

  /* After change in a table crud, the current value needs to be updated */
  copyValueFromEditedRowToControl(editedRow: any) {
    if (this.formField && this.formField.fieldMetadata) {
      this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];
    }
  }

  /* Check the validations when the current value is changed */
  validateField(editedRow: any) {
    return this.validateTextField(editedRow);
  }
}

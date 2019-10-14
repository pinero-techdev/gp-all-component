import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { FieldType } from '../../../../resources/data/data-table/meta-data/meta-data-field.model';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-form-text-field',
  templateUrl: './form-text-field.component.html',
  styleUrls: ['./form-text-field.component.scss'],
})
export class FormTextFieldComponent extends GpFormFieldControl {
  /**
   * Translation keys for field
   */
  translationKeys: string;

  fieldType = FieldType;

  /**
   * Current form field value
   */
  @Input() set currentValue(v: string) {
    const value = GPUtil.isNullOrUndefined(v) ? null : v;
    this._currentValue = this.setTextProperties(value);
    this.copyValueFromControlToEditedRow(this.formField.formControl.editedRow);
  }

  get currentValue() {
    return this._currentValue;
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any) {
    if (this.formField) {
      this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];

      const hasTranslationKeyFields =
        !GPUtil.isNullOrUndefined(this.formField.fieldMetadata.displayInfo.translationInfo) &&
        !GPUtil.isNullOrUndefined(
          this.formField.fieldMetadata.displayInfo.translationInfo.keyFields
        );

      if (hasTranslationKeyFields) {
        const keyFields = this.formField.fieldMetadata.displayInfo.translationInfo.keyFields;

        this.translationKeys = '';
        for (const keyField of keyFields) {
          this.translationKeys += editedRow[keyField];
        }
      }
    }
  }
}

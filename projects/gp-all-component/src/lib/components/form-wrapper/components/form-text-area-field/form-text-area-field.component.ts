import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-form-textarea-field',
  templateUrl: './form-text-area-field.component.html',
  styleUrls: ['./form-text-area-field.component.scss'],
})
export class FormTextAreaFieldComponent extends GpFormFieldControl {
  translationKeys: string;

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
    if (this.formField && editedRow) {
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

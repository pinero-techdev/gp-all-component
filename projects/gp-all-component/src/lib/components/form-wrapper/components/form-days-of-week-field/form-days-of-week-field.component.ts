import { Component, Input, OnInit } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../resources/form-field.model';

@Component({
  selector: 'gp-form-days-of-week-field',
  templateUrl: './form-days-of-week-field.component.html',
  styleUrls: ['./form-days-of-week-field.component.scss'],
})
export class FormDaysOfWeekFieldComponent extends GpFormFieldControl implements OnInit {
  /**
   * The formField for this component
   */
  @Input() formField: GpFormField;

  day1Checked: boolean;
  day2Checked: boolean;
  day3Checked: boolean;
  day4Checked: boolean;
  day5Checked: boolean;
  day6Checked: boolean;
  day7Checked: boolean;
  // tslint:disable-next-line:max-line-length
  // currentValue = [this.day1Checked,this.day2Checked, this.day3Checked, this.day4Checked, this.day5Checked, this.day6Checked, this.day7Checked];
  ngOnInit() {
    this.isDisabled = this.controlDisabled();
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
   * Copies value from control to editing row
   * @param editedRow The editing row
   */
  copyValueFromControlToEditedRow(editedRow: any) {
    // Copia el valor recogido al current value - Ej '0000111'
    editedRow[this.formField.fieldMetadata.fieldName] = this.currentValue;
    console.log('valor actual BBDD: ' + this.getValueToBBDD());
    // Pasamos este valor a las checkboxes
    this.setValueToCheckboxes(this.currentValue);
  }

  /**
   * Copies values from editing row to control
   * @param editedRow The editing row
   */
  copyValueFromEditedRowToControl(editedRow: any) {
    // tslint:enable
    console.log('copyValueFromEditedRowToControl - currentValue = ' + this.currentValue);
    this.currentValue = editedRow[this.formField.fieldMetadata.fieldName];
    console.log('copyValueFromEditedRowToControl - currentValue = ' + this.currentValue);
  }

  /**
   * Starts validation for editing row
   * @param editedRow The editing row
   */
  validateField(editedRow: any) {
    if (this.formField !== undefined) {
      this.formField.validField = true;
      this.formField.fieldMsgs = null;
      return this.formField.validField;
    }
    return false;
  }
  dayChanged(day: number, $event) {
    console.log('day ' + day + ' status: ' + $event);
    if (day === 1) {
      this.day1Checked = $event;
    } else if (day === 2) {
      this.day2Checked = $event;
    } else if (day === 3) {
      this.day3Checked = $event;
    } else if (day === 4) {
      this.day4Checked = $event;
    } else if (day === 5) {
      this.day5Checked = $event;
    } else if (day === 6) {
      this.day6Checked = $event;
    } else if (day === 7) {
      this.day7Checked = $event;
    }
    this.copyValueFromEditedRowToControl(this.getValueToBBDD());
  }
  setValueToCheckboxes(value: string) {
    this.day1Checked = this.strToBool(value.charAt(0));
    this.day2Checked = this.strToBool(value.charAt(1));
    this.day3Checked = this.strToBool(value.charAt(2));
    this.day4Checked = this.strToBool(value.charAt(3));
    this.day5Checked = this.strToBool(value.charAt(4));
    this.day6Checked = this.strToBool(value.charAt(5));
    this.day7Checked = this.strToBool(value.charAt(6));
  }
  boolToStr(bool: boolean) {
    return bool
      ? this.formField.fieldMetadata.displayInfo.checkedValue
      : this.formField.fieldMetadata.displayInfo.uncheckedValue;
  }
  strToBool(str: string) {
    return str === this.formField.fieldMetadata.displayInfo.checkedValue;
  }
  getValueToBBDD() {
    let newValue = '';
    newValue += this.boolToStr(this.day1Checked);
    newValue += this.boolToStr(this.day2Checked);
    newValue += this.boolToStr(this.day3Checked);
    newValue += this.boolToStr(this.day4Checked);
    newValue += this.boolToStr(this.day5Checked);
    newValue += this.boolToStr(this.day6Checked);
    newValue += this.boolToStr(this.day7Checked);
    return newValue;
  }
}

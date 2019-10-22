import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/form-field-control.class';
import { GPUtil } from '../../../../services/core/gp-util.service';
import { CalendarLocaleConfigES } from '../../../../resources/data/calendar/calendar-locale.config';

@Component({
  selector: 'gp-form-calendar-field',
  templateUrl: './form-calendar-field.component.html',
  styleUrls: ['./form-calendar-field.component.scss'],
})
export class FormCalendarFieldComponent extends GpFormFieldControl {
  /**
   * The locale configuration for component
   */
  config = CalendarLocaleConfigES;

  /**
   * Date default format
   */
  dateFormat = 'dd/mm/yy';

  defaultDate = new Date();

  value: Date = new Date();

  @Input() set currentValue(v: Date) {
    this._currentValue = new Date(v);
    if (isNaN(this._currentValue.getDay()) || !(this._currentValue instanceof Date) || !v) {
      this._currentValue = new Date();
    }
  }

  get currentValue(): Date {
    return this._currentValue;
  }

  protected init() {
    this.copyValueFromControlToEditedRow(this.formField.formControl.editedRow);
  }
  /**
   * Copies value from control to editing row
   * @param editedRow The editing row
   */
  copyValueFromControlToEditedRow(editedRow: any) {
    if (this.formField && editedRow) {
      editedRow[this.formField.fieldMetadata.fieldName] = GPUtil.dateToYyyymmdd(this.currentValue);
    }
  }
}

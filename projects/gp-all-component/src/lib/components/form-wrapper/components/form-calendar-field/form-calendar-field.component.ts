import { Component, Input } from '@angular/core';
import { GpFormFieldControl } from '../../resources/gp-form-field-control';
import { GpFormField } from '../../resources/gp-form-field.model';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GPUtil } from '../../../../services/core/gp-util.service';

@Component({
  selector: 'gp-form-calendar-field',
  templateUrl: './form-calendar-field.component.html',
  styleUrls: ['./form-calendar-field.component.scss'],
})
export class FormCalendarFieldComponent extends GpFormFieldControl {
  @Input() formField: GpFormField;

  dateFormat = 'dd/mm/yy';

  es = {
    closeText: 'Cerrar',
    prevText: '<Ant',
    nextText: 'Sig>',
    currentText: 'Hoy',
    monthNames: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    monthNamesShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ],
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    weekHeader: 'Sm',
    // defaultDate: new Date(),
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: '',
    firstDayOfWeek: 1,
    today: 'Today',
    clear: 'Clear',
  };

  constructor() {
    super();
  }

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField.fieldMetadata;
  }

  getFormField(): GpFormField {
    return this.formField;
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    editedRow[this.formField.fieldMetadata.fieldName] = GPUtil.dateToYyyymmdd(this.currentValue);
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    const value = editedRow[this.formField.fieldMetadata.fieldName];
    this.currentValue = GPUtil.str2Date(value, 'YYYY-MM-DD');
  }

  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;
    const inputValue = editedRow[this.formField.fieldMetadata.fieldName];

    if (this.formField.fieldMetadata.notNull && (inputValue === '' || inputValue == null)) {
      this.formField.validField = false;
      this.validateFieldAddMsgs('El valor es obligatorio.');
      return false;
    }

    return this.formField.validField;
  }
}

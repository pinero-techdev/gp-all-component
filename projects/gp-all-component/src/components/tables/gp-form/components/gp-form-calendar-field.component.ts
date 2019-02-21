import {Component, OnInit} from '@angular/core';
import {DataTableMetaDataField} from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import {GPUtil} from '../../../../services/gp-util.service';
import {GpFormFieldControl} from '../resources/gp-form-field-control';
import {GpFormField} from '../resources/gp-form-field.model';

@Component({
  selector: 'gp-form-calendar-field',
  templateUrl: './gp-form-calendar-field.component.html'
})
export class GpFormCalendarFieldComponent extends GpFormFieldControl implements OnInit {
  dateFormat = 'dd/mm/yy';

  es = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
            'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
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

  getFieldMetadata(): DataTableMetaDataField {
    return this.formField.fieldMetadata;
  }

  ngOnInit() {
  }

  public getFormField(): GpFormField {
    return this.formField;
  }

  copyValueFromControlToEditedRow(editedRow: any) {
    // console.log( 'copyValueFromControlToEditedRow, editedRow: ' + JSON.stringify( editedRow ) );
    // console.log( 'copyValueFromControlToEditedRow, currentValue: ' + JSON.stringify( this.currentValue ) );
    editedRow[this.formField.fieldMetadata.fieldName] = GPUtil.dateToYyyymmdd(this.currentValue);
    // console.log( 'copyValueFromControlToEditedRow, editedRow field: ' + JSON.stringify( editedRow[this.formField.fieldMetadata.fieldName] ) );
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    const value = editedRow[this.formField.fieldMetadata.fieldName];
    // console.log( 'copyValueFromEditedRowToControl, editedRow: ' + JSON.stringify( editedRow ) );
    // console.log( 'copyValueFromEditedRowToControl, value: ' + JSON.stringify( value ) );
    this.currentValue = GPUtil.str2Date(value, 'YYYY-MM-DD');
    // console.log( 'copyValueFromEditedRowToControl, currentValue: ' + JSON.stringify( this.currentValue ) );
  }

  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;
    const valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
    // Validacion del campo.
    // a) Null?
    if (this.formField.fieldMetadata.notNull && (valorCampo === '' || valorCampo == null)) {
      this.formField.validField = false;
      this.validateFieldAddMsgs('El valor es obligatorio.');
      return false;
    }
    if (this.formField.fieldMetadata.restrictions) {
    }
    return this.formField.validField;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FieldMetadata } from '../../services/table.service';
import { GPUtil } from '../../resources/data/gpUtil';
import { GpFormField, GpFormFieldControl } from './gp-app-table-crud-shared';

@Component({
  selector: 'gp-form-calendar-field',
  templateUrl: './gp-form-calendar-field.component.html'
})
export class GpFormCalendarFieldComponent extends GpFormFieldControl implements OnInit {
  
  @Input() formField: GpFormField;

  currentValueDate: Date = null;

  dateFormat: string = 'dd/mm/yy';

  es: any;

  public static FORM_FIELD_TYPE_CALENDAR_FIELD: string = 'gp-form-calendar-field';

  getFieldMetadata(): FieldMetadata {
    return this.formField.fieldMetadata;
  }

  ngOnInit() {
    this.inicializa();
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    }
  }

  public getFormField(): GpFormField {
    return this.formField;
  }

  inicializa() {
  }

  copyValueFromControlToEditedRow( editedRow : any) {
    let value = editedRow[this.formField.fieldMetadata.fieldName];
    console.log('GpFormCalendarFieldComponent.copyValueFromControlToEditedRow currentValueDate ' + JSON.stringify( this.currentValueDate ) );
    let newValue = GPUtil.dateToYyyymmdd(this.currentValueDate, this.dateFormat, value); // GPUtil.dateToYyyymmdd( this.currentValueDate, this.dateFormat );
    console.log("GpFormCalendarFieldComponent.copyValueFromControlToEditedRow currentValue '" + value + "' -> '" + newValue + "'");
    // console.log("GpFormFieldComponent.changeItemValue newValue '" + newValue + "'" );
    editedRow[this.formField.fieldMetadata.fieldName] = newValue;
  }

  copyValueFromEditedRowToControl(editedRow: any) {
    console.log('GpFormCalendarFieldComponent.copyValueFromEditedRowToControl: ' + JSON.stringify(this.formField.fieldMetadata));
    console.log('        editedRow: ' + JSON.stringify(editedRow));
    let value = editedRow[this.formField.fieldMetadata.fieldName];
    this.currentValueDate = GPUtil.yyyymmddToDate(value /*, this.dateFormat*/); // GPUtil.yyyymmddToDate( value );
    console.log('GpFormCalendarFieldComponent.copyValueFromEditedRowToControl currentValueDate ' + JSON.stringify(this.currentValueDate));
  }

  validateField(editedRow: any) {
    this.formField.validField = true;
    this.formField.fieldMsgs = null;

    let valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
    console.log('GpFormCalendarFieldComponent.validateField, valorCampo = ' + JSON.stringify(valorCampo));

    // Validacion del campo.
    // a) Null?
    if (this.formField.fieldMetadata.notNull && (valorCampo == '' || valorCampo == null)) {
      this.formField.validField = false;
      this.validateFieldAddMsgs('El valor es obligatorio.');
      console.log('GpFormCalendarFieldComponent.validateField, no valid, null.');
      return false;
    }

    if (this.formField.fieldMetadata.restrictions) {
    }

    return this.formField.validField;
  }
}

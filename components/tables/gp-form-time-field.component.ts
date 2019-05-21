import {Component, Input, OnInit} from "@angular/core";
import {TableService, FieldMetadata} from "../../services/table.service";
import {GPUtil} from "../../resources/data/gpUtil";
import {GpFormField, GpFormFieldControl} from "./gp-app-table-crud-shared";

@Component({
    selector: 'gp-form-time-field',
    templateUrl: './gp-form-time-field.component.html'
})
export class GpFormTimeFieldComponent extends GpFormFieldControl implements OnInit {

    @Input() public formField:GpFormField;

    public currentValueDate:Date;

    timeFormat = 'hh:mm';

    public static FORM_FIELD_TYPE_TIME_FIELD:string = "gp-form-time-field";

    getFieldMetadata():FieldMetadata {
        return this.formField.fieldMetadata;
    }

    ngOnInit() {
        this.inicializa();
    }

    public getFormField():GpFormField {
        return this.formField;
    }

    inicializa() {
    }

    copyValueFromControlToEditedRow(editedRow:any) {
        let value = editedRow[this.formField.fieldMetadata.fieldName];
        console.log("GpFormTimeFieldComponent.copyValueFromControlToEditedRow currentValueDate " + JSON.stringify(this.currentValueDate));
        let newValue = GPUtil.dateTohhmm(this.currentValueDate, this.timeFormat); // GPUtil.dateToYyyymmdd( this.currentValueDate, this.dateFormat );
        console.log("GpFormCalendarFieldComponent.copyValueFromControlToEditedRow currentValue '" + value + "' -> '" + newValue + "'");
        editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    }

    copyValueFromEditedRowToControl(editedRow:any) {
        console.log("GpFormTextFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        let value = editedRow[this.formField.fieldMetadata.fieldName];
        this.currentValueDate = GPUtil.hhmmToDate(value, this.timeFormat);
    }

    validateField(editedRow:any) {
        this.formField.validField = true;
        this.formField.fieldMsgs = null;

        let valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
        if ((typeof valorCampo == "string") && this.formField.fieldMetadata.displayInfo.displayType == TableService.TEXT_DISPLAY_TYPE) {
            valorCampo = valorCampo.trim();
        }

        console.log("GpFormTextFieldComponent.validateField, valorCampo = " + JSON.stringify(valorCampo));

        // Validacion del campo.
        // a) Null?
        if (this.formField.fieldMetadata.notNull && ( valorCampo == "" || valorCampo == null )) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor es obligatorio.');
            console.log("GpFormTextFieldComponent.validateField, no valid, null.");
            return false;
        }

        if (this.formField.fieldMetadata.restrictions) {
            for (let restriction of this.formField.fieldMetadata.restrictions) {
                if (restriction.restrictionType == TableService.RESTRICTION_MIN_LENGTH && typeof valorCampo == "string") {
                    if (valorCampo.length < restriction.minLength) {
                        this.formField.validField = false;
                        this.validateFieldAddMsgs('Valor demasiado corto (longitud mínima ' + restriction.minLength + ')');
                        console.log("GpFormTextFieldComponent.validateField, no valid, longitud massa curta.")
                    }
                }
                else if (restriction.restrictionType == TableService.RESTRICTION_MAX_LENGTH && typeof valorCampo == "string") {
                    if (valorCampo.length > restriction.maxLength) {
                        this.formField.validField = false;
                        this.validateFieldAddMsgs('Valor demasiado largo (longitud máxima ' + restriction.maxLength + ')');
                        console.log("GpFormTextFieldComponent.validateField, no valid, longitud massa llarga.")
                    }
                }
            }
        }

        // Tiene que cumplir con el formato hh:mm. Con formato 24h
        if (!/(([0-1][1-9])|(2[0-3])):[0-5][0-9]/.test(valorCampo)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor indicado no cumple con un formato válido: "hh:mm". Ejemplo  de hora válida: 01:45');
            this.formField.validField = false;
        }
        return this.formField.validField;
    }
}
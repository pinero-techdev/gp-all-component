import {Component, Input, OnInit} from "@angular/core";
import {TableService, FieldMetadata} from "../../services/table.service";
import {GpFormField, GpFormFieldControl} from "./gp-app-table-crud-shared";

@Component({
    selector: 'gp-form-img-field',
    templateUrl: './gp-form-img-field.component.html'
})
export class GpFormImgFieldComponent extends GpFormFieldControl implements OnInit {

    @Input() formField:GpFormField;

    currentValueText:string;
    textboxClass:string;

    minLength:number;
    maxLength:number;

    public static FORM_FIELD_TYPE_IMG_FIELD:string = "gp-form-img-field";

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
        if (this.formField.fieldMetadata.displayInfo && this.formField.fieldMetadata.displayInfo.textProperties != null) {
            if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_UPPERCASE) != -1) {
                this.textboxClass = "text-uppercase";
            }
        }

        // Procesa restricciones.
        if (this.formField.fieldMetadata.restrictions) {
            for (let restriction of this.formField.fieldMetadata.restrictions) {
                if (restriction.restrictionType == TableService.RESTRICTION_MIN_LENGTH) {
                    this.minLength = restriction.minLength;
                }
                else if (restriction.restrictionType == TableService.RESTRICTION_MAX_LENGTH) {
                    this.maxLength = restriction.maxLength;
                }
            }
        }
    }

    copyValueFromControlToEditedRow(editedRow:any) {
        let value = editedRow[this.formField.fieldMetadata.fieldName];
        let newValue = this.currentValueText;
        console.log("GpFormImgFieldComponent.changeItemValue currentValue '" + value + "' -> '" + newValue + "'");
        if (this.formField.fieldMetadata.displayInfo.textProperties != null) {
            console.log("GpFormImgFieldComponent. textProperties: " + JSON.stringify(this.formField.fieldMetadata.displayInfo.textProperties));
            if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_UPPERCASE) >= 0) {
                newValue = newValue == null ? null : newValue.toUpperCase();
                this.currentValueText = newValue;
                console.log("GpFormImgFieldComponent.convert to upper case '" + newValue + "'");
            }
            if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_TRIM) >= 0) {
                newValue = newValue == null ? null : newValue.trim();
                this.currentValueText = newValue;
                console.log("GpFormImgFieldComponent.trim '" + newValue + "'");
            }
        }

        editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    }

    copyValueFromEditedRowToControl(editedRow:any) {
        console.log("GpFormImgFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        let value = editedRow[this.formField.fieldMetadata.fieldName];
        this.currentValueText = value;
    }

    validateField(editedRow:any) {
        this.formField.validField = true;
        this.formField.fieldMsgs = null;

        let valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
        if ((typeof valorCampo == "string") && this.formField.fieldMetadata.displayInfo.displayType == TableService.TEXT_DISPLAY_TYPE) {
            valorCampo = valorCampo.trim();
        }

        console.log("GpFormImgFieldComponent.validateField, valorCampo = " + JSON.stringify(valorCampo));

        // Validacion del campo.
        // a) Null?
        if (this.formField.fieldMetadata.notNull && ( valorCampo == "" || valorCampo == null )) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor es obligatorio.');
            console.log("GpFormImgFieldComponent.validateField, no valid, null.");
            return false;
        }

        if (this.formField.fieldMetadata.restrictions) {
            for (let restriction of this.formField.fieldMetadata.restrictions) {
                if (restriction.restrictionType == TableService.RESTRICTION_MIN_LENGTH && typeof valorCampo == "string") {
                    if (valorCampo.length < restriction.minLength) {
                        this.formField.validField = false;
                        this.validateFieldAddMsgs('Valor demasiado corto (longitud mínima ' + restriction.minLength + ')');
                        console.log("GpFormImgFieldComponent.validateField, no valid, longitud massa curta.")
                    }
                }
                else if (restriction.restrictionType == TableService.RESTRICTION_MAX_LENGTH && typeof valorCampo == "string") {
                    if (valorCampo.length > restriction.maxLength) {
                        this.formField.validField = false;
                        this.validateFieldAddMsgs('Valor demasiado largo (longitud máxima ' + restriction.maxLength + ')');
                        console.log("GpFormImgFieldComponent.validateField, no valid, longitud massa llarga.")
                    }
                }
            }
        }

        if (this.formField.fieldMetadata.displayInfo.textProperties != null) {
            if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(TableService.TEXT_NO_SPACE) != -1) {
                if (/\s/.test(valorCampo)) {
                    this.formField.validField = false;
                    this.validateFieldAddMsgs('El valor indicado no puede contener espacios. Han sido eliminados. Seleccione guardar otra vez para aceptar los cambios.');
                    valorCampo = valorCampo.replace(/\s/g, "");
                    this.currentValueText = valorCampo;
                }
            }
        }

        return this.formField.validField;
    }
}

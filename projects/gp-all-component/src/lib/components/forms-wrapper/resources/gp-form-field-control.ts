import { Input } from '@angular/core';
import { GpFormControl } from './gp-form-control.model';
import { GpFormField } from './gp-form-field.model';
import { GpFormFieldControlInterface } from './gp-form-field-control.interface';

// TODO optimizar 17/12/2018
export class GpFormFieldControl extends GpFormControl implements GpFormFieldControlInterface {
    @Input() formField: GpFormField;

    currentValue: any;

    public getFormField(): GpFormField {
        return null;
    }

    /* Coge el valor del campo y lo pasa al registro indicado. */
    copyValueFromControlToEditedRow(editedRow: any) {
        return;
    }

    /* Coge el valor de la fila y lo pasa al control. */
    copyValueFromEditedRowToControl(editedRow: any) {
        return;
    }

    /* Valida el campo. */
    validateField(editedRow: any): boolean {
        return false;
    }

    /* Añade un mensaje a la lista de mensajes del campo. */
    validateFieldAddMsgs(msg: string) {
        this.getFormField().validField = false;
        if (this.getFormField().fieldMsgs == null) {
            this.getFormField().fieldMsgs = [];
        }
        this.getFormField().fieldMsgs.push({ severity: 'error', detail: msg });
    }

    /* Limpia la lista de mensajes de validación del campo y marca
     * el campo como valido. */
    clearValidations() {
        this.getFormField().fieldMsgs = null;
        this.getFormField().validField = true;
    }

    controlDisabled(): boolean {
        return (
            this.getFormField().formControl.lockFields ||
            this.getFormField().fieldMetadata.readOnly ||
            (this.getFormField().fieldMetadata.id && this.getFormField().formControl.edicionEdit)
        );
    }

    onFieldChange() {
        if (!this.getFormField().formControl) {
            return;
        }
        this.copyValueFromControlToEditedRow(this.getFormField().formControl.editedRow);
    }
}

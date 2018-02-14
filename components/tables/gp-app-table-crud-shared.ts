import {FieldMetadata} from "../../services/table.service";
import {Message} from "primeng/components/common/api";

export class GpFormControl {
    // Fila editada.
    editedRow:any;

    // Fila en edicion (seleccionada con selectOneRow).
    // Contiene el valor original del registro que esta en edicion.
    originalRow:any;

    // Operacion que estamos realizando.
    edicionEdit = false;
    edicionAdd = false;

    // Indica si se permite la edicion de los campos.
    lockFields = false;
}

export class GpFormField {
    /* Tipo de control usado.*/
    formFieldType:string = null;
    /* Indica si el campo es valido o no. */
    validField:boolean = true;
    /* Mensajes de error asociados del campo. */
    fieldMsgs:Message[] = null;

    constructor(public formControl:GpFormControl, public fieldMetadata:FieldMetadata) {
    }
}

export class GpFormFieldControl {
    public getFormField():GpFormField {
        return null;
    }

    /* Coge el valor del campo y lo pasa al registro indicado. */
    copyValueFromControlToEditedRow(editedRow:any) {
    }

    /* Coge el valor de la fila y lo pasa al control. */
    copyValueFromEditedRowToControl(editedRow:any) {
    }

    /* Valida el campo. */
    validateField(editedRow:any):boolean {
        return false;
    }

    /* Añade un mensaje a la lista de mensajes del campo. */
    validateFieldAddMsgs(msg:string) {
        this.getFormField().validField = false;
        if (this.getFormField().fieldMsgs == null) {
            this.getFormField().fieldMsgs = [];
        }
        this.getFormField().fieldMsgs.push({severity: 'error', /*summary:'Información',*/ detail: msg});
    }

    /* Limpia la lista de mensajes de validación del campo y marca
     * el campo como valido. */
    clearValidations() {
        this.getFormField().fieldMsgs = null;
        this.getFormField().validField = true;
    }

    controlDisabled():boolean {
        return ( this.getFormField().formControl.lockFields || this.getFormField().fieldMetadata.readOnly || (this.getFormField().fieldMetadata.id && this.getFormField().formControl.edicionEdit) );
    }

    onFieldChange() {
        if (!this.getFormField().formControl) {
            return;
        }
        this.copyValueFromControlToEditedRow(this.getFormField().formControl.editedRow);
    }

}

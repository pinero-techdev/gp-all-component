"use strict";
var GpFormControl = (function () {
    function GpFormControl() {
        // Operacion que estamos realizando.
        this.edicionEdit = false;
        this.edicionAdd = false;
        // Indica si se permite la edicion de los campos.
        this.lockFields = false;
    }
    return GpFormControl;
}());
exports.GpFormControl = GpFormControl;
var GpFormField = (function () {
    function GpFormField(formControl, fieldMetadata) {
        this.formControl = formControl;
        this.fieldMetadata = fieldMetadata;
        /* Tipo de control usado.*/
        this.formFieldType = null;
        /* Indica si el campo es valido o no. */
        this.validField = true;
        /* Mensajes de error asociados del campo. */
        this.fieldMsgs = null;
    }
    return GpFormField;
}());
exports.GpFormField = GpFormField;
var GpFormFieldControl = (function () {
    function GpFormFieldControl() {
    }
    GpFormFieldControl.prototype.getFormField = function () {
        return null;
    };
    /* Coge el valor del campo y lo pasa al registro indicado. */
    GpFormFieldControl.prototype.copyValueFromControlToEditedRow = function (editedRow) { };
    /* Coge el valor de la fila y lo pasa al control. */
    GpFormFieldControl.prototype.copyValueFromEditedRowToControl = function (editedRow) { };
    /* Valida el campo. */
    GpFormFieldControl.prototype.validateField = function (editedRow) {
        return false;
    };
    /* Añade un mensaje a la lista de mensajes del campo. */
    GpFormFieldControl.prototype.validateFieldAddMsgs = function (msg) {
        this.getFormField().validField = false;
        if (this.getFormField().fieldMsgs == null) {
            this.getFormField().fieldMsgs = [];
        }
        this.getFormField().fieldMsgs.push({ severity: 'error', detail: msg });
    };
    /* Limpia la lista de mensajes de validación del campo y marca
     * el campo como valido. */
    GpFormFieldControl.prototype.clearValidations = function () {
        this.getFormField().fieldMsgs = null;
        this.getFormField().validField = true;
    };
    GpFormFieldControl.prototype.controlDisabled = function () {
        return (this.getFormField().formControl.lockFields || this.getFormField().fieldMetadata.readOnly || (this.getFormField().fieldMetadata.id && this.getFormField().formControl.edicionEdit));
    };
    GpFormFieldControl.prototype.onFieldChange = function () {
        if (!this.getFormField().formControl) {
            return;
        }
        this.copyValueFromControlToEditedRow(this.getFormField().formControl.editedRow);
    };
    return GpFormFieldControl;
}());
exports.GpFormFieldControl = GpFormFieldControl;
//# sourceMappingURL=gp-app-table-crud-shared.js.map
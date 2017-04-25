"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var table_service_1 = require("../../services/table.service");
var gpUtil_1 = require("../../resources/data/gpUtil");
var gp_app_table_crud_shared_1 = require("./gp-app-table-crud-shared");
var GpFormTextFieldComponent = (function (_super) {
    __extends(GpFormTextFieldComponent, _super);
    function GpFormTextFieldComponent() {
        _super.apply(this, arguments);
        this.translationKeys = '';
    }
    GpFormTextFieldComponent.prototype.getFieldMetadata = function () {
        return this.formField.fieldMetadata;
    };
    GpFormTextFieldComponent.prototype.ngOnInit = function () {
        this.inicializa();
    };
    GpFormTextFieldComponent.prototype.getFormField = function () {
        return this.formField;
    };
    GpFormTextFieldComponent.prototype.inicializa = function () {
        if (this.formField.fieldMetadata.displayInfo && this.formField.fieldMetadata.displayInfo.textProperties != null) {
            if (table_service_1.TableService.TEXT_UPPERCASE in this.formField.fieldMetadata.displayInfo.textProperties) {
                this.textboxClass = "text-uppercase";
            }
        }
        // Procesa restricciones.
        if (this.formField.fieldMetadata.restrictions) {
            for (var _i = 0, _a = this.formField.fieldMetadata.restrictions; _i < _a.length; _i++) {
                var restriction = _a[_i];
                if (restriction.restrictionType == table_service_1.TableService.RESTRICTION_MIN_LENGTH) {
                    this.minLength = restriction.minLength;
                }
                else if (restriction.restrictionType == table_service_1.TableService.RESTRICTION_MAX_LENGTH) {
                    this.maxLength = restriction.maxLength;
                }
            }
        }
    };
    GpFormTextFieldComponent.prototype.copyValueFromControlToEditedRow = function (editedRow) {
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        var newValue = this.currentValueText;
        console.log("GpFormTextFieldComponent.changeItemValue currentValue '" + value + "' -> '" + newValue + "'");
        if (this.formField.fieldMetadata.displayInfo.textProperties != null) {
            console.log("GpFormTextFieldComponent. textProperties: " + JSON.stringify(this.formField.fieldMetadata.displayInfo.textProperties));
            if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(table_service_1.TableService.TEXT_UPPERCASE) >= 0) {
                newValue = newValue == null ? null : newValue.toUpperCase();
                this.currentValueText = newValue;
                console.log("GpFormTextFieldComponent.convert to upper case '" + newValue + "'");
            }
            if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(table_service_1.TableService.TEXT_TRIM) >= 0) {
                newValue = newValue == null ? null : newValue.trim();
                this.currentValueText = newValue;
                console.log("GpFormTextFieldComponent.trim '" + newValue + "'");
            }
        }
        // console.log("GpFormFieldComponent.changeItemValue newValue '" + newValue + "'" );
        editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    };
    GpFormTextFieldComponent.prototype.copyValueFromEditedRowToControl = function (editedRow) {
        console.log("GpFormTextFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        this.currentValueText = value;
        // Si tiene traducción, recogemos todos los valores de los campos que actuan como identificadores
        // y los juntamos para crear el identificador de la tabla de traducciones
        if (this.formField.fieldMetadata.displayInfo.translationInfo != null && this.formField.fieldMetadata.displayInfo.translationInfo.keyFields != null) {
            this.translationKeys = '';
            for (var _i = 0, _a = this.formField.fieldMetadata.displayInfo.translationInfo.keyFields; _i < _a.length; _i++) {
                var keyField = _a[_i];
                this.translationKeys += editedRow[keyField];
            }
        }
        console.log(this.translationKeys);
    };
    GpFormTextFieldComponent.prototype.validateField = function (editedRow) {
        this.formField.validField = true;
        this.formField.fieldMsgs = null;
        var valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
        if ((typeof valorCampo == "string") && this.formField.fieldMetadata.displayInfo.displayType == table_service_1.TableService.TEXT_DISPLAY_TYPE) {
            valorCampo = valorCampo.trim();
        }
        console.log("GpFormTextFieldComponent.validateField, valorCampo = " + JSON.stringify(valorCampo));
        // Validacion del campo.
        // a) Null?
        if (this.formField.fieldMetadata.notNull && (valorCampo == "" || valorCampo == null)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor es obligatorio.');
            console.log("GpFormTextFieldComponent.validateField, no valid, null.");
            return false;
        }
        if (this.formField.fieldMetadata.restrictions) {
            for (var _i = 0, _a = this.formField.fieldMetadata.restrictions; _i < _a.length; _i++) {
                var restriction = _a[_i];
                if (restriction.restrictionType == table_service_1.TableService.RESTRICTION_MIN_LENGTH && typeof valorCampo == "string") {
                    if (valorCampo.length < restriction.minLength) {
                        this.formField.validField = false;
                        this.validateFieldAddMsgs('Valor demasiado corto (longitud mínima ' + restriction.minLength + ')');
                        console.log("GpFormTextFieldComponent.validateField, no valid, longitud massa curta.");
                    }
                }
                else if (restriction.restrictionType == table_service_1.TableService.RESTRICTION_MAX_LENGTH && typeof valorCampo == "string") {
                    if (valorCampo.length > restriction.maxLength) {
                        this.formField.validField = false;
                        this.validateFieldAddMsgs('Valor demasiado largo (longitud máxima ' + restriction.maxLength + ')');
                        console.log("GpFormTextFieldComponent.validateField, no valid, longitud massa llarga.");
                    }
                }
            }
        }
        if (!this.formField.fieldMetadata.allowAscii) {
            if (this.formField.fieldMetadata.displayInfo.textProperties != null) {
                if (table_service_1.TableService.TEXT_NO_SPACE in this.formField.fieldMetadata.displayInfo.textProperties) {
                    if (/\s/.test(valorCampo)) {
                        this.formField.validField = false;
                        this.validateFieldAddMsgs('El valor indicado no puede contener espacios. Han sido eliminados. Seleccione guardar otra vez para aceptar los cambios.');
                        valorCampo = valorCampo.replace(/\s/g, "");
                        this.currentValueText = valorCampo;
                    }
                }
            }
            // Por defecto, solo caracteres ASCII.
            if (/[\u0000-\u0019]/.test(valorCampo)) {
                this.formField.validField = false;
                this.validateFieldAddMsgs('El valor indicado contiene caracteres de control. Han sido sustituidos por espacios. Seleccione guardar otra vez para aceptar los cambios.');
                valorCampo = valorCampo.replace(/[\u0000-\u0019]/g, " ");
                this.currentValueText = valorCampo;
            }
            if (/[\u0080-\uFFFF]/.test(valorCampo)) {
                this.formField.validField = false;
                this.validateFieldAddMsgs('El valor indicado contiene caracteres no válidos (acentos, eñes, c cedillas, ...). Han sido sustituidos por caracteres equivalentes o descartados. Seleccione guardar otra vez para aceptar los cambios.');
                valorCampo = gpUtil_1.GPUtil.normaliza(valorCampo);
                this.currentValueText = valorCampo;
            }
        }
        return this.formField.validField;
    };
    GpFormTextFieldComponent.FORM_FIELD_TYPE_TEXT_FIELD = "gp-form-text-field";
    __decorate([
        core_1.Input()
    ], GpFormTextFieldComponent.prototype, "formField");
    GpFormTextFieldComponent = __decorate([
        core_1.Component({
            selector: 'gp-form-text-field',
            templateUrl: './gp-form-text-field.component.html'
        })
    ], GpFormTextFieldComponent);
    return GpFormTextFieldComponent;
}(gp_app_table_crud_shared_1.GpFormFieldControl));
exports.GpFormTextFieldComponent = GpFormTextFieldComponent;
//# sourceMappingURL=gp-form-text-field.component.js.map
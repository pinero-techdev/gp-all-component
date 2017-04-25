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
var GpFormWysiwygFieldComponent = (function (_super) {
    __extends(GpFormWysiwygFieldComponent, _super);
    function GpFormWysiwygFieldComponent() {
        _super.apply(this, arguments);
    }
    GpFormWysiwygFieldComponent.prototype.getFieldMetadata = function () {
        return this.formField.fieldMetadata;
    };
    GpFormWysiwygFieldComponent.prototype.ngOnInit = function () {
        this.inicializa();
    };
    GpFormWysiwygFieldComponent.prototype.getFormField = function () {
        return this.formField;
    };
    GpFormWysiwygFieldComponent.prototype.inicializa = function () {
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
    GpFormWysiwygFieldComponent.prototype.copyValueFromControlToEditedRow = function (editedRow) {
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
    GpFormWysiwygFieldComponent.prototype.copyValueFromEditedRowToControl = function (editedRow) {
        console.log("GpFormTextFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        this.currentValueText = value;
    };
    GpFormWysiwygFieldComponent.prototype.validateField = function (editedRow) {
        this.formField.validField = true;
        this.formField.fieldMsgs = null;
        var valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
        if ((typeof valorCampo == "string") && this.formField.fieldMetadata.displayInfo.displayType == table_service_1.TableService.TEXT_DISPLAY_TYPE) {
            valorCampo = valorCampo.trim();
        }
        console.log("GpFormWysiwyFieldComponent.validateField, valorCampo = " + JSON.stringify(valorCampo));
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
        return this.formField.validField;
    };
    GpFormWysiwygFieldComponent.FORM_FIELD_TYPE_WYSIWYG_FIELD = "gp-form-wysiwyg-field";
    __decorate([
        core_1.Input()
    ], GpFormWysiwygFieldComponent.prototype, "formField");
    GpFormWysiwygFieldComponent = __decorate([
        core_1.Component({
            selector: 'gp-form-wysiwyg-field',
            templateUrl: './gp-form-wysiwyg-field.component.html'
        })
    ], GpFormWysiwygFieldComponent);
    return GpFormWysiwygFieldComponent;
}(gp_app_table_crud_shared_1.GpFormFieldControl));
exports.GpFormWysiwygFieldComponent = GpFormWysiwygFieldComponent;
//# sourceMappingURL=gp-form-wysiwyg-field.component.js.map
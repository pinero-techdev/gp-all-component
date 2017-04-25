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
var gp_app_table_crud_shared_1 = require("./gp-app-table-crud-shared");
var GpFormImgFieldComponent = (function (_super) {
    __extends(GpFormImgFieldComponent, _super);
    function GpFormImgFieldComponent() {
        _super.apply(this, arguments);
    }
    GpFormImgFieldComponent.prototype.getFieldMetadata = function () {
        return this.formField.fieldMetadata;
    };
    GpFormImgFieldComponent.prototype.ngOnInit = function () {
        this.inicializa();
    };
    GpFormImgFieldComponent.prototype.getFormField = function () {
        return this.formField;
    };
    GpFormImgFieldComponent.prototype.inicializa = function () {
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
    GpFormImgFieldComponent.prototype.copyValueFromControlToEditedRow = function (editedRow) {
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        var newValue = this.currentValueText;
        console.log("GpFormImgFieldComponent.changeItemValue currentValue '" + value + "' -> '" + newValue + "'");
        if (this.formField.fieldMetadata.displayInfo.textProperties != null) {
            console.log("GpFormImgFieldComponent. textProperties: " + JSON.stringify(this.formField.fieldMetadata.displayInfo.textProperties));
            if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(table_service_1.TableService.TEXT_UPPERCASE) >= 0) {
                newValue = newValue == null ? null : newValue.toUpperCase();
                this.currentValueText = newValue;
                console.log("GpFormImgFieldComponent.convert to upper case '" + newValue + "'");
            }
            if (this.formField.fieldMetadata.displayInfo.textProperties.indexOf(table_service_1.TableService.TEXT_TRIM) >= 0) {
                newValue = newValue == null ? null : newValue.trim();
                this.currentValueText = newValue;
                console.log("GpFormImgFieldComponent.trim '" + newValue + "'");
            }
        }
        editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    };
    GpFormImgFieldComponent.prototype.copyValueFromEditedRowToControl = function (editedRow) {
        console.log("GpFormImgFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        this.currentValueText = value;
    };
    GpFormImgFieldComponent.prototype.validateField = function (editedRow) {
        this.formField.validField = true;
        this.formField.fieldMsgs = null;
        var valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
        if ((typeof valorCampo == "string") && this.formField.fieldMetadata.displayInfo.displayType == table_service_1.TableService.TEXT_DISPLAY_TYPE) {
            valorCampo = valorCampo.trim();
        }
        console.log("GpFormImgFieldComponent.validateField, valorCampo = " + JSON.stringify(valorCampo));
        // Validacion del campo.
        // a) Null?
        if (this.formField.fieldMetadata.notNull && (valorCampo == "" || valorCampo == null)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor es obligatorio.');
            console.log("GpFormImgFieldComponent.validateField, no valid, null.");
            return false;
        }
        if (this.formField.fieldMetadata.restrictions) {
            for (var _i = 0, _a = this.formField.fieldMetadata.restrictions; _i < _a.length; _i++) {
                var restriction = _a[_i];
                if (restriction.restrictionType == table_service_1.TableService.RESTRICTION_MIN_LENGTH && typeof valorCampo == "string") {
                    if (valorCampo.length < restriction.minLength) {
                        this.formField.validField = false;
                        this.validateFieldAddMsgs('Valor demasiado corto (longitud mínima ' + restriction.minLength + ')');
                        console.log("GpFormImgFieldComponent.validateField, no valid, longitud massa curta.");
                    }
                }
                else if (restriction.restrictionType == table_service_1.TableService.RESTRICTION_MAX_LENGTH && typeof valorCampo == "string") {
                    if (valorCampo.length > restriction.maxLength) {
                        this.formField.validField = false;
                        this.validateFieldAddMsgs('Valor demasiado largo (longitud máxima ' + restriction.maxLength + ')');
                        console.log("GpFormImgFieldComponent.validateField, no valid, longitud massa llarga.");
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
        return this.formField.validField;
    };
    GpFormImgFieldComponent.FORM_FIELD_TYPE_IMG_FIELD = "gp-form-img-field";
    __decorate([
        core_1.Input()
    ], GpFormImgFieldComponent.prototype, "formField");
    GpFormImgFieldComponent = __decorate([
        core_1.Component({
            selector: 'gp-form-img-field',
            templateUrl: './gp-form-img-field.component.html'
        })
    ], GpFormImgFieldComponent);
    return GpFormImgFieldComponent;
}(gp_app_table_crud_shared_1.GpFormFieldControl));
exports.GpFormImgFieldComponent = GpFormImgFieldComponent;
//# sourceMappingURL=gp-form-img-field.component.js.map
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
var GpFormTimeFieldComponent = (function (_super) {
    __extends(GpFormTimeFieldComponent, _super);
    function GpFormTimeFieldComponent() {
        _super.apply(this, arguments);
        this.timeFormat = 'hh:mm';
    }
    GpFormTimeFieldComponent.prototype.getFieldMetadata = function () {
        return this.formField.fieldMetadata;
    };
    GpFormTimeFieldComponent.prototype.ngOnInit = function () {
        this.inicializa();
    };
    GpFormTimeFieldComponent.prototype.getFormField = function () {
        return this.formField;
    };
    GpFormTimeFieldComponent.prototype.inicializa = function () {
    };
    GpFormTimeFieldComponent.prototype.copyValueFromControlToEditedRow = function (editedRow) {
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        console.log("GpFormTimeFieldComponent.copyValueFromControlToEditedRow currentValueDate " + JSON.stringify(this.currentValueDate));
        var newValue = gpUtil_1.GPUtil.dateTohhmm(this.currentValueDate, this.timeFormat); // GPUtil.dateToYyyymmdd( this.currentValueDate, this.dateFormat );
        console.log("GpFormCalendarFieldComponent.copyValueFromControlToEditedRow currentValue '" + value + "' -> '" + newValue + "'");
        // console.log("GpFormFieldComponent.changeItemValue newValue '" + newValue + "'" );
        editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    };
    GpFormTimeFieldComponent.prototype.copyValueFromEditedRowToControl = function (editedRow) {
        console.log("GpFormTextFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        this.currentValueDate = gpUtil_1.GPUtil.hhmmToDate(value, this.timeFormat);
    };
    GpFormTimeFieldComponent.prototype.validateField = function (editedRow) {
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
        // Tiene que cumplir con el formato hh:mm. Con formato 24h
        if (!/(([0-1][1-9])|(2[0-3])):[0-5][0-9]/.test(valorCampo)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor indicado no cumple con un formato válido: "hh:mm". Ejemplo  de hora válida: 01:45');
            this.formField.validField = false;
        }
        return this.formField.validField;
    };
    GpFormTimeFieldComponent.FORM_FIELD_TYPE_TIME_FIELD = "gp-form-time-field";
    __decorate([
        core_1.Input()
    ], GpFormTimeFieldComponent.prototype, "formField");
    GpFormTimeFieldComponent = __decorate([
        core_1.Component({
            selector: 'gp-form-time-field',
            templateUrl: './gp-form-time-field.component.html'
        })
    ], GpFormTimeFieldComponent);
    return GpFormTimeFieldComponent;
}(gp_app_table_crud_shared_1.GpFormFieldControl));
exports.GpFormTimeFieldComponent = GpFormTimeFieldComponent;
//# sourceMappingURL=gp-form-time-field.component.js.map
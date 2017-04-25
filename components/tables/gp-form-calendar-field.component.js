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
var gpUtil_1 = require("../../resources/data/gpUtil");
var gp_app_table_crud_shared_1 = require("./gp-app-table-crud-shared");
var GpFormCalendarFieldComponent = (function (_super) {
    __extends(GpFormCalendarFieldComponent, _super);
    function GpFormCalendarFieldComponent() {
        _super.apply(this, arguments);
        this.currentValueDate = null;
        this.dateFormat = "dd/mm/yy";
    }
    GpFormCalendarFieldComponent.prototype.getFieldMetadata = function () {
        return this.formField.fieldMetadata;
    };
    GpFormCalendarFieldComponent.prototype.ngOnInit = function () {
        this.inicializa();
        this.es = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
        };
    };
    GpFormCalendarFieldComponent.prototype.getFormField = function () {
        return this.formField;
    };
    GpFormCalendarFieldComponent.prototype.inicializa = function () {
    };
    GpFormCalendarFieldComponent.prototype.copyValueFromControlToEditedRow = function (editedRow) {
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        console.log("GpFormCalendarFieldComponent.copyValueFromControlToEditedRow currentValueDate " + JSON.stringify(this.currentValueDate));
        var newValue = gpUtil_1.GPUtil.dateToYyyymmdd(this.currentValueDate, this.dateFormat); // GPUtil.dateToYyyymmdd( this.currentValueDate, this.dateFormat );
        console.log("GpFormCalendarFieldComponent.copyValueFromControlToEditedRow currentValue '" + value + "' -> '" + newValue + "'");
        // console.log("GpFormFieldComponent.changeItemValue newValue '" + newValue + "'" );
        editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    };
    GpFormCalendarFieldComponent.prototype.copyValueFromEditedRowToControl = function (editedRow) {
        console.log("GpFormCalendarFieldComponent.copyValueFromEditedRowToControl: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        this.currentValueDate = gpUtil_1.GPUtil.yyyymmddToDate(value /*, this.dateFormat*/); // GPUtil.yyyymmddToDate( value );
        console.log("GpFormCalendarFieldComponent.copyValueFromEditedRowToControl currentValueDate " + JSON.stringify(this.currentValueDate));
    };
    GpFormCalendarFieldComponent.prototype.validateField = function (editedRow) {
        this.formField.validField = true;
        this.formField.fieldMsgs = null;
        var valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
        console.log("GpFormCalendarFieldComponent.validateField, valorCampo = " + JSON.stringify(valorCampo));
        // Validacion del campo.
        // a) Null?
        if (this.formField.fieldMetadata.notNull && (valorCampo == "" || valorCampo == null)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor es obligatorio.');
            console.log("GpFormCalendarFieldComponent.validateField, no valid, null.");
            return false;
        }
        if (this.formField.fieldMetadata.restrictions) {
        }
        return this.formField.validField;
    };
    GpFormCalendarFieldComponent.FORM_FIELD_TYPE_CALENDAR_FIELD = "gp-form-calendar-field";
    __decorate([
        core_1.Input()
    ], GpFormCalendarFieldComponent.prototype, "formField");
    GpFormCalendarFieldComponent = __decorate([
        core_1.Component({
            selector: 'gp-form-calendar-field',
            templateUrl: './gp-form-calendar-field.component.html'
        })
    ], GpFormCalendarFieldComponent);
    return GpFormCalendarFieldComponent;
}(gp_app_table_crud_shared_1.GpFormFieldControl));
exports.GpFormCalendarFieldComponent = GpFormCalendarFieldComponent;
//# sourceMappingURL=gp-form-calendar-field.component.js.map
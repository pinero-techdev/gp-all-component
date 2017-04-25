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
var gp_app_table_crud_shared_1 = require("./gp-app-table-crud-shared");
var GpFormSwitchFieldComponent = (function (_super) {
    __extends(GpFormSwitchFieldComponent, _super);
    function GpFormSwitchFieldComponent() {
        _super.apply(this, arguments);
    }
    GpFormSwitchFieldComponent.prototype.getFormField = function () {
        return this.formField;
    };
    GpFormSwitchFieldComponent.prototype.getFieldMetadata = function () {
        return this.formField.fieldMetadata;
    };
    GpFormSwitchFieldComponent.prototype.ngOnInit = function () {
        this.inicializa();
    };
    GpFormSwitchFieldComponent.prototype.inicializa = function () {
    };
    GpFormSwitchFieldComponent.prototype.copyValueFromControlToEditedRow = function (editedRow) {
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        var newValue = this.currentValueSwitch ? this.formField.fieldMetadata.displayInfo.checkedValue : this.formField.fieldMetadata.displayInfo.uncheckedValue;
        editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    };
    GpFormSwitchFieldComponent.prototype.copyValueFromEditedRowToControl = function (editedRow) {
        console.log("GpFormSwitchFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        var value = this.formField.fieldMetadata.displayInfo.checkedValue == editedRow[this.formField.fieldMetadata.fieldName];
        this.currentValueSwitch = value;
        console.log("        value switch: " + this.currentValueSwitch);
    };
    GpFormSwitchFieldComponent.prototype.validateField = function (editedRow) {
        // Un switch siempre es valido.
        this.formField.validField = true;
        this.formField.fieldMsgs = null;
        return this.formField.validField;
    };
    GpFormSwitchFieldComponent.FORM_FIELD_TYPE_SWITCH_FIELD = "gp-form-switch-field";
    __decorate([
        core_1.Input()
    ], GpFormSwitchFieldComponent.prototype, "formField");
    GpFormSwitchFieldComponent = __decorate([
        core_1.Component({
            selector: 'gp-form-switch-field',
            templateUrl: './gp-form-switch-field.component.html'
        })
    ], GpFormSwitchFieldComponent);
    return GpFormSwitchFieldComponent;
}(gp_app_table_crud_shared_1.GpFormFieldControl));
exports.GpFormSwitchFieldComponent = GpFormSwitchFieldComponent;
//# sourceMappingURL=gp-form-switch-field.component.js.map
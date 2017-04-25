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
var GpFormCheckboxFieldComponent = (function (_super) {
    __extends(GpFormCheckboxFieldComponent, _super);
    function GpFormCheckboxFieldComponent() {
        _super.apply(this, arguments);
    }
    GpFormCheckboxFieldComponent.prototype.getFormField = function () {
        return this.formField;
    };
    GpFormCheckboxFieldComponent.prototype.getFieldMetadata = function () {
        return this.formField.fieldMetadata;
    };
    GpFormCheckboxFieldComponent.prototype.ngOnInit = function () {
        this.inicializa();
    };
    GpFormCheckboxFieldComponent.prototype.inicializa = function () {
    };
    GpFormCheckboxFieldComponent.prototype.copyValueFromControlToEditedRow = function (editedRow) {
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        var newValue = this.currentValueCheckbox ? this.formField.fieldMetadata.displayInfo.checkedValue : this.formField.fieldMetadata.displayInfo.uncheckedValue;
        editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    };
    GpFormCheckboxFieldComponent.prototype.copyValueFromEditedRowToControl = function (editedRow) {
        console.log("GpFormCheckboxhFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        var value = this.formField.fieldMetadata.displayInfo.checkedValue == editedRow[this.formField.fieldMetadata.fieldName];
        this.currentValueCheckbox = value;
        console.log("        value checkbox: " + this.currentValueCheckbox);
    };
    GpFormCheckboxFieldComponent.prototype.validateField = function (editedRow) {
        // Un checkbox siempre es valido.
        this.formField.validField = true;
        this.formField.fieldMsgs = null;
        return this.formField.validField;
    };
    GpFormCheckboxFieldComponent.FORM_FIELD_TYPE_CHECKBOX_FIELD = "gp-form-checkbox-field";
    __decorate([
        core_1.Input()
    ], GpFormCheckboxFieldComponent.prototype, "formField");
    GpFormCheckboxFieldComponent = __decorate([
        core_1.Component({
            selector: 'gp-form-checkbox-field',
            templateUrl: './gp-form-checkbox-field.component.html'
        })
    ], GpFormCheckboxFieldComponent);
    return GpFormCheckboxFieldComponent;
}(gp_app_table_crud_shared_1.GpFormFieldControl));
exports.GpFormCheckboxFieldComponent = GpFormCheckboxFieldComponent;
//# sourceMappingURL=gp-form-checkbox-field.component.js.map
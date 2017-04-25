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
var async_1 = require("@angular/forms/src/facade/async");
var infoCampoModificado_1 = require("../../resources/data/infoCampoModificado");
var GpFormDropdownFieldComponent = (function (_super) {
    __extends(GpFormDropdownFieldComponent, _super);
    function GpFormDropdownFieldComponent(_tableService) {
        _super.call(this);
        this._tableService = _tableService;
        this.valueChanged = new async_1.EventEmitter();
    }
    Object.defineProperty(GpFormDropdownFieldComponent.prototype, "_currentValueDropDown", {
        get: function () {
            return this.currentValueDropDown;
        },
        set: function (value) {
            this.currentValueDropDown = value;
            var infoCampoModificado = new infoCampoModificado_1.InfoCampoModificado(this.formField.fieldMetadata.fieldName, this.currentValueDropDown);
            this.valueChanged.emit(infoCampoModificado);
        },
        enumerable: true,
        configurable: true
    });
    GpFormDropdownFieldComponent.prototype.getFormField = function () {
        return this.formField;
    };
    GpFormDropdownFieldComponent.prototype.getFieldMetadata = function () {
        return this.formField.fieldMetadata;
    };
    GpFormDropdownFieldComponent.prototype.ngOnInit = function () {
        this.inicializa();
    };
    GpFormDropdownFieldComponent.prototype.inicializa = function () {
        var _this = this;
        this.listAllowedValuesOptions = [];
        if (this.formField.fieldMetadata.displayInfo && this.formField.fieldMetadata.displayInfo.options != null && this.formField.fieldMetadata.displayInfo.options.length > 0) {
            this.listAllowedValuesOptions.push({ label: "Seleccione " + this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() + " ...", value: null });
            for (var _i = 0, _a = this.formField.fieldMetadata.displayInfo.options; _i < _a.length; _i++) {
                var i = _a[_i];
                this.listAllowedValuesOptions.push({ label: i.description, value: i.value });
            }
            console.log("GpFormDropdownFieldComponent.Allowed value: " + JSON.stringify(this.listAllowedValuesOptions));
        }
        else if (this.formField.fieldMetadata.displayInfo && this.formField.fieldMetadata.displayInfo.referencedTable != null && this.formField.fieldMetadata.displayInfo.referencedTable != "") {
            // Cargamos los datos de una tabla?
            console.log("GpFormDropdownFieldComponent.ngOnInit: loading from table " + this.formField.fieldMetadata.displayInfo.referencedTable);
            this.listAllowedValuesOptions = [{ label: "Cargando los datos del desplegable ...", value: null }];
            console.log(this.formField.fieldMetadata.displayInfo.referencedTable);
            this._tableService.list(this.formField.fieldMetadata.displayInfo.referencedTable, true).subscribe(function (data) {
                if (data.ok) {
                    // Recuperamos la lista.
                    // TODO Hacer que busque automaticamente el id cuando no venga referencedField.
                    _this.listAllowedValuesOptions = [{ label: "Seleccione " + _this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() + " ...", value: null }];
                    for (var _i = 0, _a = data.data; _i < _a.length; _i++) {
                        var row = _a[_i];
                        var optionLabel = "";
                        var separator = "";
                        for (var _b = 0, _c = _this.formField.fieldMetadata.displayInfo.fieldDescriptions; _b < _c.length; _b++) {
                            var fieldDesc = _c[_b];
                            optionLabel += separator + row[fieldDesc];
                            separator = " - ";
                        }
                        _this.listAllowedValuesOptions.push({ label: optionLabel, value: row[_this.formField.fieldMetadata.displayInfo.referencedField] });
                    }
                }
                else {
                    _this.listAllowedValuesOptions = [{ label: "Error recuperando datos.", value: null }];
                }
            }, function (err) {
                _this.listAllowedValuesOptions = [{ label: "Error recuperando datos.", value: null }];
            });
        }
    };
    GpFormDropdownFieldComponent.prototype.copyValueFromControlToEditedRow = function (editedRow) {
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        var newValue = this._currentValueDropDown;
        editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    };
    GpFormDropdownFieldComponent.prototype.copyValueFromEditedRowToControl = function (editedRow) {
        console.log("GpFormTextFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        this._currentValueDropDown = value;
        console.log("        value dropdown: " + this._currentValueDropDown);
    };
    GpFormDropdownFieldComponent.prototype.validateField = function (editedRow) {
        this.formField.validField = true;
        this.formField.fieldMsgs = null;
        var valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
        // Validacion del campo.
        // a) Null?
        if (this.formField.fieldMetadata.notNull && (valorCampo == "" || valorCampo == null)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor es obligatorio.');
            return false;
        }
        return this.formField.validField;
    };
    GpFormDropdownFieldComponent.prototype.onChange = function (event) {
        var infoCampoModificado = new infoCampoModificado_1.InfoCampoModificado(this.formField.fieldMetadata.fieldName, this._currentValueDropDown);
        this.valueChanged.emit(infoCampoModificado);
    };
    GpFormDropdownFieldComponent.FORM_FIELD_TYPE_DROPDOWN_FIELD = "gp-form-dropdown-field";
    __decorate([
        core_1.Input()
    ], GpFormDropdownFieldComponent.prototype, "formField");
    __decorate([
        core_1.Output()
    ], GpFormDropdownFieldComponent.prototype, "valueChanged");
    GpFormDropdownFieldComponent = __decorate([
        core_1.Component({
            selector: 'gp-form-dropdown-field',
            templateUrl: './gp-form-dropdown-field.component.html'
        })
    ], GpFormDropdownFieldComponent);
    return GpFormDropdownFieldComponent;
}(gp_app_table_crud_shared_1.GpFormFieldControl));
exports.GpFormDropdownFieldComponent = GpFormDropdownFieldComponent;
//# sourceMappingURL=gp-form-dropdown-field.component.js.map
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
var infoCampoModificado_1 = require("../../resources/data/infoCampoModificado");
var GpFormDropdownRelatedfieldComponent = (function (_super) {
    __extends(GpFormDropdownRelatedfieldComponent, _super);
    function GpFormDropdownRelatedfieldComponent(_tableService) {
        _super.call(this);
        this._tableService = _tableService;
        this._relatedField = new infoCampoModificado_1.InfoCampoModificado();
    }
    Object.defineProperty(GpFormDropdownRelatedfieldComponent.prototype, "relatedField", {
        set: function (info) {
            if (info != null && info.field == this.formField.fieldMetadata.displayInfo.relatedField) {
                this.currentValueDropDown = null;
                this._relatedField.value = info.value;
                if (info.value == null) {
                    this.listAllowedValuesOptions = [{ label: "Seleccione primero el campo del que depende ...", value: null }];
                }
                else {
                    this.reinicia(info.field, info.value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    GpFormDropdownRelatedfieldComponent.prototype.getFormField = function () {
        return this.formField;
    };
    GpFormDropdownRelatedfieldComponent.prototype.getFieldMetadata = function () {
        return this.formField.fieldMetadata;
    };
    GpFormDropdownRelatedfieldComponent.prototype.ngOnInit = function () {
        this.inicializa();
    };
    GpFormDropdownRelatedfieldComponent.prototype.inicializa = function () {
        var _this = this;
        this.listAllowedValuesOptions = [];
        this._relatedField.field = this.formField.fieldMetadata.displayInfo.relatedField;
        if (this.formField.fieldMetadata.displayInfo && this.formField.fieldMetadata.displayInfo.referencedTable != null && this.formField.fieldMetadata.displayInfo.referencedTable != "") {
            // Cargamos los datos de una tabla?
            console.log("GpFormDropdownFieldComponent.ngOnInit: loading from table " + this.formField.fieldMetadata.displayInfo.referencedTable);
            this.listAllowedValuesOptions = [{ label: "Cargando los datos del desplegable ...", value: null }];
            console.log(this.formField.fieldMetadata.displayInfo.referencedTable);
            this._tableService.list(this.formField.fieldMetadata.displayInfo.referencedTable, true).subscribe(function (data) {
                if (data.ok) {
                    _this.listAllowedValuesOptions = [{ label: "Seleccione primero el campo del que depende ...", value: null }];
                    _this.list = data.data;
                }
                else {
                    _this.list = null;
                }
            }, function (err) {
                _this.list = null;
            });
        }
        else {
            console.error("No se ha indicado tabla relacionada para obtener los valores del campo " + this.formField.fieldMetadata.fieldName);
        }
    };
    GpFormDropdownRelatedfieldComponent.prototype.reinicia = function (field, value) {
        // TODO Hacer que busque automaticamente el id cuando no venga referencedField.
        this.listAllowedValuesOptions = [{ label: "Seleccione " + this.formField.fieldMetadata.displayInfo.fieldLabel.toLowerCase() + " ...", value: null }];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var row = _a[_i];
            if (row[field] == value) {
                var optionLabel = "";
                var separator = "";
                for (var _b = 0, _c = this.formField.fieldMetadata.displayInfo.fieldDescriptions; _b < _c.length; _b++) {
                    var fieldDesc = _c[_b];
                    optionLabel += separator + row[fieldDesc];
                    separator = " - ";
                }
                this.listAllowedValuesOptions.push({ label: optionLabel, value: row[this.formField.fieldMetadata.displayInfo.relatedField] });
            }
        }
    };
    GpFormDropdownRelatedfieldComponent.prototype.copyValueFromControlToEditedRow = function (editedRow) {
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        var newValue = this.currentValueDropDown;
        editedRow[this.formField.fieldMetadata.fieldName] = newValue;
    };
    GpFormDropdownRelatedfieldComponent.prototype.copyValueFromEditedRowToControl = function (editedRow) {
        console.log("GpFormTextFieldComponent.changeSelectedRow: " + JSON.stringify(this.formField.fieldMetadata));
        console.log("        editedRow: " + JSON.stringify(editedRow));
        var value = editedRow[this.formField.fieldMetadata.fieldName];
        this.currentValueDropDown = value;
        console.log("        value dropdown: " + this.currentValueDropDown);
    };
    GpFormDropdownRelatedfieldComponent.prototype.validateField = function (editedRow) {
        this.formField.validField = true;
        this.formField.fieldMsgs = null;
        var valorCampo = editedRow[this.formField.fieldMetadata.fieldName];
        if (this.formField.fieldMetadata.notNull && (valorCampo == "" || valorCampo == null)) {
            this.formField.validField = false;
            this.validateFieldAddMsgs('El valor es obligatorio.');
            return false;
        }
        return this.formField.validField;
    };
    GpFormDropdownRelatedfieldComponent.FORM_FIELD_TYPE_DROPDOWN_RELATED_FIELD = "gp-form-dropdown-related-field";
    __decorate([
        core_1.Input()
    ], GpFormDropdownRelatedfieldComponent.prototype, "formField");
    __decorate([
        core_1.Input()
    ], GpFormDropdownRelatedfieldComponent.prototype, "relatedField");
    GpFormDropdownRelatedfieldComponent = __decorate([
        core_1.Component({
            selector: 'gp-form-dropdown-related-field',
            templateUrl: './gp-form-dropdown-related-field.component.html'
        })
    ], GpFormDropdownRelatedfieldComponent);
    return GpFormDropdownRelatedfieldComponent;
}(gp_app_table_crud_shared_1.GpFormFieldControl));
exports.GpFormDropdownRelatedfieldComponent = GpFormDropdownRelatedfieldComponent;
//# sourceMappingURL=gp-form-dropdown-related-field.component.js.map
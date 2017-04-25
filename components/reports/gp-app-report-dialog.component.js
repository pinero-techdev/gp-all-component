"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var directives_1 = require("@angular/core/src/metadata/directives");
var gp_app_table_crud_shared_1 = require("../tables/gp-app-table-crud-shared");
var gp_form_text_field_component_1 = require("../tables/gp-form-text-field.component");
var gp_form_img_field_component_1 = require("../tables/gp-form-img-field.component");
var gp_form_textarea_field_component_1 = require("../tables/gp-form-textarea-field.component");
var gp_form_time_field_component_1 = require("../tables/gp-form-time-field.component");
var gp_form_switch_field_component_1 = require("../tables/gp-form-switch-field.component");
var gp_form_dropdown_field_component_1 = require("../tables/gp-form-dropdown-field.component");
var gp_form_checkbox_field_component_1 = require("../tables/gp-form-checkbox-field.component");
var gp_form_calendar_field_component_1 = require("../tables/gp-form-calendar-field.component");
var gp_form_wysiwyg_field_component_1 = require("../tables/gp-form-wysiwyg-field.component");
var table_service_1 = require("../../services/table.service");
var gp_form_dropdown_related_field_component_1 = require("../tables/gp-form-dropdown-related-field.component");
var GpAppReportDialogComponent = (function () {
    function GpAppReportDialogComponent(_activatedRoute, _router, _reportService, _globalService) {
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this._reportService = _reportService;
        this._globalService = _globalService;
        this.fieldChanged = null;
        this.formControl = new gp_app_table_crud_shared_1.GpFormControl();
    }
    Object.defineProperty(GpAppReportDialogComponent.prototype, "reportName", {
        /**
         * Realizamos un setter, para cambiar los atributos de la clase con los metadatos del nuevo report
         * @param name
         */
        set: function (name) {
            this.cambiaReport(name);
            var response = this._reportService.getDialogElements(name);
            this.reportMetadatas = response.metadata;
            this.formControl.editedRow = response.data;
            this._reportTitle = response.title;
            this.createFormFields(this.reportMetadatas);
        },
        enumerable: true,
        configurable: true
    });
    GpAppReportDialogComponent.prototype.ngOnInit = function () {
        console.log(this._reportName);
        this.cambiaReport(this._reportName);
        var response = this._reportService.getDialogElements(this._reportName);
        this.reportMetadatas = response.metadata;
        this.formControl.editedRow = response.data;
        this._reportTitle = response.title;
        this.createFormFields(this.reportMetadatas);
    };
    GpAppReportDialogComponent.prototype.cambiaReport = function (reportName) {
        if (!this._globalService.logged) {
            this._router.navigate(['login']);
            return;
        }
        if (reportName == this._reportName) {
            return;
        }
        this._reportName = reportName;
    };
    GpAppReportDialogComponent.prototype.openReport = function () {
        var self = this;
        this.forEachFieldControl(function (col) {
            col.copyValueFromControlToEditedRow(self.formControl.editedRow);
        });
        if (this.validateEditRow()) {
            this.extraArgs = '';
            for (var _i = 0, _a = this.reportMetadatas; _i < _a.length; _i++) {
                var metadata = _a[_i];
                var fieldName = metadata.fieldName;
                var field = this.formControl.editedRow[fieldName];
                if (field != null) {
                    if (metadata.fieldType.toUpperCase() == 'DATE') {
                        // Si es una fecha, la obtenemos en formato yyyy-mm-dd, cuando tendría que ser dd/mm/yyyy
                        this.extraArgs += '&' + fieldName + '=' + field.substr(8, 2) + '/' + field.substr(5, 2) + '/' + field.substr(0, 4);
                    }
                    else {
                        this.extraArgs += '&' + fieldName + '=' + field;
                    }
                }
            }
            console.log(this.extraArgs);
            window.open(this._reportService.getReportCal(this._reportName, this.extraArgs));
        }
    };
    GpAppReportDialogComponent.prototype.goHome = function () {
        this._router.navigate(['home']);
    };
    GpAppReportDialogComponent.prototype.forEachFieldControl = function (f) {
        this.textFormFields.forEach(function (col) {
            f(col);
        });
        this.textAreaFormFields.forEach(function (col) {
            f(col);
        });
        this.timeFormFields.forEach(function (col) {
            f(col);
        });
        this.switchFormFields.forEach(function (col) {
            f(col);
        });
        this.dropdownFormFields.forEach(function (col) {
            f(col);
        });
        this.dropdownFormRelatedFields.forEach(function (col) {
            f(col);
        });
        this.checkboxFormFields.forEach(function (col) {
            f(col);
        });
        this.calendarFormFields.forEach(function (col) {
            f(col);
        });
        this.wysiwygFormFields.forEach(function (col) {
            f(col);
        });
        this.imgFormFields.forEach(function (col) {
            f(col);
        });
    };
    GpAppReportDialogComponent.prototype.createFormFields = function (reportMetadatas) {
        this.reportFields = [];
        for (var _i = 0, reportMetadatas_1 = reportMetadatas; _i < reportMetadatas_1.length; _i++) {
            var metadata = reportMetadatas_1[_i];
            var formField = new gp_app_table_crud_shared_1.GpFormField(this.formControl, metadata);
            this.calcFieldType(formField);
            this.reportFields.push(formField);
        }
    };
    /**
     * Metodo para obtener el tipo de componente a partir de sus metadatos
     * @param formField
     */
    GpAppReportDialogComponent.prototype.calcFieldType = function (formField) {
        // Calcula el tipo de componente a utilizar para el control.
        // Si no se encuentra una representación mejor, se usa string.
        var selectedDisplay = false;
        if (formField.fieldMetadata.displayInfo.displayType == table_service_1.TableService.TEXT_AREA_DISPLAY_TYPE) {
            formField.formFieldType = gp_form_textarea_field_component_1.GpFormTextAreaFieldComponent.FORM_FIELD_TYPE_TEXT_AREA_FIELD;
            selectedDisplay = true;
        }
        if (formField.fieldMetadata.displayInfo.displayType == table_service_1.TableService.DROPDOWN_DISPLAY_TYPE) {
            formField.formFieldType = gp_form_dropdown_field_component_1.GpFormDropdownFieldComponent.FORM_FIELD_TYPE_DROPDOWN_FIELD;
            selectedDisplay = true;
        }
        if (formField.fieldMetadata.displayInfo.displayType == table_service_1.TableService.DROPDOWN_RELATED_DISPLAY_TYPE) {
            formField.formFieldType = gp_form_dropdown_related_field_component_1.GpFormDropdownRelatedfieldComponent.FORM_FIELD_TYPE_DROPDOWN_RELATED_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == table_service_1.TableService.CHECKBOX_DISPLAY_TYPE) {
            formField.formFieldType = gp_form_checkbox_field_component_1.GpFormCheckboxFieldComponent.FORM_FIELD_TYPE_CHECKBOX_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == table_service_1.TableService.SWITCH_DISPLAY_TYPE) {
            formField.formFieldType = gp_form_switch_field_component_1.GpFormSwitchFieldComponent.FORM_FIELD_TYPE_SWITCH_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == table_service_1.TableService.HOUR_MINUTE_DISPLAY_TYPE) {
            formField.formFieldType = gp_form_time_field_component_1.GpFormTimeFieldComponent.FORM_FIELD_TYPE_TIME_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.fieldType == "DATE") {
            formField.formFieldType = gp_form_calendar_field_component_1.GpFormCalendarFieldComponent.FORM_FIELD_TYPE_CALENDAR_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == table_service_1.TableService.WYSIWYG_DISPLAY_TYPE) {
            formField.formFieldType = gp_form_wysiwyg_field_component_1.GpFormWysiwygFieldComponent.FORM_FIELD_TYPE_WYSIWYG_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.fieldType == "BOOLEAN") {
            if (formField.fieldMetadata.notNull) {
                formField.formFieldType = gp_form_switch_field_component_1.GpFormSwitchFieldComponent.FORM_FIELD_TYPE_SWITCH_FIELD;
                selectedDisplay = true;
            }
            else {
                // Si puede ser null, usamos un combo con Si/No y vacio.
                formField.formFieldType = gp_form_dropdown_field_component_1.GpFormDropdownFieldComponent.FORM_FIELD_TYPE_DROPDOWN_FIELD;
                selectedDisplay = true;
            }
        }
        if (formField.fieldMetadata.displayInfo.displayType == table_service_1.TableService.IMG_DISPLAY_TYPE) {
            formField.formFieldType = gp_form_img_field_component_1.GpFormImgFieldComponent.FORM_FIELD_TYPE_IMG_FIELD;
            selectedDisplay = true;
        }
        // Si no se encuentra una representación mejor, se usa string.
        if (!selectedDisplay) {
            formField.formFieldType = gp_form_text_field_component_1.GpFormTextFieldComponent.FORM_FIELD_TYPE_TEXT_FIELD;
        }
    };
    GpAppReportDialogComponent.prototype.validateEditRow = function () {
        var valid = true;
        var self = this;
        this.forEachFieldControl(function (col) {
            // El orden del and hace que siempre se ejecute el validateField. Si se pone
            // al reves, cuando valid pase a ser falso no se volvera a llamar a
            // col.validateField por la evaluacion en cortocircuito.
            valid = col.validateField(self.formControl.editedRow) && valid;
        });
        return valid;
    };
    GpAppReportDialogComponent.prototype.changeEvent = function (info) {
        this.fieldChanged = info;
    };
    __decorate([
        core_1.Input()
    ], GpAppReportDialogComponent.prototype, "reportName");
    __decorate([
        core_1.ViewChildren(gp_form_text_field_component_1.GpFormTextFieldComponent)
    ], GpAppReportDialogComponent.prototype, "textFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_img_field_component_1.GpFormImgFieldComponent)
    ], GpAppReportDialogComponent.prototype, "imgFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_textarea_field_component_1.GpFormTextAreaFieldComponent)
    ], GpAppReportDialogComponent.prototype, "textAreaFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_time_field_component_1.GpFormTimeFieldComponent)
    ], GpAppReportDialogComponent.prototype, "timeFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_switch_field_component_1.GpFormSwitchFieldComponent)
    ], GpAppReportDialogComponent.prototype, "switchFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_dropdown_field_component_1.GpFormDropdownFieldComponent)
    ], GpAppReportDialogComponent.prototype, "dropdownFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_dropdown_related_field_component_1.GpFormDropdownRelatedfieldComponent)
    ], GpAppReportDialogComponent.prototype, "dropdownFormRelatedFields");
    __decorate([
        core_1.ViewChildren(gp_form_checkbox_field_component_1.GpFormCheckboxFieldComponent)
    ], GpAppReportDialogComponent.prototype, "checkboxFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_calendar_field_component_1.GpFormCalendarFieldComponent)
    ], GpAppReportDialogComponent.prototype, "calendarFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_wysiwyg_field_component_1.GpFormWysiwygFieldComponent)
    ], GpAppReportDialogComponent.prototype, "wysiwygFormFields");
    GpAppReportDialogComponent = __decorate([
        directives_1.Component({
            selector: 'gp-app-report-dialog',
            templateUrl: './gp-app-report-dialog.component.html',
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], GpAppReportDialogComponent);
    return GpAppReportDialogComponent;
}());
exports.GpAppReportDialogComponent = GpAppReportDialogComponent;
//# sourceMappingURL=gp-app-report-dialog.component.js.map
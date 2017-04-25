"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var table_service_1 = require("../../services/table.service");
var gp_form_dropdown_field_component_1 = require("./gp-form-dropdown-field.component");
var gp_form_text_field_component_1 = require("./gp-form-text-field.component");
var gp_form_switch_field_component_1 = require("./gp-form-switch-field.component");
var gp_app_table_crud_shared_1 = require("./gp-app-table-crud-shared");
var gp_form_checkbox_field_component_1 = require("./gp-form-checkbox-field.component");
var gp_form_wysiwyg_field_component_1 = require("./gp-form-wysiwyg-field.component");
var gp_form_calendar_field_component_1 = require("./gp-form-calendar-field.component");
var gp_form_textarea_field_component_1 = require("./gp-form-textarea-field.component");
var gp_form_time_field_component_1 = require("./gp-form-time-field.component");
var gp_form_img_field_component_1 = require("./gp-form-img-field.component");
var gp_form_dropdown_related_field_component_1 = require("./gp-form-dropdown-related-field.component");
var GpAppTableCrudComponent = (function () {
    function GpAppTableCrudComponent(activatedRoute, router, tableService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.tableService = tableService;
        // Indicador de trabajando.
        this.working = true;
        // Columnas de la tabla.
        this.columnas = [];
        this.columnasTabla = [];
        // Elementos de la tabla.
        this.elementos = [];
        this.columnasTablaDetail = [];
        this.elementosDetail = [];
        // Indica si se muestra el control de edicion.
        this.displayEdicion = false;
        // Indica si se han producido errores en el dialog. Si es así, se recarga la tabla.
        this.dialogErrors = false;
        // Puede el usuario borrar registros?
        this.canDelete = false;
        // Puede el usuario editar registros=
        this.canEdit = false;
        // Mensajes de edicion.
        this.msgsDialog = [];
        // Mensaje global.
        this.msgsGlobal = [];
        // Form control
        this.formControl = new gp_app_table_crud_shared_1.GpFormControl();
        // Campo que ha sido modificado por el usuario
        this.fieldChanged = null;
        // TODO Controlar.
        this.canEdit = true;
        this.canDelete = true;
        this.msgsGlobal = [];
        this.closeDialog();
    }
    GpAppTableCrudComponent.prototype.ngOnInit = function () {
    };
    // Se llama cuando se selecciona una nueva tabla.
    GpAppTableCrudComponent.prototype.cambiaTabla = function (tableName) {
        var _this = this;
        //	TODO Chequear que no estemos en medio de una edicion.
        if (tableName == this.tableName) {
            this.working = false;
            return;
        }
        this.working = true;
        this.columnas = [];
        this.columnasTabla = [];
        this.tableName = tableName;
        this.elementos = [];
        this.selectedRow = null;
        this.elementosDetail = [];
        this.selectedDetailRow = null;
        this.formControl.originalRow = null;
        this.msgsDialog = [];
        this.msgsGlobal = [{ severity: 'info', detail: 'Cargando los datos de la tabla.' }];
        this.dialogErrors = false;
        var listRs = this.tableService.list(this.tableName, true).subscribe(function (data) {
            // console.log('getMetadata response:' + JSON.stringify( data ) );
            if (data.ok) {
                _this.actualizaDefinicion(data.metadata);
                _this.elementos = data.data;
            }
            else {
                if (data.error != null && data.error.errorMessage != null) {
                    if (data.error.errorMessage == "No se ha establecido sesion o se ha perdido.") {
                        _this.router.navigate(['login']);
                    }
                    _this.showError(data.error.errorMessage.toString());
                }
                else {
                    _this.showError('');
                }
            }
        }, function (err) {
            console.error(err);
            _this.showError('');
        }, function () {
            console.log('getMetadata finalizado');
            _this.working = false;
        });
    };
    GpAppTableCrudComponent.prototype.actualizaDefinicion = function (tableMetadata) {
        var tempColumnas = [];
        var tempColumnasTabla = [];
        var tempMastersDetails = [];
        // console.log('Table label: ' + tableMetadata.tableLabel );
        this.tableLabel = tableMetadata.tableLabel;
        for (var _i = 0, _a = tableMetadata.fields; _i < _a.length; _i++) {
            var metadata = _a[_i];
            var formField = new gp_app_table_crud_shared_1.GpFormField(this.formControl, metadata);
            tempColumnas.push(formField);
            if (metadata.displayInfo.displayType == "MASTER_DETAIL") {
                tempMastersDetails.push(formField);
            }
            else {
                if (formField.fieldMetadata.lengthInTable != 0) {
                    tempColumnasTabla.push(formField);
                }
            }
        }
        for (var _b = 0, tempColumnas_1 = tempColumnas; _b < tempColumnas_1.length; _b++) {
            var col = tempColumnas_1[_b];
            this.calcFieldType(col);
        }
        this.columnas = tempColumnas;
        this.columnasTabla = tempColumnasTabla;
        this.columnasTablaDetail = tempMastersDetails;
    };
    GpAppTableCrudComponent.prototype.calcFieldType = function (formField) {
        // TODO Calcula el tipo de componente a utilizar para el control.
        //console.log( "GpAppTableCrudComponent.calcFieldType( " + JSON.stringify( formField.fieldMetadata ) + ")" );
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
        //console.log( "GpAppTableCrudComponent.calcFieldType, result -> " + JSON.stringify( formField ) );
    };
    GpAppTableCrudComponent.prototype.showError = function (message) {
        message = message || "Se ha producido un error realizando la operación solicitada.";
        this.msgsGlobal = [{ severity: 'error', summary: 'Atención', detail: message }];
    };
    GpAppTableCrudComponent.prototype.onRowSelect = function (event) {
        var _this = this;
        console.log("RowSelect: " + JSON.stringify(event));
        this.tableService.selectOneRow(this.tableName, JSON.stringify(this.selectedRow)).subscribe(function (data) {
            if (!data.ok) {
                _this.showErrorDialogo("Error recuperando el registro.");
                console.log("onRowSelect. Error recuperando: " + JSON.stringify(data));
            }
            else {
                _this.formControl.editedRow = JSON.parse(JSON.stringify(data.data));
                _this.formControl.originalRow = JSON.parse(JSON.stringify(data.data));
                console.log("Edited row: " + JSON.stringify(_this.formControl.editedRow));
                var self_1 = _this;
                _this.forEachFieldControl(function (col) {
                    console.log("onRowSelect, cvfertc: " + JSON.stringify(col.getFormField()));
                    col.copyValueFromEditedRowToControl(self_1.formControl.editedRow);
                    col.clearValidations();
                });
                _this.formControl.edicionEdit = true;
                _this.displayEdicion = true;
            }
        }, function (err) {
            _this.showErrorDialogo("Error interno recuperando el registro.");
            console.log("onRowSelect. Error seleccionando: " + JSON.stringify(err));
        }, function () {
            _this.formControl.lockFields = false;
            console.log("onRowSelect. end select.");
        });
    };
    GpAppTableCrudComponent.prototype.onRowUnselect = function () {
        console.log("RowUnselect: " + JSON.stringify(event));
        this.closeDialog();
    };
    GpAppTableCrudComponent.prototype.onDialogClose = function () {
        this.closeDialog();
    };
    GpAppTableCrudComponent.prototype.onDialogDelete = function () {
        var _this = this;
        this.formControl.lockFields = true;
        console.log("onDialogDelete.");
        console.log("onDialogDelete. original: " + JSON.stringify(this.formControl.originalRow));
        var jsonDeleteRow = JSON.stringify(this.formControl.originalRow);
        console.log("onDialogDelete. original: " + jsonDeleteRow);
        this.tableService.deleteRow(this.tableName, jsonDeleteRow).subscribe(function (data) {
            if (data.ok) {
                // Borramos el registro.
                var i = _this.elementos.indexOf(_this.selectedRow);
                if (i >= 0) {
                    console.log("onDialogDelete. before: " + JSON.stringify(_this.elementos));
                    _this.elementos.splice(i, 1);
                    console.log("onDialogDelete. after: " + JSON.stringify(_this.elementos));
                }
                // Y cerramos el dialog.
                _this.closeDialog();
            }
            else {
                _this.showErrorDialogo("Error borrando el registro: " + data.error.errorMessage);
            }
        }, function (err) {
            _this.showErrorDialogo("Error interno borrando el registro.");
            console.log("onDialogDelete. Error borrando: " + JSON.stringify(err));
        }, function () {
            _this.formControl.lockFields = false;
            console.log("onDialogDelete. end delete.");
        });
    };
    GpAppTableCrudComponent.prototype.validateEditRow = function () {
        var valid = true;
        var self = this;
        var inAddOperation = this.formControl.edicionAdd;
        this.forEachFieldControl(function (col) {
            // El orden del and hace que siempre se ejecute el validateField. Si se pone
            // al reves, cuando valid pase a ser falso no se volvera a llamar a
            // col.validateField por la evaluacion en cortocircuito.
            if (!inAddOperation || !col.getFormField().fieldMetadata.hideInAddOperation) {
                valid = col.validateField(self.formControl.editedRow) && valid;
            }
        });
        return valid;
    };
    GpAppTableCrudComponent.prototype.onDialogSave = function () {
        var _this = this;
        this.formControl.lockFields = true;
        //console.log("onDialogSave.");
        var self = this;
        this.forEachFieldControl(function (col) {
            col.copyValueFromControlToEditedRow(self.formControl.editedRow);
        });
        if (!this.validateEditRow()) {
            this.formControl.lockFields = false;
            return;
        }
        var jsonModifiedRow = JSON.stringify(this.formControl.editedRow);
        console.log("onDialogSave. modified: " + jsonModifiedRow);
        if (this.selectedRow != null) {
            var jsonOriginalRow = JSON.stringify(this.formControl.originalRow);
            console.log("onDialogSave. original: " + jsonOriginalRow);
            this.tableService.updateRow(this.tableName, jsonOriginalRow, jsonModifiedRow).subscribe(function (data) {
                if (data.ok) {
                    // Actualizamos el registro.
                    _this.forEachField(function (col) {
                        self.selectedRow[col.fieldMetadata.fieldName] = self.formControl.editedRow[col.fieldMetadata.fieldName];
                    });
                    // Y cerramos el dialog.
                    _this.closeDialog();
                }
                else {
                    _this.showErrorDialogo("Error actualizando el registro: " + data.error.errorMessage);
                }
            }, function (err) {
                _this.showErrorDialogo("Error interno actualizando el registro.");
                console.log("onDialogSave. Error actualizando: " + JSON.stringify(err));
            }, function () {
                _this.formControl.lockFields = false;
                console.log("onDialogSave. end update.");
            });
        }
        else {
            this.tableService.insertRow(this.tableName, jsonModifiedRow).subscribe(function (data) {
                if (data.ok) {
                    // Insertamos el registro.
                    _this.elementos.push(data.insertedRow);
                    // Y cerramos el dialog.
                    _this.closeDialog();
                }
                else {
                    _this.showErrorDialogo("Error insertando el registro: " + data.error.errorMessage);
                }
            }, function (err) {
                _this.showErrorDialogo("Error interno insertando el registro.");
                console.log("onDialogSave. Error insertando: " + JSON.stringify(err));
            }, function () {
                _this.formControl.lockFields = false;
                console.log("onDialogSave. end insert.");
            });
        }
    };
    GpAppTableCrudComponent.prototype.closeDialog = function () {
        this.displayEdicion = false;
        this.formControl.lockFields = false;
        this.selectedRow = null;
        this.formControl.originalRow = null;
        this.formControl.edicionAdd = false;
        this.formControl.edicionEdit = false;
        this.msgsDialog = [];
        if (this.dialogErrors) {
            this.cambiaTabla(this.tableName);
        }
    };
    GpAppTableCrudComponent.prototype.onDialogChangeField = function (change) {
        console.log("onDialogChangeField: " + JSON.stringify(change.name));
        change.formField.copyValueFromControlToEditedRow(this.formControl.editedRow);
    };
    GpAppTableCrudComponent.prototype.onDialogAdd = function () {
        console.log("onDialogAdd");
        this.selectedRow = null;
        this.formControl.originalRow = null;
        this.formControl.editedRow = {};
        var self = this;
        this.forEachFieldControl(function (col) {
            self.formControl.editedRow[col.getFormField().fieldMetadata.fieldName] = null;
            col.copyValueFromEditedRowToControl(self.formControl.editedRow);
            col.clearValidations();
        });
        this.formControl.edicionEdit = false;
        this.formControl.edicionAdd = true;
        this.displayEdicion = true;
    };
    GpAppTableCrudComponent.prototype.showErrorDialogo = function (msg) {
        console.log("showErrorDialog " + msg);
        this.dialogErrors = true;
        this.msgsDialog.push({ severity: 'error', summary: 'Error', detail: msg });
    };
    GpAppTableCrudComponent.prototype.forEachField = function (f) {
        var self = this;
        this.columnas.forEach(function (col) {
            f(col);
        });
    };
    GpAppTableCrudComponent.prototype.forEachFieldControl = function (f) {
        var self = this;
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
    GpAppTableCrudComponent.prototype.changeEvent = function (info) {
        this.fieldChanged = info;
    };
    __decorate([
        core_1.Input()
    ], GpAppTableCrudComponent.prototype, "tableName");
    __decorate([
        core_1.ViewChildren(gp_form_text_field_component_1.GpFormTextFieldComponent)
    ], GpAppTableCrudComponent.prototype, "textFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_img_field_component_1.GpFormImgFieldComponent)
    ], GpAppTableCrudComponent.prototype, "imgFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_textarea_field_component_1.GpFormTextAreaFieldComponent)
    ], GpAppTableCrudComponent.prototype, "textAreaFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_time_field_component_1.GpFormTimeFieldComponent)
    ], GpAppTableCrudComponent.prototype, "timeFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_switch_field_component_1.GpFormSwitchFieldComponent)
    ], GpAppTableCrudComponent.prototype, "switchFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_dropdown_field_component_1.GpFormDropdownFieldComponent)
    ], GpAppTableCrudComponent.prototype, "dropdownFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_checkbox_field_component_1.GpFormCheckboxFieldComponent)
    ], GpAppTableCrudComponent.prototype, "checkboxFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_calendar_field_component_1.GpFormCalendarFieldComponent)
    ], GpAppTableCrudComponent.prototype, "calendarFormFields");
    __decorate([
        core_1.ViewChildren(gp_form_wysiwyg_field_component_1.GpFormWysiwygFieldComponent)
    ], GpAppTableCrudComponent.prototype, "wysiwygFormFields");
    GpAppTableCrudComponent = __decorate([
        core_1.Component({
            selector: 'gp-app-table-crud',
            templateUrl: './gp-app-table-crud.component.html',
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], GpAppTableCrudComponent);
    return GpAppTableCrudComponent;
}());
exports.GpAppTableCrudComponent = GpAppTableCrudComponent;
//# sourceMappingURL=gp-app-table-crud.component.js.map
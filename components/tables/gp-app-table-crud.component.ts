import {
    Component,
    Input,
    OnInit,
    ViewChildren,
    QueryList,
    ViewEncapsulation,
    Output,
    EventEmitter
} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Message} from "primeng/primeng";
import {TableService, TableMetadata, Filter, FilterOperationType} from "../../services/table.service";
import {GpFormDropdownFieldComponent} from "./gp-form-dropdown-field.component";
import {GpFormTextFieldComponent} from "./gp-form-text-field.component";
import {GpFormSwitchFieldComponent} from "./gp-form-switch-field.component";
import {GpFormControl, GpFormField, GpFormFieldControl} from "./gp-app-table-crud-shared";
import {GpFormCheckboxFieldComponent} from "./gp-form-checkbox-field.component";
import {GpFormWysiwygFieldComponent} from "./gp-form-wysiwyg-field.component";
import {GpFormCalendarFieldComponent} from "./gp-form-calendar-field.component";
import {GpFormTextAreaFieldComponent} from "./gp-form-textarea-field.component";
import {GpFormTimeFieldComponent} from "./gp-form-time-field.component";
import {GpFormImgFieldComponent} from "./gp-form-img-field.component";
import {GpFormDropdownRelatedfieldComponent} from "./gp-form-dropdown-related-field.component";
import {InfoCampoModificado} from "../../resources/data/infoCampoModificado";
import {GPUtil} from "../../resources/data/gpUtil";


@Component({
    selector: 'gp-app-table-crud',
    templateUrl: './gp-app-table-crud.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [GPUtil]
})
export class GpAppTableCrudComponent implements OnInit {

    // Nombre de la tabla a editar.
    @Input() tableName:string;
    // Nombre de la tabla de detalle
    @Input() tableNameDetail:string;
    // Identificador de la tabla detalle que tiene en común con la tabla principal
    @Input() filterField:string;

    @Output() rowSelected = new EventEmitter<any>();

    @Output() closedDialog = new EventEmitter<boolean>();

    @Output() changes = new EventEmitter<boolean>();

    // filtros a partir de la tabla principal
    @Input() rowSelectedFilters:Filter[];

    // Identificador de la tabla detalle que tiene en común con la tabla principal
    @Input() parentId:string;


    // Indicador de trabajando.
    working:boolean = true;

    // Descripcion de la tabla a editar.
    tableLabel:string;

    // Descripcion de la tabla detalle a editar.

    tableLabelDetail:string;

    // Columnas de la tabla.
    columnas:GpFormField[] = [];
    columnasTabla:GpFormField[] = [];

    // Elementos de la tabla.
    elementos:any[] = [];

    // Fila seleccionada.
    selectedRow:any;

    columnasDetail:GpFormField[] = [];
    columnasTablaDetail:GpFormField[] = [];
    elementosDetail:any[] = [];
    selectedRowDetail:any;
    filter:Filter;
    filters:Filter[] = [];
    codes:string[] = [];

    //Id de la tabla
    tableId:string = null;

    // Indica si se muestra el control de edicion.
    displayEdicion = false;

    // Indica si se han producido errores en el dialog. Si es así, se recarga la tabla.
    dialogErrors = false;

    // Puede el usuario borrar registros?
    canDelete:boolean = false;

    // Puede el usuario editar registros?
    canEdit:boolean = false;

    // Puede el usuario editar registros?
    canAdd:boolean = false;

    addSelectedCodes:any= [];

    // Mensajes de edicion.
    msgsDialog:Message[] = [];

    // Mensaje global.
    msgsGlobal:Message[] = [];

    // Form control
    formControl:GpFormControl = new GpFormControl();
    formControlDetail:GpFormControl = new GpFormControl();

    // Campo que ha sido modificado por el usuario
    fieldChanged:InfoCampoModificado = null;

    @ViewChildren(GpFormTextFieldComponent) textFormFields:QueryList<GpFormTextFieldComponent>;
    @ViewChildren(GpFormImgFieldComponent) imgFormFields:QueryList<GpFormImgFieldComponent>;
    @ViewChildren(GpFormTextAreaFieldComponent) textAreaFormFields:QueryList<GpFormTextAreaFieldComponent>;
    @ViewChildren(GpFormTimeFieldComponent) timeFormFields:QueryList<GpFormTimeFieldComponent>;
    @ViewChildren(GpFormSwitchFieldComponent) switchFormFields:QueryList<GpFormSwitchFieldComponent>;
    @ViewChildren(GpFormDropdownFieldComponent) dropdownFormFields:QueryList<GpFormDropdownFieldComponent>;
    @ViewChildren(GpFormCheckboxFieldComponent) checkboxFormFields:QueryList<GpFormCheckboxFieldComponent>;
    @ViewChildren(GpFormCalendarFieldComponent) calendarFormFields:QueryList<GpFormCalendarFieldComponent>;
    @ViewChildren(GpFormWysiwygFieldComponent) wysiwygFormFields:QueryList<GpFormWysiwygFieldComponent>;

    constructor(private activatedRoute:ActivatedRoute, private router:Router, private tableService:TableService, private _gpUtil:GPUtil) {
        this.canEdit = true;
        this.canDelete = true;
        this.canAdd= true;
        this.msgsGlobal = [];
        this.closeDialog();
    }

    ngOnInit() {
    }

    initDetailTable(tableNameDetail:string, filterField:string) {
        this.tableNameDetail = tableNameDetail;
        this.filterField = filterField;
    }

    cambiaTablaDetail(filterCode:string, filterColumn:string) {
        if (this.tableNameDetail != undefined) {
            this.working = true;
            this.columnasDetail = [];
            this.columnasTablaDetail = [];
            this.elementosDetail = [];
            this.selectedRowDetail = null;
            this.formControlDetail.originalRow = null;

            this.codes = [];
            this.filters = [];
            this.codes.push(filterCode);
            this.filter = new Filter(FilterOperationType.EQUAL, filterColumn, this.codes);
            this.filters.push(this.filter);
            this.msgsDialog = [];
            this.msgsGlobal = [{severity: 'info', detail: 'Cargando los datos de la tabla detalle.'}];
            this.dialogErrors = false;


            this.tableService.list(this.tableNameDetail, true, false, null, this.filters).subscribe(
                data => {
                    //console.log('getMetadata response:' + JSON.stringify( data ) );
                    if (data.ok) {
                        this.actualizaDefinicionDetail(data.metadata);
                        this.elementosDetail = data.data;
                    } else {
                        if (data.error != null && data.error.errorMessage != null) {
                            if (data.error.errorMessage == "No se ha establecido sesion o se ha perdido.") {
                                this.router.navigate(['login']);
                            }
                            this.showError(data.error.errorMessage.toString());
                        } else {
                            this.showError(data.error.internalErrorMessage);
                        }
                    }
                },
                err => {
                    console.error(err);
                    this.showError('');
                },
                () => {
                    console.log('getMetadataDetail finalizado');
                    this.working = false;
                }
            );
            this.working = false;
        }
    }

    inicializaTabla(tableName:string) {
        this.tableName = tableName;
    }

    // Se llama cuando se selecciona una nueva tabla.
    cambiaTabla(tableName:string) {
        //	TODO Chequear que no estemos en medio de una edicion.
      if (this.tableName != null && tableName == this.tableName && this.rowSelectedFilters == null) {
        this.working = false;
        return;
      }

        this.working = true;
        this.columnas = [];
        this.columnasTabla = [];
        this.tableName = tableName;
        this.elementos = [];
        this.selectedRow = null;
        this.formControl.originalRow = null;
        this.msgsDialog = [];
        this.msgsGlobal = [{severity: 'info', detail: 'Cargando los datos de la tabla.'}];
        this.dialogErrors = false;

      if (this.rowSelectedFilters!=null) {
        this.filters = [];
        this.filters=this.rowSelectedFilters;

        this.tableService.list(this.tableName, true, false, null, this.filters).subscribe(
            data => {
              console.log('getMetadata response:' + JSON.stringify(data));
              if (data.ok) {
                this.actualizaDefinicion(data.metadata);
                this.elementos = data.data;
              } else {
                if (data.error != null && data.error.errorMessage != null) {
                  if (data.error.errorMessage == "No se ha establecido sesion o se ha perdido.") {
                    this.router.navigate(['login']);
                  }
                  this.showError(data.error.errorMessage.toString());
                } else {
                  this.showError('');
                }
              }
            },
            err => {
              console.error(err);
              this.showError('');
            },
            () => {
              console.log('getMetadata finalizado');
              this.working = false;
            }
        );
      } else {
        this.tableService.list(this.tableName, true).subscribe(
            data => {
              console.log('getMetadata response:' + JSON.stringify(data));
              if (data.ok) {
                this.actualizaDefinicion(data.metadata);
                this.elementos = data.data;
              } else {
                if (data.error != null && data.error.errorMessage != null) {
                  if (data.error.errorMessage == "No se ha establecido sesion o se ha perdido.") {
                    this.router.navigate(['login']);
                  }
                  this.showError(data.error.errorMessage.toString());
                } else {
                  this.showError('');
                }
              }
            },
            err => {
              console.error(err);
              this.showError('');
            },
            () => {
              console.log('getMetadata finalizado');
              this.working = false;
            }
        );
      }
    }

    actualizaDefinicionDetail(tableMetadata:TableMetadata) {
        let tempColumnasDetail:GpFormField[] = [];
        let tempMastersDetails:GpFormField[] = [];

        this.tableLabelDetail = tableMetadata.tableLabel;
        for (let metadata of tableMetadata.fields) {
            let formField = new GpFormField(this.formControlDetail, metadata);
            tempColumnasDetail.push(formField);
            tempMastersDetails.push(formField);
        }
        for (var col of tempColumnasDetail) {
            this.calcFieldType(col);
        }
        this.columnasDetail = tempColumnasDetail;
        this.columnasTablaDetail = tempMastersDetails;
    }

    actualizaDefinicion(tableMetadata:TableMetadata) {
        let tempColumnas:GpFormField[] = [];
        let tempColumnasTabla:GpFormField[] = [];
        let tempMastersDetails:GpFormField[] = [];

        this.tableLabel = tableMetadata.tableLabel;
        for (let metadata of tableMetadata.fields) {
            let formField = new GpFormField(this.formControl, metadata);

            // guardamos el campo que funciona como id, para utilizarlo en el master-detail (si lo hay)
            if (metadata.id) {
                this.tableId = metadata.fieldName;
            }

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
        for (var col of tempColumnas) {
            this.calcFieldType(col);
        }
        this.columnas = tempColumnas;
        this.columnasTabla = tempColumnasTabla;
        this.columnasTablaDetail = tempMastersDetails;
        console.log(this.columnas);
        console.log(this.columnasTabla);
        console.log(this.columnasTablaDetail);
    }

    calcFieldType(formField:GpFormField) {
        // Calcula el tipo de componente a utilizar para el control.
        // Si no se encuentra una representación mejor, se usa string.
        let selectedDisplay = false;
        if (formField.fieldMetadata.displayInfo.displayType == TableService.TEXT_AREA_DISPLAY_TYPE) {
            formField.formFieldType = GpFormTextAreaFieldComponent.FORM_FIELD_TYPE_TEXT_AREA_FIELD;
            selectedDisplay = true;
        }
        if (formField.fieldMetadata.displayInfo.displayType == TableService.DROPDOWN_DISPLAY_TYPE) {
            formField.formFieldType = GpFormDropdownFieldComponent.FORM_FIELD_TYPE_DROPDOWN_FIELD;
            selectedDisplay = true;
        }
        if (formField.fieldMetadata.displayInfo.displayType == TableService.DROPDOWN_RELATED_DISPLAY_TYPE) {
            formField.formFieldType = GpFormDropdownRelatedfieldComponent.FORM_FIELD_TYPE_DROPDOWN_RELATED_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == TableService.CHECKBOX_DISPLAY_TYPE) {
            formField.formFieldType = GpFormCheckboxFieldComponent.FORM_FIELD_TYPE_CHECKBOX_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == TableService.SWITCH_DISPLAY_TYPE) {
            formField.formFieldType = GpFormSwitchFieldComponent.FORM_FIELD_TYPE_SWITCH_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == TableService.HOUR_MINUTE_DISPLAY_TYPE) {
            formField.formFieldType = GpFormTimeFieldComponent.FORM_FIELD_TYPE_TIME_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.fieldType == "DATE") {
            formField.formFieldType = GpFormCalendarFieldComponent.FORM_FIELD_TYPE_CALENDAR_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == TableService.WYSIWYG_DISPLAY_TYPE) {
            formField.formFieldType = GpFormWysiwygFieldComponent.FORM_FIELD_TYPE_WYSIWYG_FIELD;
            selectedDisplay = true;
        }
        if (!selectedDisplay && formField.fieldMetadata.fieldType == "BOOLEAN") {
            if (formField.fieldMetadata.notNull) {
                formField.formFieldType = GpFormSwitchFieldComponent.FORM_FIELD_TYPE_SWITCH_FIELD;
                selectedDisplay = true;
            }
            else {
                // Si puede ser null, usamos un combo con Si/No y vacio.
                formField.formFieldType = GpFormDropdownFieldComponent.FORM_FIELD_TYPE_DROPDOWN_FIELD;
                selectedDisplay = true;
            }
        }
        if (formField.fieldMetadata.displayInfo.displayType == TableService.IMG_DISPLAY_TYPE) {
            formField.formFieldType = GpFormImgFieldComponent.FORM_FIELD_TYPE_IMG_FIELD;
            selectedDisplay = true;
        }
        // Si no se encuentra una representación mejor, se usa string.
        if (!selectedDisplay) {
            formField.formFieldType = GpFormTextFieldComponent.FORM_FIELD_TYPE_TEXT_FIELD;
        }
    }

    showError(message:string) {
        message = message || "Se ha producido un error realizando la operación solicitada.";
        this.msgsGlobal = [{severity: 'error', summary: 'Atención', detail: message}];
    }

    onRowSelect(event:any) {
        this.rowSelected.emit(this.selectedRow);
        this.tableService.selectOneRow(this.tableName, JSON.stringify(this.selectedRow)).subscribe(
            data => {
                if (!data.ok) {
                    this.showErrorDialogo("Error recuperando el registro.");
                    console.log("onRowSelect. Error recuperando: " + JSON.stringify(data));
                }
                else {
                    this.formControl.editedRow = JSON.parse(JSON.stringify(data.data));
                    this.formControl.originalRow = JSON.parse(JSON.stringify(data.data));
                    console.log("Edited row: " + JSON.stringify(this.formControl.editedRow));
                    let self = this;
                    this.forEachFieldControl(function (col:GpFormFieldControl) {
                        console.log("onRowSelect, cvfertc: " + JSON.stringify(col.getFormField()));
                        col.copyValueFromEditedRowToControl(self.formControl.editedRow);
                        col.clearValidations();
                    });
                    this.formControl.edicionEdit = true;
                    this.displayEdicion = true;
                    this.closedDialog.emit(false);
                }
            },
            err => {
                this.showErrorDialogo("Error interno recuperando el registro.");
                console.log("onRowSelect. Error seleccionando: " + JSON.stringify(err));
            },
            () => {
                this.formControl.lockFields = false;
                this.formControlDetail.lockFields = false;
                console.log("onRowSelect. end select.");
                this.cambiaTablaDetail(event.data[this.tableId], this.filterField);
            });
    }

    onDialogDelete() {
        this.formControl.lockFields = true;
        console.log("onDialogDelete.");
        console.log("onDialogDelete. original: " + JSON.stringify(this.formControl.originalRow));
        let jsonDeleteRow = JSON.stringify(this.formControl.originalRow);
        console.log("onDialogDelete. original: " + jsonDeleteRow);
        this.tableService.deleteRow(this.tableName, jsonDeleteRow).subscribe(
            data => {
                if (data.ok) {
                    // Borramos el registro.
                    let i = this.elementos.indexOf(this.selectedRow);
                    if (i >= 0) {
                        console.log("onDialogDelete. before: " + JSON.stringify(this.elementos));
                        this.elementos.splice(i, 1);
                        console.log("onDialogDelete. after: " + JSON.stringify(this.elementos));
                    }
                    // Y cerramos el dialog.
                    this.closeDialog();
                    this.changes.emit(true);
                }
                else {
                    this.showErrorDialogo("Error borrando el registro: " + data.error.errorMessage);
                }
            },
            err => {
                this.showErrorDialogo("Error interno borrando el registro.");
                console.log("onDialogDelete. Error borrando: " + JSON.stringify(err));
            },
            () => {
                this.formControl.lockFields = false;
                console.log("onDialogDelete. end delete.");
            });
    }

    validateEditRow() {
        let valid = true;
        let self = this;
        let inAddOperation = this.formControl.edicionAdd;
        this.forEachFieldControl(function (col:GpFormFieldControl) {
            // El orden del and hace que siempre se ejecute el validateField. Si se pone
            // al reves, cuando valid pase a ser falso no se volvera a llamar a
            // col.validateField por la evaluacion en cortocircuito.
            if (!inAddOperation || !col.getFormField().fieldMetadata.hideInAddOperation) {
                valid = col.validateField(self.formControl.editedRow) && valid;
            }
        });
        return valid;
    }

    onDialogSave() {
        this.formControl.lockFields = true;
        let self = this;
        this.forEachFieldControl(function (col:GpFormFieldControl) {
            col.copyValueFromControlToEditedRow(self.formControl.editedRow);
        });
        if (!this.validateEditRow()) {
            this.formControl.lockFields = false;
            return;
        }
        let jsonModifiedRow = JSON.stringify(this.formControl.editedRow);
        console.log("onDialogSave. modified: " + jsonModifiedRow);
        if (this.selectedRow != null) {
            let jsonOriginalRow = JSON.stringify(this.formControl.originalRow);
            console.log("onDialogSave. original: " + jsonOriginalRow);
            this.tableService.updateRow(this.tableName, jsonOriginalRow, jsonModifiedRow).subscribe(
                data => {
                    if (data.ok) {
                        // Actualizamos el registro.
                        this.forEachField(function (col:GpFormField) {
                            self.selectedRow[col.fieldMetadata.fieldName] = self.formControl.editedRow[col.fieldMetadata.fieldName];
                        });
                        // Y cerramos el dialog.
                        this.closeDialog();
                        this.changes.emit(true);
                    }
                    else {
                        this.showErrorDialogo("Error actualizando el registro: " + data.error.errorMessage);
                    }
                },
                err => {
                    this.showErrorDialogo("Error interno actualizando el registro.");
                    console.log("onDialogSave. Error actualizando: " + JSON.stringify(err));
                },
                () => {
                    this.formControl.lockFields = false;
                    console.log("onDialogSave. end update.");
                });
        }
        else {
            this.tableService.insertRow(this.tableName, jsonModifiedRow).subscribe(
                data => {
                    if (data.ok) {
                        // Insertamos el registro.
                        this.elementos.push(data.insertedRow);
                        // Y cerramos el dialog.
                        this.closeDialog();
                    }
                    else {
                        this.showErrorDialogo("Error insertando el registro: " + data.error.errorMessage);
                    }
                },
                err => {
                    this.showErrorDialogo("Error interno insertando el registro.");
                    console.log("onDialogSave. Error insertando: " + JSON.stringify(err));
                },
                () => {
                    this.formControl.lockFields = false;
                    console.log("onDialogSave. end insert.");
                });
        }
    }

    closeDialog() {
        this.closedDialog.emit(true);
        this.rowSelected.emit(null);
        this.displayEdicion = false;
        this.formControl.lockFields = false;
        this.selectedRow = null;
        this.formControl.originalRow = null;
        this.formControl.edicionAdd = false;
        this.formControl.edicionEdit = false;

        if (this.columnasTablaDetail.length > 0) {
            this.columnasTablaDetail = [];
        }

        this.formControl.lockFields = false;
        this.formControlDetail.originalRow = null;
        this.formControlDetail.edicionAdd = false;
        this.formControlDetail.edicionEdit = false;

        this.msgsDialog = [];
        if (this.dialogErrors) {
            this.cambiaTabla(this.tableName);
            this.columnasDetail = [];
            this.columnasTablaDetail = [];
        }
    }

    onDialogChangeField(change:any) {
        console.log("onDialogChangeField: " + JSON.stringify(change.name));
        change.formField.copyValueFromControlToEditedRow(this.formControl.editedRow);
    }

    onDialogAdd() {
        console.log("onDialogAdd");
        this.selectedRow = null;
        this.formControl.originalRow = null;
        this.formControl.editedRow = {};
        let self = this;
        this.forEachFieldControl(function (col:GpFormFieldControl) {
        if (self.addSelectedCodes.length>0) {
          for (let i = 0; i < self.addSelectedCodes.length; i++) {
            if (self.addSelectedCodes[i].key == col.getFormField().fieldMetadata.fieldName){
              //si el valor existe, introducimos valor
              self.formControl.editedRow[col.getFormField().fieldMetadata.fieldName] = self.addSelectedCodes[i].value;
            }
          }
        }else{
          self.formControl.editedRow[col.getFormField().fieldMetadata.fieldName] = null;
        }
        col.copyValueFromEditedRowToControl(self.formControl.editedRow);
        col.clearValidations();
      });
        this.formControl.edicionEdit = false;
        this.formControl.edicionAdd = true;
        this.displayEdicion = true;
        this.closedDialog.emit(false);
    }

    showErrorDialogo(msg:string) {
        console.log("showErrorDialog " + msg);
        this.dialogErrors = true;
        this.msgsDialog.push({severity: 'error', summary: 'Error', detail: msg});
    }

    forEachField(f:(col:GpFormField) => void) {
        let self = this;
        this.columnas.forEach(col => {
            f(col);
        });
    }

    forEachFieldControl(f:(col:GpFormFieldControl) => void) {
        let self = this;
        this.textFormFields.forEach(col => {
            f(col);
        });
        this.textAreaFormFields.forEach(col => {
            f(col);
        });
        this.timeFormFields.forEach(col => {
            f(col);
        });
        this.switchFormFields.forEach(col => {
            f(col);
        });
        this.dropdownFormFields.forEach(col => {
            f(col);
        });
        this.checkboxFormFields.forEach(col => {
            f(col);
        });
        this.calendarFormFields.forEach(col => {
            f(col);
        });
        this.wysiwygFormFields.forEach(col => {
            f(col);
        });
        this.imgFormFields.forEach(col => {
            f(col);
        });
    }

    changeEvent(info:InfoCampoModificado) {
        this.fieldChanged = info;
    }

    selectRowByIndex(atributeName:string, value:any) {
        let i:number = this._gpUtil.indexOf(this.elementos, atributeName, value);
        if (i > -1) {
            this.selectedRow = this.elementos[i];
        }
    }

}



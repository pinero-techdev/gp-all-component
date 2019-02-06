import { Component, Input, ViewChildren, QueryList, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { TableService, TableMetadata, Filter, FilterOperationType } from '../../services/table.service';
import { GpFormDropdownFieldComponent } from './gp-form-dropdown-field.component';
import { GpFormTextFieldComponent } from './gp-form-text-field.component';
import { GpFormSwitchFieldComponent } from './gp-form-switch-field.component';
import { GpFormControl, GpFormField, GpFormFieldControl } from './gp-app-table-crud-shared';
import { GpFormCheckboxFieldComponent } from './gp-form-checkbox-field.component';
import { GpFormWysiwygFieldComponent } from './gp-form-wysiwyg-field.component';
import { GpFormCalendarFieldComponent } from './gp-form-calendar-field.component';
import { GpFormTextAreaFieldComponent } from './gp-form-textarea-field.component';
import { GpFormTimeFieldComponent } from './gp-form-time-field.component';
import { GpFormImgFieldComponent } from './gp-form-img-field.component';
import { GpFormDropdownRelatedfieldComponent } from './gp-form-dropdown-related-field.component';
import { InfoCampoModificado } from '../../resources/data/infoCampoModificado';
import { GPUtil } from '../../resources/data/gpUtil';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'gp-app-table-crud',
  templateUrl: './gp-app-table-crud.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [GPUtil]
})
export class GpAppTableCrudComponent {
  // Nombre de la tabla a editar.
  @Input() tableName: string;
  // Filtros
  @Input() filterField: string;
  // Filtros a partir de la tabla principal
  @Input() rowSelectedFilters: Filter[];

  // Vars control Insercion, edicion, borrado
  @Input() canAdd: boolean = true;
  @Input() canEdit: boolean = true;
  @Input() canDelete: boolean = true;

  @Output() rowSelected = new EventEmitter<any>();
  @Output() closedDialog = new EventEmitter<boolean>();
  @Output() changes = new EventEmitter<boolean>();

  // Indicador de trabajando.
  working: boolean = true;

  //Id de la tabla
  tableId: string = null;
  // Descripcion de la tabla a editar.
  tableLabel: string;

  // Columnas de la tabla.
  columnas: GpFormField[] = [];
  columnasTabla: GpFormField[] = [];

  // Elementos de la tabla.
  elementos: any[] = [];

  // Fila seleccionada.
  selectedRow: any;

  //Filtros
  filter: Filter;
  filters: Filter[] = [];
  codes: string[] = [];
  filterCode: string;
  filterColumn: string;

  // Indica si se muestra el control de edicion.
  displayEdicion = false;
  // Indica si se han producido errores en el dialog. Si es así, se recarga la tabla.
  dialogErrors = false;
  addSelectedCodes: any = [];

  // Mensajes de edicion.
  msgsDialog: Message[] = [];
  // Mensaje global.
  msgsGlobal: Message[] = [];

  // Form control
  formControl: GpFormControl = new GpFormControl();

  // Campo que ha sido modificado por el usuario
  fieldChanged: InfoCampoModificado = null;

  @ViewChildren(GpFormTextFieldComponent) textFormFields: QueryList<GpFormTextFieldComponent>;
  @ViewChildren(GpFormImgFieldComponent) imgFormFields: QueryList<GpFormImgFieldComponent>;
  @ViewChildren(GpFormTextAreaFieldComponent) textAreaFormFields: QueryList<GpFormTextAreaFieldComponent>;
  @ViewChildren(GpFormTimeFieldComponent) timeFormFields: QueryList<GpFormTimeFieldComponent>;
  @ViewChildren(GpFormSwitchFieldComponent) switchFormFields: QueryList<GpFormSwitchFieldComponent>;
  @ViewChildren(GpFormDropdownFieldComponent) dropdownFormFields: QueryList<GpFormDropdownFieldComponent>;
  @ViewChildren(GpFormDropdownRelatedfieldComponent) dropdownRelatedFormFields: QueryList<GpFormDropdownRelatedfieldComponent>;
  @ViewChildren(GpFormCheckboxFieldComponent) checkboxFormFields: QueryList<GpFormCheckboxFieldComponent>;
  @ViewChildren(GpFormCalendarFieldComponent) calendarFormFields: QueryList<GpFormCalendarFieldComponent>;
  @ViewChildren(GpFormWysiwygFieldComponent) wysiwygFormFields: QueryList<GpFormWysiwygFieldComponent>;

  constructor(private router: Router, private tableService: TableService, private _gpUtil: GPUtil) {
    this.msgsGlobal = [];
  }

  inicializaTabla(tableName: string) {
    this.tableName = tableName;
  }

  cambiaTablaDetail(filters: Filter[], fieldsToOrderBy?: string[]) {
    this.working = true;

    this.columnas = [];
    this.columnasTabla = [];
    this.elementos = [];
    this.selectedRow = null;
    this.formControl.originalRow = null;
    this.msgsDialog = [];
    this.msgsGlobal = [{ severity: 'info', detail: 'Cargando los datos de la tabla.' }];
    this.dialogErrors = false;

    this.filters = filters;

    this.tableService
      .list(this.tableName, true, true, fieldsToOrderBy, filters)
      .finally(() => (this.working = false))
      .subscribe(
        data => {
          //console.log('getMetadata response:' + JSON.stringify(data));
          if (data.ok) {
            this.actualizaDefinicion(data.metadata);
            this.elementos = data.data;
          } else {
            if (data.error != null && data.error.errorMessage != null) {
              if (data.error.errorMessage == 'No se ha establecido sesion o se ha perdido.') {
                this.router.navigate(['login']);
              }
              this.showError(data.error.errorMessage.toString());
            }
          }
        },
        err => {
          console.error(err);
        },
        () => {
          console.log('getMetadata finalizado');
        }
      );
  }

  // Se llama cuando se selecciona una nueva tabla.
  cambiaTabla(tableName: string, fieldsToOrderBy?: string[]) {
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
    this.msgsGlobal = [{ severity: 'info', detail: 'Cargando los datos de la tabla.' }];
    this.dialogErrors = false;

    this.filters = [];
    if (this.rowSelectedFilters != null) {
      this.filters = this.rowSelectedFilters;
    }
    this.tableService
      .list(this.tableName, true, true, fieldsToOrderBy, this.filters)
      .finally(() => (this.working = false))
      .subscribe(
        data => {
          //console.log('getMetadata response:' + JSON.stringify(data));
          if (data.ok) {
            this.actualizaDefinicion(data.metadata);
            this.elementos = data.data;
          } else {
            if (data.error != null && data.error.errorMessage != null) {
              if (data.error.errorMessage == 'No se ha establecido sesion o se ha perdido.') {
                this.router.navigate(['login']);
              }
              this.showError(data.error.errorMessage.toString());
            }
          }
        },
        err => {
          console.error(err);
        },
        () => {
          console.log('getMetadata finalizado');
        }
      );
  }

  actualizaDefinicion(tableMetadata: TableMetadata) {
    let tempColumnas: GpFormField[] = [];
    let tempColumnasTabla: GpFormField[] = [];

    this.tableLabel = tableMetadata.tableLabel;
    for (let metadata of tableMetadata.fields) {
      let formField = new GpFormField(this.formControl, metadata);

      // guardamos el campo que funciona como id
      if (metadata.id) {
        this.tableId = metadata.fieldName;
      }

      tempColumnas.push(formField);
      if (formField.fieldMetadata.lengthInTable != 0) {
        tempColumnasTabla.push(formField);
      }
    }
    for (var col of tempColumnas) {
      this.calcFieldType(col);
    }
    this.columnas = tempColumnas;
    console.info(this.columnas);
    this.columnasTabla = tempColumnasTabla;
  }

  matchFieldType(formField: GpFormField): string {
    let displayTypes: Map<string, string> = new Map([
      [TableService.TEXT_AREA_DISPLAY_TYPE, GpFormTextAreaFieldComponent.FORM_FIELD_TYPE_TEXT_AREA_FIELD],
      [TableService.DROPDOWN_DISPLAY_TYPE, GpFormDropdownFieldComponent.FORM_FIELD_TYPE_DROPDOWN_FIELD],
      [TableService.DROPDOWN_RELATED_DISPLAY_TYPE, GpFormDropdownRelatedfieldComponent.FORM_FIELD_TYPE_DROPDOWN_RELATED_FIELD],
      [TableService.CHECKBOX_DISPLAY_TYPE, GpFormCheckboxFieldComponent.FORM_FIELD_TYPE_CHECKBOX_FIELD],
      [TableService.SWITCH_DISPLAY_TYPE, GpFormSwitchFieldComponent.FORM_FIELD_TYPE_SWITCH_FIELD],
      [TableService.HOUR_MINUTE_DISPLAY_TYPE, GpFormTimeFieldComponent.FORM_FIELD_TYPE_TIME_FIELD],
      [TableService.WYSIWYG_DISPLAY_TYPE, GpFormWysiwygFieldComponent.FORM_FIELD_TYPE_WYSIWYG_FIELD],
      [TableService.IMG_DISPLAY_TYPE, GpFormImgFieldComponent.FORM_FIELD_TYPE_IMG_FIELD]
    ]);
    return displayTypes.get(formField.fieldMetadata.displayInfo.displayType);
  }

  // Calcula el tipo de componente a utilizar para el control.
  calcFieldType(formField: GpFormField) {
    let fieldType = this.matchFieldType(formField);
    if (fieldType != null) {
      formField.formFieldType = fieldType;
      return;
    }

    if (formField.fieldMetadata.fieldType == 'DATE') {
      formField.formFieldType = GpFormCalendarFieldComponent.FORM_FIELD_TYPE_CALENDAR_FIELD;
      return;
    }
    if (formField.fieldMetadata.fieldType == 'BOOLEAN') {
      if (formField.fieldMetadata.notNull) {
        formField.formFieldType = GpFormSwitchFieldComponent.FORM_FIELD_TYPE_SWITCH_FIELD;
      }
      // Si puede ser null, usamos un combo con Si/No y vacio.
      else {
        formField.formFieldType = GpFormDropdownFieldComponent.FORM_FIELD_TYPE_DROPDOWN_FIELD;
      }
      return;
    }
    // Si no se encuentra una representación mejor, se usa string.
    formField.formFieldType = GpFormTextFieldComponent.FORM_FIELD_TYPE_TEXT_FIELD;
  }

  showError(message: string) {
    message = message || 'Se ha producido un error realizando la operación solicitada.';
    this.msgsGlobal = [{ severity: 'error', summary: 'Atención', detail: message }];
  }

  onRowSelect() {
    this.rowSelected.emit(this.selectedRow);
    this.tableService.selectOneRow(this.tableName, JSON.stringify(this.selectedRow)).subscribe(
      data => {
        if (!data.ok) {
          this.showErrorDialogo('Error recuperando el registro.');
          console.log('onRowSelect. Error recuperando: ' + JSON.stringify(data));
        } else {
          this.formControl.editedRow = JSON.parse(JSON.stringify(data.data));
          this.formControl.originalRow = JSON.parse(JSON.stringify(data.data));
          let self = this;
          this.forEachFieldControl(function(col: GpFormFieldControl) {
            console.log(col);
            col.copyValueFromEditedRowToControl(self.formControl.editedRow);
            col.clearValidations();
          });
          this.formControl.edicionEdit = true;
          this.displayEdicion = true;
        }
      },
      err => {
        this.showErrorDialogo('Error interno recuperando el registro.');
        console.log('onRowSelect. Error seleccionando: ' + JSON.stringify(err));
      },
      () => {
        this.formControl.lockFields = false;
        console.log('onRowSelect. end select.');
      }
    );
  }

  onDialogDelete() {
    this.formControl.lockFields = true;
    console.log('onDialogDelete. original: ' + JSON.stringify(this.formControl.originalRow));
    let jsonDeleteRow = JSON.stringify(this.formControl.originalRow);
    console.log('onDialogDelete. original: ' + jsonDeleteRow);
    this.tableService.deleteRow(this.tableName, jsonDeleteRow).subscribe(
      data => {
        if (data.ok) {
          // Borramos el registro.
          let i = this.elementos.indexOf(this.selectedRow);
          if (i >= 0) {
            console.log('onDialogDelete. before: ' + JSON.stringify(this.elementos));
            this.elementos.splice(i, 1);
            console.log('onDialogDelete. after: ' + JSON.stringify(this.elementos));
          }
          // Y cerramos el dialog.
          this.closeDialog();
          this.changes.emit(true);
        } else {
          this.showErrorDialogo('Error borrando el registro: ' + data.error.errorMessage);
        }
      },
      err => {
        this.showErrorDialogo('Error interno borrando el registro.');
        console.log('onDialogDelete. Error borrando: ' + JSON.stringify(err));
      },
      () => {
        this.formControl.lockFields = false;
        console.log('onDialogDelete. end delete.');
      }
    );
  }

  validateEditRow() {
    let valid = true;
    let self = this;
    let inAddOperation = this.formControl.edicionAdd;
    this.forEachFieldControl(function(col: GpFormFieldControl) {
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
    this.forEachFieldControl(function(col: GpFormFieldControl) {
      col.copyValueFromControlToEditedRow(self.formControl.editedRow);
    });
    if (!this.validateEditRow()) {
      this.formControl.lockFields = false;
      return;
    }
    let jsonModifiedRow = JSON.stringify(this.formControl.editedRow);
    console.log('onDialogSave. modified: ' + jsonModifiedRow);
    if (this.selectedRow != null) {
      let jsonOriginalRow = JSON.stringify(this.formControl.originalRow);
      console.log('onDialogSave. original: ' + jsonOriginalRow);
      this.tableService.updateRow(this.tableName, jsonOriginalRow, jsonModifiedRow).subscribe(
        data => {
          if (data.ok) {
            // Actualizamos el registro.
            this.forEachField(function(col: GpFormField) {
              self.selectedRow[col.fieldMetadata.fieldName] = self.formControl.editedRow[col.fieldMetadata.fieldName];
            });
            // Y cerramos el dialog.
            this.closeDialog();
            this.changes.emit(true);
          } else {
            this.showErrorDialogo('Error actualizando el registro: ' + data.error.errorMessage);
          }
        },
        err => {
          this.showErrorDialogo('Error interno actualizando el registro.');
          console.log('onDialogSave. Error actualizando: ' + JSON.stringify(err));
        },
        () => {
          this.formControl.lockFields = false;
          console.log('onDialogSave. end update.');
        }
      );
    } else {
      this.tableService.insertRow(this.tableName, jsonModifiedRow).subscribe(
        data => {
          if (data.ok) {
            this.elementos.push(data.insertedRow);
            this.closeDialog();
          } else {
            this.showErrorDialogo('Error insertando el registro: ' + data.error.errorMessage);
          }
        },
        err => {
          this.showErrorDialogo('Error interno insertando el registro.');
          console.log('onDialogSave. Error insertando: ' + JSON.stringify(err));
        },
        () => {
          this.formControl.lockFields = false;
          console.log('onDialogSave. end insert.');
        }
      );
    }
  }

  closeDialog() {
    this.closedDialog.emit(true);
    this.displayEdicion = false;
    this.selectedRow = null;
    this.formControl.originalRow = null;
    this.formControl.edicionAdd = false;
    this.formControl.edicionEdit = false;
    this.formControl.lockFields = false;
    this.msgsDialog = [];
    if (this.dialogErrors) {
      this.cambiaTabla(this.tableName);
    }
  }

  onDialogChangeField(change: any) {
    console.log('onDialogChangeField: ' + JSON.stringify(change.name));
    change.formField.copyValueFromControlToEditedRow(this.formControl.editedRow);
  }

  onDialogAdd() {
    this.selectedRow = null;
    this.rowSelected.emit(this.selectedRow);
    this.formControl.originalRow = null;
    this.formControl.editedRow = {};
    let self = this;
    this.forEachFieldControl(function(col: GpFormFieldControl) {
      if (self.addSelectedCodes.length > 0) {
        for (let i = 0; i < self.addSelectedCodes.length; i++) {
          if (self.addSelectedCodes[i].key == col.getFormField().fieldMetadata.fieldName) {
            //si el valor existe, introducimos valor
            self.formControl.editedRow[col.getFormField().fieldMetadata.fieldName] = self.addSelectedCodes[i].value;
          }
        }
      } else {
        let fieldName = col.getFormField().fieldMetadata.fieldName;
        let filter: Filter = self._gpUtil.getElementFromArray(self.filters, 'field', fieldName);

        if (filter != null && filter.op == FilterOperationType.EQUAL && filter.values.length == 1) {
          self.formControl.editedRow[fieldName] = filter.values[0];
        } else {
          self.formControl.editedRow[fieldName] = null;
        }
      }
      col.copyValueFromEditedRowToControl(self.formControl.editedRow);
      col.clearValidations();
    });
    this.formControl.edicionEdit = false;
    this.formControl.edicionAdd = true;
    this.displayEdicion = true;
  }

  showErrorDialogo(msg: string) {
    this.dialogErrors = true;
    this.msgsDialog.push({ severity: 'error', summary: 'Error', detail: msg });
  }

  forEachField(f: (col: GpFormField) => void) {
    this.columnas.forEach(col => {
      f(col);
    });
  }

  forEachFieldControl(f: (col: GpFormFieldControl) => void) {
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
    this.dropdownRelatedFormFields.forEach(col => {
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

  changeEvent(info: InfoCampoModificado) {
    this.fieldChanged = info;
  }

  selectRowByIndex(atributeName: string, value: any) {
    let i: number = this._gpUtil.indexOf(this.elementos, atributeName, value);
    if (i > -1) {
      this.selectedRow = this.elementos[i];
    }
  }
}

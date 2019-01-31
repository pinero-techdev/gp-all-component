import {Component, EventEmitter, Input, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Message} from 'primeng/primeng';
import {finalize} from 'rxjs/operators';
import {DataTableMetaData} from '../../../../resources/data/data-table/meta-data/data-table-meta-data.model';
import {FilterOperationType} from '../../../../resources/data/filter/filter-operation-type.enum';
import {Filter} from '../../../../resources/data/filter/filter.model';
import {InfoCampoModificado} from '../../../../resources/data/info-campo-modificado.model';
import {GPUtil} from '../../../../services/gp-util.service';
import {TableService} from '../../../../services/table.service';
import {GpFormCalendarFieldComponent} from '../../gp-form/components/gp-form-calendar-field.component';
import {GpFormCheckboxFieldComponent} from '../../gp-form/components/gp-form-checkbox-field.component';
import {GpFormDropdownFieldComponent} from '../../gp-form/components/gp-form-dropdown-field.component';
import {GpFormDropdownRelatedfieldComponent} from '../../gp-form/components/gp-form-dropdown-related-field.component';
import {GpFormImgFieldComponent} from '../../gp-form/components/gp-form-img-field.component';
import {GpFormSwitchFieldComponent} from '../../gp-form/components/gp-form-switch-field.component';
import {GpFormTextFieldComponent} from '../../gp-form/components/gp-form-text-field.component';
import {GpFormTextAreaFieldComponent} from '../../gp-form/components/gp-form-textarea-field.component';
import {GpFormTimeFieldComponent} from '../../gp-form/components/gp-form-time-field.component';
import {GpFormWysiwygFieldComponent} from '../../gp-form/components/gp-form-wysiwyg-field.component';
import {GpFormControl} from '../../gp-form/resources/gp-form-control.model';
import {GpFormFieldControl} from '../../gp-form/resources/gp-form-field-control';
import {GpFormFieldType} from '../../gp-form/resources/gp-form-field-type.enum';
import {GpFormField} from '../../gp-form/resources/gp-form-field.model';
import {GpTableDisplayTypes} from '../resources/gp-table-display-types.enum';

@Component({
  selector: 'gp-app-table-crud',
  templateUrl: './gp-table-crud.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [GPUtil]
})
export class GpTableCrudComponent {
  // Nombre de la tabla a editar.
  @Input() tableName: string;
  // Filtros
  @Input() filterField: string;
  // Filtros a partir de la tabla principal
  @Input() rowSelectedFilters: Filter[];

  // Vars control Insercion, edicion, borrado
  @Input() canAdd = true;
  @Input() canEdit = true;
  @Input() canDelete = true;

  @Output() rowSelected = new EventEmitter<any>();
  @Output() closedDialog = new EventEmitter<boolean>();
  @Output() changes = new EventEmitter<boolean>();

  // Indicador de trabajando.
  working = true;

  // Id de la tabla
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

  // Filtros
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

  // MensajesComponent de edicion.
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
    this.msgsGlobal = [{severity: 'info', detail: 'Cargando los datos de la tabla.'}];
    this.dialogErrors = false;

    this.filters = filters;

    this.tableService.list(this.tableName, true, true, fieldsToOrderBy, filters)
      .pipe(finalize(() => this.working = false))
      .subscribe(
        data => {
          if (data.ok) {
            this.actualizaDefinicion(data.metadata);
            this.elementos = data.data;
          } else {
            if (data.error != null && data.error.errorMessage != null) {
              if (data.error.errorMessage === 'No se ha establecido sesion o se ha perdido.') {
                this.router.navigate(['login']);
              }
              this.showError(data.error.errorMessage.toString());
            }
          }
        },
        err => {
          console.error(err);
        }
      );
  }

  // Se llama cuando se selecciona una nueva tabla.
  cambiaTabla(tableName: string, fieldsToOrderBy?: string[]) {
    if (this.tableName != null && tableName === this.tableName && this.rowSelectedFilters == null) {
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

    this.filters = [];
    if (this.rowSelectedFilters != null) {

      this.filters = this.rowSelectedFilters;
    }
    this.tableService.list(this.tableName, true, true, fieldsToOrderBy, this.filters)
      .pipe(finalize(() => this.working = false))
      .subscribe(
        data => {
          if (data.ok) {
            this.actualizaDefinicion(data.metadata);
            this.elementos = data.data;
          } else {
            if (data.error != null && data.error.errorMessage != null) {
              if (data.error.errorMessage === 'No se ha establecido sesion o se ha perdido.') {
                this.router.navigate(['login']);
              }
              this.showError(data.error.errorMessage.toString());
            }
          }
        },
        err => {
          console.error(err);
        }
      );
  }

  actualizaDefinicion(tableMetadata: DataTableMetaData) {
    const tempColumnas: GpFormField[] = [];
    const tempColumnasTabla: GpFormField[] = [];

    this.tableLabel = tableMetadata.tableLabel;
    for (const metadata of tableMetadata.fields) {
      const formField = new GpFormField(this.formControl, metadata);

      // guardamos el campo que funciona como id
      if (metadata.id) {
        this.tableId = metadata.fieldName;
      }

      tempColumnas.push(formField);
      if (formField.fieldMetadata.lengthInTable !== 0) {
        tempColumnasTabla.push(formField);
      }
    }
    for (const col of tempColumnas) {
      this.calcFieldType(col);
    }
    this.columnas = tempColumnas;
    this.columnasTabla = tempColumnasTabla;
  }

  matchFieldType(formField: GpFormField): string {
    const displayTypes: Map<string, string> = new Map([
      [GpTableDisplayTypes.TEXT_AREA, GpFormFieldType.TEXT_AREA],
      [GpTableDisplayTypes.DROPDOWN, GpFormFieldType.DROPDOWN],
      [GpTableDisplayTypes.DROPDOWN, GpFormFieldType.DROPDOWN_RELATED],
      [GpTableDisplayTypes.CHECKBOX, GpFormFieldType.CHECKBOX],
      [GpTableDisplayTypes.SWITCH, GpFormFieldType.SWITCH],
      [GpTableDisplayTypes.HOUR_MINUTE, GpFormFieldType.TIME],
      [GpTableDisplayTypes.WYSIWYG, GpFormFieldType.WYSIWYG],
      [GpTableDisplayTypes.IMG, GpFormFieldType.IMG]
    ]);
    return displayTypes.get(formField.fieldMetadata.displayInfo.displayType);
  }

  // Calcula el tipo de componente a utilizar para el control.
  calcFieldType(formField: GpFormField) {
    const fieldType = this.matchFieldType(formField);
    if (fieldType != null) {
      formField.formFieldType = fieldType;
      return;
    }

    if (formField.fieldMetadata.fieldType === 'DATE') {
      formField.formFieldType = GpFormFieldType.CALENDAR;
      return;
    }
    if (formField.fieldMetadata.fieldType === 'BOOLEAN') {
      if (formField.fieldMetadata.notNull) {
        formField.formFieldType = GpFormFieldType.SWITCH;
      } else {
        formField.formFieldType = GpFormFieldType.DROPDOWN;
      }
      return;
    }
    // Si no se encuentra una representación mejor, se usa string.
    formField.formFieldType = GpFormFieldType.TEXT;
  }

  showError(message: string) {
    message = message || 'Se ha producido un error realizando la operación solicitada.';
    this.msgsGlobal = [{severity: 'error', summary: 'Atención', detail: message}];
  }

  onRowSelect() {
    this.rowSelected.emit(this.selectedRow);
    this.tableService.selectOneRow(this.tableName, JSON.stringify(this.selectedRow)).subscribe(
      data => {
        if (!data.ok) {
          this.showErrorDialogo('Error recuperando el registro.');
        } else {
          this.formControl.editedRow = JSON.parse(JSON.stringify(data.data));
          this.formControl.originalRow = JSON.parse(JSON.stringify(data.data));
          const self = this;
          this.forEachFieldControl(function (col: GpFormFieldControl) {
            col.copyValueFromEditedRowToControl(self.formControl.editedRow);
            col.clearValidations();
          });
          this.formControl.edicionEdit = true;
          this.displayEdicion = true;
        }
      },
      err => {
        this.showErrorDialogo('Error interno recuperando el registro.');
      },
      () => {
        this.formControl.lockFields = false;
      });
  }

  onDialogDelete() {
    this.formControl.lockFields = true;
    const jsonDeleteRow = JSON.stringify(this.formControl.originalRow);
    this.tableService.deleteRow(this.tableName, jsonDeleteRow).subscribe(
      data => {
        if (data.ok) {
          // Borramos el registro.
          const i = this.elementos.indexOf(this.selectedRow);
          if (i >= 0) {
            this.elementos.splice(i, 1);
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
      },
      () => {
        this.formControl.lockFields = false;
      });
  }

  validateEditRow() {
    let valid = true;
    const self = this;
    const inAddOperation = this.formControl.edicionAdd;
    this.forEachFieldControl(function (col: GpFormFieldControl) {
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
    const self = this;
    this.forEachFieldControl(function (col: GpFormFieldControl) {
      col.copyValueFromControlToEditedRow(self.formControl.editedRow);
    });
    if (!this.validateEditRow()) {
      this.formControl.lockFields = false;
      return;
    }
    const jsonModifiedRow = JSON.stringify(this.formControl.editedRow);
    if (this.selectedRow != null) {
      const jsonOriginalRow = JSON.stringify(this.formControl.originalRow);
      this.tableService.updateRow(this.tableName, jsonOriginalRow, jsonModifiedRow).subscribe(
        data => {
          if (data.ok) {
            // Actualizamos el registro.
            this.forEachField(function (col: GpFormField) {
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
        },
        () => {
          this.formControl.lockFields = false;
        });
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
        },
        () => {
          this.formControl.lockFields = false;
        });
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
    change.formField.copyValueFromControlToEditedRow(this.formControl.editedRow);
  }

  onDialogAdd() {
    this.selectedRow = null;
    this.rowSelected.emit(this.selectedRow);
    this.formControl.originalRow = null;
    this.formControl.editedRow = {};
    const self = this;
    this.forEachFieldControl(function (col: GpFormFieldControl) {
      if (self.addSelectedCodes.length > 0) {
        for (let i = 0; i < self.addSelectedCodes.length; i++) {
          if (self.addSelectedCodes[i].key === col.getFormField().fieldMetadata.fieldName) {
            // si el valor existe, introducimos valor
            self.formControl.editedRow[col.getFormField().fieldMetadata.fieldName] = self.addSelectedCodes[i].value;
          }
        }
      } else {
        const fieldName = col.getFormField().fieldMetadata.fieldName;
        const filter: Filter = self._gpUtil.getElementFromArray(self.filters, 'field', fieldName);

        if (filter != null && filter.op === FilterOperationType.EQUAL && filter.values.length === 1) {
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
    this.msgsDialog.push({severity: 'error', summary: 'Error', detail: msg});
  }

  forEachField(f: (col: GpFormField) => void) {
    this.columnas.forEach(col => {
      f(col);
    });
  }

  forEachFieldControl(f: (col: GpFormControl) => void) {
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
    const i: number = this._gpUtil.indexOf(this.elementos, atributeName, value);
    if (i > -1) {
      this.selectedRow = this.elementos[i];
    }
  }

}



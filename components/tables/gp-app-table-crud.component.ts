import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, TreeNode } from 'primeng/primeng';
import { GPUtil } from '../../resources/data/gpUtil';
import { InfoCampoModificado } from '../../resources/data/infoCampoModificado';
import { Filter, FilterOperationType, TableMetadata, TableService } from '../../services/table.service';
import { GpFormControl, GpFormField, GpFormFieldControl, GpFormFieldDetail } from './gp-app-table-crud-shared';
import { GpFormCalendarFieldComponent } from './gp-form-calendar-field.component';
import { GpFormCheckboxFieldComponent } from './gp-form-checkbox-field.component';
import { GpFormDropdownFieldComponent } from './gp-form-dropdown-field.component';
import { GpFormDropdownRelatedfieldComponent } from './gp-form-dropdown-related-field.component';
import { GpFormImgFieldComponent } from './gp-form-img-field.component';
import { GpFormSwitchFieldComponent } from './gp-form-switch-field.component';
import { GpFormTextFieldComponent } from './gp-form-text-field.component';
import { GpFormTextAreaFieldComponent } from './gp-form-textarea-field.component';
import { GpFormTimeFieldComponent } from './gp-form-time-field.component';
import { GpFormWysiwygFieldComponent } from './gp-form-wysiwyg-field.component';
import { GpFormDropdownDynamicFieldComponent } from 'gp-all-component/components/tables/gp-form-dropdown-dynamic-field.component';

@Component({
  selector: 'gp-app-table-crud',
  templateUrl: './gp-app-table-crud.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [GPUtil]
})
export class GpAppTableCrudComponent implements OnInit {
  @Input()
  campoDropdownDinamico: string;
  // Nombre de la tabla a editar.
  @Input()
  tableName: string;
  // Nombre de la tabla de detalle
  @Input()
  tableNameDetail: string;
  // Identificador de la tabla detalle que tiene en común con la tabla principal
  @Input()
  filterField: string;

  // Vars control Insercion, edicion, borrado, exportado
  @Input()
  canAdd: boolean = true;

  @Input()
  canEdit: boolean = true;

  @Input()
  canDelete: boolean = true;

  @Input()
  canExport: boolean = true;

  // filtros a partir de la tabla principal
  @Input()
  rowSelectedFilters: Filter[];

  // Identificador de la tabla detalle que tiene en común con la tabla principal
  @Input()
  parentId: string;

  // Cantidad registros por pagina del grid
  @Input()
  cantRows: number;

  // Exclusiones de la tabla y el formulario
  @Input()
  exclusionsForm: string[] = [];

  @Input()
  exclusionsTable: string[] = [];

  @Input()
  fieldsRq: string[] = [];

  @Input()
  treeTableDetail: boolean = false;

  @Output()
  rowSelected = new EventEmitter<any>();

  @Output()
  closedDialog = new EventEmitter<boolean>();

  @Output()
  changes = new EventEmitter<boolean>();

  @ViewChildren(GpFormTextFieldComponent)
  textFormFields: QueryList<GpFormTextFieldComponent>;
  @ViewChildren(GpFormImgFieldComponent)
  imgFormFields: QueryList<GpFormImgFieldComponent>;
  @ViewChildren(GpFormTextAreaFieldComponent)
  textAreaFormFields: QueryList<GpFormTextAreaFieldComponent>;
  @ViewChildren(GpFormTimeFieldComponent)
  timeFormFields: QueryList<GpFormTimeFieldComponent>;
  @ViewChildren(GpFormSwitchFieldComponent)
  switchFormFields: QueryList<GpFormSwitchFieldComponent>;
  @ViewChildren(GpFormDropdownFieldComponent)
  dropdownFormFields: QueryList<GpFormDropdownFieldComponent>;
  @ViewChildren(GpFormDropdownDynamicFieldComponent)
  dropdownDynamicFormFields: QueryList<GpFormDropdownFieldComponent>;
  @ViewChildren(GpFormCheckboxFieldComponent)
  checkboxFormFields: QueryList<GpFormCheckboxFieldComponent>;
  @ViewChildren(GpFormCalendarFieldComponent)
  calendarFormFields: QueryList<GpFormCalendarFieldComponent>;
  @ViewChildren(GpFormWysiwygFieldComponent)
  wysiwygFormFields: QueryList<GpFormWysiwygFieldComponent>;

  // Indicador de trabajando.
  working: boolean = true;
  workingDetail: boolean = false;
  activeLoagingDetail: boolean = false;

  // Descripcion de la tabla a editar.
  tableLabel: string;

  // Descripcion de la tabla detalle a editar.

  tableLabelDetail: string;

  // Columnas de la tabla.
  columnas: GpFormField[] = [];
  columnasTabla: GpFormField[] = [];

  // Elementos de la tabla.
  elementos: any[] = [];

  // Fila seleccionada.
  selectedRow: any;

  columnasDetail: GpFormFieldDetail[] = [];
  columnasTablaDetail: any[] = [];
  elementosDetail: any[] = [];
  selectedRowDetail: any;
  filter: Filter;
  filters: Filter[] = [];
  codes: string[] = [];
  treeTableElementos: TreeNode[];
  selectedTree: TreeNode;

  //Id de la tabla
  tableId: string = null;

  // Indica si se muestra la tabla maestro-detalle.
  showTableDetail: boolean = false;

  // Indica si se muestra el control de edicion.
  displayEdicion = false;
  displayEdicionDetail = false;

  // Indica si se han producido errores en el dialog. Si es así, se recarga la tabla.
  dialogErrors = false;

  addSelectedCodes: any = [];

  // Mensajes de edicion.
  msgsDialog: Message[] = [];

  // Mensaje global.
  msgsGlobal: Message[] = [];

  // Form control
  formControl: GpFormControl = new GpFormControl();
  formControlDetail: GpFormControl = new GpFormControl();

  // Campo que ha sido modificado por el usuario
  fieldChanged: InfoCampoModificado = null;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private tableService: TableService, private _gpUtil: GPUtil) {
    this.msgsGlobal = [];
    this.closeDialog();
  }

  ngOnInit() {}

  initDetailTable(tableNameDetail: string, filterField: string) {
    this.tableNameDetail = tableNameDetail;
    this.filterField = filterField;
    this.activeLoagingDetail = true;
  }

  cambiaTablaDetail(filterCode: string, filterColumn: string) {
    if (this.tableNameDetail != undefined) {
      this.workingDetail = true;
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
      this.msgsGlobal = [{ severity: 'info', detail: 'Cargando los datos de la tabla detalle.' }];
      this.dialogErrors = false;
      this.tableService.list(this.tableNameDetail, true, false, null, this.filters).subscribe(
        data => {
          if (data.ok) {
            this.actualizaDefinicionDetail(data.metadata);
            if (this.treeTableDetail) {
              this.tratarTreeTable(data.data);
            } else {
              this.elementosDetail = data.data;
            }
          } else {
            if (data.error != null && data.error.errorMessage != null) {
              if (data.error.errorMessage == 'No se ha establecido sesion o se ha perdido.') {
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
          this.workingDetail = false;
        }
      );
    }
  }

  inicializaTabla(tableName: string) {
    this.tableName = tableName;
  }

  // Se llama cuando se selecciona una nueva tabla.
  cambiaTabla(tableName: string) {
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
    this.elementosDetail = [];
    this.selectedRow = null;
    this.selectedRowDetail = null;
    this.formControl.originalRow = null;
    this.formControlDetail.originalRow = null;
    this.msgsDialog = [];
    this.msgsGlobal = [{ severity: 'info', detail: 'Cargando los datos de la tabla.' }];
    this.dialogErrors = false;

    if (this.rowSelectedFilters != null) {
      this.filters = [];
      this.filters = this.rowSelectedFilters;

      this.tableService.list(this.tableName, true, false, null, this.filters).subscribe(
        data => {
          console.log('getMetadata response:' + JSON.stringify(data));
          if (data.ok) {
            this.actualizaDefinicion(data.metadata);
            this.elementos = data.data;
          } else {
            if (data.error != null && data.error.errorMessage != null) {
              if (data.error.errorMessage == 'No se ha establecido sesion o se ha perdido.') {
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
              if (data.error.errorMessage == 'No se ha establecido sesion o se ha perdido.') {
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

  actualizaDefinicionDetail(tableMetadata: TableMetadata) {
    let tempColumnasDetail: GpFormFieldDetail[] = [];
    let tempMastersDetails: GpFormFieldDetail[] = [];

    this.tableLabelDetail = tableMetadata.tableLabel;
    for (let metadata of tableMetadata.fields) {
      if (metadata.displayInfo.order > 0) {
        let formField = new GpFormFieldDetail(this.formControlDetail, metadata);
        tempColumnasDetail.push(formField);
        tempMastersDetails.push(formField);
      }
    }
    for (var col of tempColumnasDetail) {
      this.calcFieldType(col);
    }
    this.columnasDetail = tempColumnasDetail;
    this.columnasTablaDetail = tempMastersDetails;
  }

  actualizaDefinicion(tableMetadata: TableMetadata) {
    let tempColumnas: GpFormField[] = [];
    let tempColumnasTabla: GpFormField[] = [];
    let tempMastersDetails: GpFormField[] = [];

    this.tableLabel = tableMetadata.tableLabel;
    for (let metadata of tableMetadata.fields) {
      let formField = new GpFormField(this.formControl, metadata, this.tableName);

      // guardamos el campo que funciona como id, para utilizarlo en el master-detail (si lo hay)
      if (metadata.id) {
        this.tableId = metadata.fieldName;
      }

      tempColumnas.push(formField);
      if (metadata.displayInfo.displayType == 'MASTER_DETAIL') {
        tempMastersDetails.push(formField);
      } else {
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

  calcFieldType(formField: GpFormField) {
    // Calcula el tipo de componente a utilizar para el control.
    // Si no se encuentra una representación mejor, se usa string.
    let selectedDisplay = false;
    if (formField.fieldMetadata.fieldName == this.campoDropdownDinamico) {
      formField.formFieldType = GpFormDropdownDynamicFieldComponent.FORM_FIELD_TYPE_DROPDOWN_DYNAMIC_FIELD;
      formField.fieldMetadata.displayInfo.referencedTable = this.tableNameDetail;
      selectedDisplay = true;
    }
    if (formField.fieldMetadata.displayInfo.displayType == TableService.TEXT_AREA_DISPLAY_TYPE) {
      formField.formFieldType = GpFormTextAreaFieldComponent.FORM_FIELD_TYPE_TEXT_AREA_FIELD;
      selectedDisplay = true;
    }
    if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == TableService.DROPDOWN_DISPLAY_TYPE) {
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
    if (!selectedDisplay && formField.fieldMetadata.fieldType == 'DATE') {
      formField.formFieldType = GpFormCalendarFieldComponent.FORM_FIELD_TYPE_CALENDAR_FIELD;
      selectedDisplay = true;
    }
    if (!selectedDisplay && formField.fieldMetadata.displayInfo.displayType == TableService.WYSIWYG_DISPLAY_TYPE) {
      formField.formFieldType = GpFormWysiwygFieldComponent.FORM_FIELD_TYPE_WYSIWYG_FIELD;
      selectedDisplay = true;
    }
    if (!selectedDisplay && formField.fieldMetadata.fieldType == 'BOOLEAN') {
      if (formField.fieldMetadata.notNull) {
        formField.formFieldType = GpFormSwitchFieldComponent.FORM_FIELD_TYPE_SWITCH_FIELD;
        selectedDisplay = true;
      } else {
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

  showError(message: string) {
    message = message || 'Se ha producido un error realizando la operación solicitada.';
    this.msgsGlobal = [{ severity: 'error', summary: 'Atención', detail: message }];
  }

  onRowSelect(event: any) {
    this.rowSelected.emit(this.selectedRow);
    this.tableService.selectOneRow(this.tableName, JSON.stringify(this.selectedRow)).subscribe(
      data => {
        if (!data.ok) {
          this.showErrorDialogo('Error recuperando el registro.');
          console.log('onRowSelect. Error recuperando: ' + JSON.stringify(data));
        } else {
          this.formControl.editedRow = JSON.parse(JSON.stringify(data.data));
          this.formControl.originalRow = JSON.parse(JSON.stringify(data.data));
          console.log('Edited row: ' + JSON.stringify(this.formControl.editedRow));
          let self = this;
          this.forEachFieldControl(function(col: GpFormFieldControl) {
            console.log('onRowSelect, cvfertc: ' + JSON.stringify(col.getFormField()));
            col.copyValueFromEditedRowToControl(self.formControl.editedRow);
            col.clearValidations();
          });
          this.formControl.edicionEdit = true;
          this.displayEdicion = true;
          this.displayEdicionDetail = false;
          this.closedDialog.emit(false);
        }
      },
      err => {
        this.showErrorDialogo('Error interno recuperando el registro.');
        console.log('onRowSelect. Error seleccionando: ' + JSON.stringify(err));
      },
      () => {
        this.formControl.lockFields = false;
        this.formControlDetail.lockFields = false;
        console.log('onRowSelect. end select.');
        this.cambiaTablaDetail(event.data[this.tableId], this.filterField);
      }
    );
  }

  onRowSelectDetail(event: any) {
    if (this.treeTableDetail) {
      this.selectedRowDetail = this.selectedTree.data;
    }
    this.tableService.selectOneRow(this.tableNameDetail, JSON.stringify(this.selectedRowDetail)).subscribe(
      data => {
        if (!data.ok) {
          this.showErrorDialogo('Error recuperando el registro.');
          console.log('onRowSelect. Error recuperando: ' + JSON.stringify(data));
        } else {
          this.formControlDetail.editedRow = JSON.parse(JSON.stringify(data.data));
          this.formControlDetail.originalRow = JSON.parse(JSON.stringify(data.data));
          this.formControlDetail.editedRow = this.formControlDetail.editedRow;
          console.log('Edited row: ' + JSON.stringify(this.formControlDetail.editedRow));
          let self = this;
          this.forEachFieldControl(function(col: GpFormFieldControl) {
            console.log('onRowSelect, cvfertc: ' + JSON.stringify(col.getFormField()));
            col.copyValueFromEditedRowToControl(self.formControlDetail.editedRow);
            col.clearValidations();
          });
          this.displayEdicion = false;
          this.displayEdicionDetail = true;
        }
      },
      err => {
        this.showErrorDialogo('Error interno recuperando el registro.');
        console.log('onRowSelect. Error seleccionando: ' + JSON.stringify(err));
      },
      () => {
        this.formControl.lockFields = false;
        this.formControlDetail.lockFields = false;
        console.log('onRowSelect. end select.');
      }
    );
  }

  onRowUnselect() {
    console.log('RowUnselect: ' + JSON.stringify(event));
    this.closeDialog();
  }

  onDialogClose() {
    this.showTableDetail = false;
    this.closeDialog();
  }

  onDialogCloseDetail() {
    this.showTableDetail = true;
    this.closeDialog();
  }

  onDialogDelete() {
    this.formControl.lockFields = true;
    console.log('onDialogDelete.');
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

  onDialogDeleteDetail() {
    this.formControl.lockFields = true;
    console.log('onDialogDeleteDetail.');
    console.log('onDialogDeleteDetail. original: ' + JSON.stringify(this.formControlDetail.originalRow));
    let jsonDeleteRow = JSON.stringify(this.formControlDetail.originalRow);
    console.log('onDialogDeleteDetail. original: ' + jsonDeleteRow);
    this.tableService.deleteRow(this.tableNameDetail, jsonDeleteRow).subscribe(
      data => {
        if (data.ok) {
          // Borramos el registro.
          if (this.treeTableDetail) {
            this.eliminarNodo(this.selectedRowDetail);
          } else {
            const i = this.elementosDetail.indexOf(this.selectedRowDetail);
            if (i >= 0) {
              this.elementosDetail.splice(i, 1);
            }
          }
          // Y cerramos el registro de la tabla detalle.
          this.displayEdicionDetail = false;
        } else {
          this.showErrorDialogo('Error borrando el registro: ' + data.error.errorMessage);
        }
      },
      err => {
        this.showErrorDialogo('Error interno borrando el registro.');
        console.log('onDialogDeleteDetail. Error borrando: ' + JSON.stringify(err));
      },
      () => {
        this.formControl.lockFields = false;
        console.log('onDialogDeleteDetail. end delete.');
      }
    );
  }

  validateEditRow(isDetail?: boolean, form?: GpFormControl) {
    let valid = true;
    let inAddOperation = this.formControl.edicionAdd;
    this.forEachFieldControl(function(col: GpFormFieldControl) {
      if (col.getFormField().tableName !== undefined && !isDetail) {
        valid = col.validateField(form.editedRow) && valid;
      } else if (col.getFormField().tableName == undefined && isDetail) {
        valid = col.validateField(form.editedRow) && valid;
      }
    });
    return valid;
  }

  onDialogSave() {
    this.formControl.lockFields = true;
    let self = this;

    if (!this.validateEditRow(false, this.formControl)) {
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
      this.insertRow(jsonModifiedRow);
    }
  }

  onDialogSaveDetail(event: any) {
    this.msgsDialog = [];
    let self = this;
    if (!this.validateEditRow(true, this.formControlDetail)) {
      this.formControl.lockFields = false;
      return;
    }
    let jsonModifiedRow = JSON.stringify(this.formControlDetail.editedRow);
    console.log('onDialogSaveDetail. modified: ' + jsonModifiedRow);
    if (this.selectedRowDetail != null) {
      this.tableService.selectOneRow(this.tableNameDetail, jsonModifiedRow).subscribe(data => {
        if (data.ok) {
          let jsonOriginalRow = JSON.stringify(data.data);
          this.tableService.updateRow(this.tableNameDetail, jsonOriginalRow, jsonModifiedRow).subscribe(
            data => {
              if (data.ok) {
                if (this.exclusionsTable.length > 0 && !this.treeTableDetail) {
                  this.tableService.getValue(this.tableNameDetail, jsonModifiedRow).subscribe(data => {
                    if (data.ok) {
                      let jsonOriginalRow = data.data;
                      self.formControlDetail.editedRow = jsonOriginalRow;

                      this.forEachDetailField(function(col: GpFormFieldDetail) {
                        self.selectedRowDetail[col.fieldMetadata.fieldName] = self.formControlDetail.editedRow[col.fieldMetadata.fieldName];
                      });
                    }
                  });
                } else if (this.treeTableDetail) {
                  this.selectedTree.children = this.eliminarNodo(this.selectedTree.data);

                  this.forEachDetailField(function(col: GpFormFieldDetail) {
                    self.selectedTree.data[col.fieldMetadata.fieldName] = self.formControlDetail.editedRow[col.fieldMetadata.fieldName];
                  });

                  this.insertarNodo(this.selectedTree.data, this.selectedTree.children);
                } else {
                  this.forEachDetailField(function(col: GpFormFieldDetail) {
                    self.selectedRowDetail[col.fieldMetadata.fieldName] = self.formControlDetail.editedRow[col.fieldMetadata.fieldName];
                  });
                }

                this.displayEdicionDetail = false;
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
          this.onDialogDeleteDetail();
          this.insertRowDetail(jsonModifiedRow);
        }
      });
    } else {
      this.insertRowDetail(jsonModifiedRow);
    }
  }

  insertRow(jsonModifiedRow: any) {
    this.tableService.insertRow(this.tableName, jsonModifiedRow).subscribe(
      data => {
        if (data.ok) {
          // Insertamos el registro.
          this.elementos.push(data.insertedRow);
          // Y cerramos el registro de la tabla detalle.
          this.displayEdicion = false;
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

  insertRowDetail(jsonModifiedRow: any) {
    this.tableService.insertRow(this.tableNameDetail, jsonModifiedRow).subscribe(
      data => {
        if (data.ok) {
          // Insertamos el registro.
          if (this.treeTableDetail) {
            this.insertarNodo(data.insertedRow);
          } else {
            this.elementosDetail.push(data.insertedRow);
          }
          // Y cerramos el registro de la tabla detalle.
          this.displayEdicionDetail = false;
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

  updateRowDetail(jsonOriginalRow: any, jsonModifiedRow: any) {}

  closeDialog() {
    this.closedDialog.emit(true);
    this.rowSelected.emit(null);
    this.displayEdicion = false;
    this.formControl.lockFields = false;
    this.selectedRow = null;
    this.formControl.originalRow = null;
    this.formControl.edicionAdd = false;
    this.formControl.edicionEdit = false;

    if (!this.showTableDetail && this.columnasTablaDetail.length > 0) {
      this.columnasTablaDetail = [];
      this.selectedRow = null;
    }

    this.displayEdicionDetail = false;
    this.selectedRowDetail = null;
    this.formControlDetail.lockFields = false;
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

  onDialogChangeField(change: any) {
    console.log('onDialogChangeField: ' + JSON.stringify(change.name));
    change.formField.copyValueFromControlToEditedRow(this.formControl.editedRow);
  }

  onDialogAdd() {
    console.log('onDialogAdd');
    this.selectedRow = null;
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
        self.formControl.editedRow[col.getFormField().fieldMetadata.fieldName] = null;
      }
      col.copyValueFromEditedRowToControl(self.formControl.editedRow);
      col.clearValidations();
    });
    this.formControl.edicionEdit = false;
    this.formControl.edicionAdd = true;
    this.displayEdicion = true;
    this.displayEdicionDetail = false;
    this.columnasTablaDetail = [];
    this.closedDialog.emit(false);
  }

  onDialogAddDetail() {
    console.log('onDialogAddDetail');
    this.selectedRowDetail = null;
    this.formControlDetail.originalRow = null;
    this.formControlDetail.editedRow = {};
    let fielNameEditedRow = Object.keys(this.formControlDetail.editedRow);
    this.formControlDetail.editedRow[this.tableId] = this.formControl.editedRow[this.tableId];
    let self = this;
    this.forEachFieldControl(function(col: GpFormFieldControl) {
      if (fielNameEditedRow[1]) {
        self.formControlDetail.editedRow[fielNameEditedRow[1]] = null;
      }
      col.copyValueFromEditedRowToControl(self.formControlDetail.editedRow);
      col.clearValidations();
    });

    this.formControlDetail.edicionEdit = false;
    this.formControlDetail.edicionAdd = true;
    this.displayEdicion = false;
    this.displayEdicionDetail = true;
  }

  showErrorDialogo(msg: string) {
    console.log('showErrorDialog ' + msg);
    this.dialogErrors = true;
    this.msgsDialog.push({ severity: 'error', summary: 'Error', detail: msg });
  }

  forEachField(f: (col: GpFormField) => void) {
    let self = this;
    this.columnas.forEach(col => {
      f(col);
    });
  }

  forEachDetailField(f: (col: GpFormFieldDetail) => void) {
    let self = this;
    this.columnasDetail.forEach(col => {
      f(col);
    });
  }

  forEachFieldControl(f: (col: GpFormFieldControl) => void) {
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
    this.dropdownDynamicFormFields.forEach(col => {
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

  changeEvent(info: InfoCampoModificado) {
    this.fieldChanged = info;
  }

  selectRowByIndex(atributeName: string, value: any) {
    let i: number = this._gpUtil.indexOf(this.elementos, atributeName, value);
    if (i > -1) {
      this.selectedRow = this.elementos[i];
    }
  }

  checkExcludeFieldsTable(col: any): boolean {
    let showCol: boolean = true;
    if (this.exclusionsTable.length > 0) {
      this.exclusionsTable.forEach(valor => {
        if (col.fieldMetadata.fieldName == valor) {
          showCol = false;
        }
      });
    }
    return showCol;
  }

  checkExcludeFieldsForm(col: any): boolean {
    let showCol: boolean = true;
    if (this.exclusionsForm.length > 0) {
      this.exclusionsForm.forEach(valor => {
        if (col.fieldMetadata.fieldName == valor) {
          showCol = false;
        }
      });
    }
    return showCol;
  }

  private tratarTreeTable(data: any) {
    // data es un array que contiene los padres.
    data.forEach(dato => {
      this.elementosDetail.push(this.tratarNodo(dato));
    });
  }

  private tratarNodo(nodo: any): TreeNode {
    let dataObject: {} = {};

    // para que sea completamente genérico, así los nombres de los campos del objeto coinciden con los fieldNames de metadata.
    this.columnasDetail.forEach((columnaDetail: GpFormFieldDetail) => {
      dataObject[columnaDetail.fieldMetadata.fieldName] = nodo[columnaDetail.fieldMetadata.fieldName];
    });

    let elemento: TreeNode = {
      data: dataObject
    };

    if (nodo.listaChildren && nodo.listaChildren.length > 0) {
      elemento.children = [];

      // recursividad para tratar a los hijos
      nodo.listaChildren.forEach(child => elemento.children.push(this.tratarNodo(child)));
    }

    return elemento;
  }

  private insertarNodo(nodo: any, children?: TreeNode[]): void {
    // para que sea completamente genérico, así los nombres de los campos del objeto coinciden con los fieldNames de metadata.
    let insertado: TreeNode = children ? this.transformarDataNodo(nodo, children) : this.transformarDataNodo(nodo);
    let atributoId: string = this.obtenerAtributoId();
    let atributoPadreId: string = this.obtenerAtributoPadreId(atributoId);

    if (nodo[atributoPadreId]) {
      // encontrar el padre al cual insertar el registro
      let padre = this.encontrarPadreNodo(this.elementosDetail, nodo, atributoId, atributoPadreId);

      if ((padre && !padre.children) || (padre && padre.children && padre.children.length < 1)) {
        padre.children = [];
      }
      padre.children.push(insertado);
    } else {
      // si no tiene hay que insertarlo al elementosDetail directamente
      this.elementosDetail.push(insertado);
    }
  }

  private eliminarNodo(nodo: any): TreeNode[] {
    // tiene padre?
    // si -> quitarlo de la lista del padre -> eliminarlo
    // no -> eliminarlo
    // devolver la lista de hijos que tiene

    let eliminado: TreeNode = this.transformarDataNodo(nodo);
    let atributoId: string = this.obtenerAtributoId();
    let atributoPadreId: string = this.obtenerAtributoPadreId(atributoId);

    // encontrar el padre del cual quitar el registro
    let itself: TreeNode;
    if (nodo[atributoPadreId]) {
      let padre = this.encontrarPadreNodo(this.elementosDetail, nodo, atributoId, atributoPadreId);

      if (padre && padre.children && padre.children.length > 0) {
        itself = padre.children.find((child: TreeNode) => child.data[atributoId] == eliminado.data[atributoId]);
        const index: number = padre.children.indexOf(itself);
        if (itself) {
          padre.children.splice(index, 1);
        }
      }
    } else {
      itself = this.elementosDetail.find((child: TreeNode) => child.data[atributoId] == eliminado.data[atributoId]);
      const index = this.elementosDetail.indexOf(itself, 0);
      if (index > -1) {
        this.elementosDetail.splice(index, 1);
      }
    }
    return itself.children;
    // se ha quitado de la lista. Pero y sus hijos!? caen con él...? y al actualizar??
  }

  private transformarDataNodo(nodo: any, children?: TreeNode[]): TreeNode {
    let treeNode: TreeNode = { data: {} };

    this.columnasDetail.forEach((columnaDetail: GpFormFieldDetail) => {
      treeNode.data[columnaDetail.fieldMetadata.fieldName] = nodo[columnaDetail.fieldMetadata.fieldName];
    });

    if (children) treeNode.children = children;

    return treeNode;
  }

  private obtenerAtributoId(): string {
    let atributoId: string;

    this.columnasDetail.forEach((columnaDetail: GpFormFieldDetail) => {
      if (columnaDetail.fieldMetadata.id) {
        atributoId = columnaDetail.fieldMetadata.fieldName;
      }
    });

    return atributoId;
  }

  private obtenerAtributoPadreId(atributoId: string): string {
    let atributoPadreId: string;

    // obtener el atributo que contiene el código del padre
    this.columnasDetail.forEach((columnaDetail: GpFormFieldDetail) => {
      if (columnaDetail.fieldMetadata.displayInfo && columnaDetail.fieldMetadata.displayInfo.referencedField == atributoId) {
        atributoPadreId = columnaDetail.fieldMetadata.fieldName;
      }
    });

    return atributoPadreId;
  }

  private encontrarPadreNodo(nodosNivel: TreeNode[], nodo: any, atributoId: string, atributoPadreId: string): TreeNode {
    let padre: TreeNode = nodosNivel.find((elemento: TreeNode) => elemento.data[atributoId] == nodo[atributoPadreId]);

    if (!padre) {
      nodosNivel.forEach((nivel: TreeNode) => {
        if (!padre && nivel.children && nivel.children.length > 0) {
          padre = this.encontrarPadreNodo(nivel.children, nodo, atributoId, atributoPadreId);
        }
      });
    }

    return padre;
  }
}

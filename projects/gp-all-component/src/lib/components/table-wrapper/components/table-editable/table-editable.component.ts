import moment from 'moment';
import { TableEditableService } from '../../../../services/api/table/table-editable.service';
import { GPUtil } from '../../../../services/core/gp-util.service';
import { TableEditable } from '../../../../resources/data/data-table/editable/data-table-editable.model';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DataTableEditableCustomButton } from '../../../../resources/data/data-table/editable/data-table-editable-customButton';

/*
 *  Data order: data -> filteredData -> sortedData -> currentPageData
 *
 * */
@Component({
  selector: 'app-table-editable',
  templateUrl: './table-editable.component.html',
  styleUrls: ['./table-editable.component.scss'],
  providers: [ConfirmationService],
})
export class TableEditableComponent implements OnInit {
  @Input() dataTable: TableEditable;
  @Input() customButtons: DataTableEditableCustomButton[] = [];
  @Input() showControlButtons = true;

  @Output() onRowSelectEvent = new EventEmitter<any>();
  @Output() onRowSelectMultipleEvent = new EventEmitter<any>();
  @Output() onSaveEvent = new EventEmitter<any>();
  @Output() onCustomButtonClicEvent = new EventEmitter<any>();
  @Output() onCustomButtonColumnClicEvent = new EventEmitter<any>();

  @Output() onSaveChildEvent = new EventEmitter<any>();

  @Output() onRefreshEvent = new EventEmitter<null>();
  // Emite un evento cuando termina de inicializar la tabla
  @Output() onAfterInitEvent = new EventEmitter<null>();
  // Emite un evento cuando un campos ha sido modificado por el usuario { field, rowData }
  @Output() onFieldChangeEvent = new EventEmitter<any>();

  @ViewChild('tc',{ static: false }) tc: Table;

  hiddenTable = false;
  showExportButton = false;

  checkBoxHeaderSelect = false;

  displayChildDataTable = false;

  virtualRows: any[] = [];

  rowSelected: any;
  rowsToUpdate: any[] = [];
  selectedColumns: any[];
  optionsSelectedColumns: any[];
  newRow: any = {};
  editRow: any = {};
  rowStyle: any;

  caption: string;
  filterOptions: any[] = [];
  filterDefaultValues: any[] = [];
  totales: any[] = [];
  displayAddDialog = false;
  displayEditDialog = false;
  lovs: any = {};

  dataTableRowsOriginal: any;

  working = true;

  childDataTable: any;
  scrollHeight: number;
  scrollHeightString: string;

  calendar = GPUtil.obtainCalendarConfig();
  changedDetected = false;

  constructor(
    private confirmationService: ConfirmationService,
    private listService: TableEditableService,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.working = true;
    this.dataTableRowsOriginal = JSON.parse(JSON.stringify(this.dataTable.rows));

    this.selectedColumns = JSON.parse(
      JSON.stringify(
        this.dataTable.cols.filter((c) => c.showInTable === true || c.expandable == true)
      )
    );
    this.optionsSelectedColumns = JSON.parse(JSON.stringify(this.selectedColumns));
    this.initLov();
    this.calcFilterOptions();
    this.working = false;
    this.scrollHeight = this.dataTable.scrollHeight;
    this.scrollHeightString = this.scrollHeight + 'px';
    this.onAfterInitEvent.emit();
  }

  getStyleCols(col) {
    return JSON.stringify(col.colsColor).replace(/['"]+/g, '');
  }

  onRowSelected(event: any) {
    this.onRowSelectEvent.emit(event.data);
    this.onRowSelectMultipleEvent.emit(this.rowSelected);
  }

  onRowUnSelected(event: any) {
    this.onRowSelectEvent.emit(event.data);
    this.onRowSelectMultipleEvent.emit(this.rowSelected);
  }

  getStyle(style: string, rowData?: any, rowStyle?: boolean, field?: string) {
    let result: any = null;

    result = style === null ? '' : JSON.parse(style);

    if (rowData && rowData.colsColor !== undefined && rowData.colsColor !== null && rowStyle) {
      result.backgroundColor = rowData.colsColor;
      result.color = 'white';
      result.borderRadius = '6px';
    }
    return result;
  }

  calcFilterOptions() {
    let rows;
    let cols;
    let filters = null;
    if (this.tc) {
      let filteredRows = this.dataTable.rows;
      for (const f of Object.keys(this.tc.filters)) {
        const colData = this.dataTable.cols.find((c) => c.field === f);

        switch (colData.filterType) {
          case 'includes':
            filteredRows = filteredRows.filter((r) =>
              (r[f] + '').includes(this.tc.filters[f].value)
            );
            break;
          case 'startsWith':
            filteredRows = filteredRows.filter((r) =>
              (r[f] + '').startsWith(this.tc.filters[f].value)
            );
            break;
          case 'endsWith':
            filteredRows = filteredRows.filter((r) =>
              (r[f] + '').endsWith(this.tc.filters[f].value)
            );
            break;
          case 'equals':
            filteredRows = filteredRows.filter((r) => r[f] + '' === this.tc.filters[f].value);
            break;
          default:
            filteredRows = filteredRows.filter((r) =>
              (r[f] + '').startsWith(this.tc.filters[f].value)
            );
            break;
        }
      }
      rows = filteredRows;

      cols = this.tc.columns;
      filters = this.tc.filters;
    } else {
      rows = this.dataTable.rows;
      cols = this.dataTable.cols;
    }

    cols.forEach((c) => {
      if (
        c.filter === 'dropdown' &&
        (filters === null || filters[c.field] === undefined) &&
        this.dataTable.filters
      ) {
        let options: SelectItem[];
        let colData: any[];

        colData = [];
        for (const row of rows) {
          if (row[c.field] !== null) {
            colData.push({ value: row[c.field] });
          }
        }

        const unique = Array.from(new Set(colData.map(({ value }) => value)));

        options = [];

        for (const val of unique.sort()) {
          const lab = this.getLabel(val, c);
          options.push({ label: lab, value: val });
        }

        options.unshift({ label: '', value: null });

        this.filterOptions[c.field] = options;
      }
      if (c.total) {
        this.totales[c.field] = 0;
        for (const row of rows) {
          let rowValue: number;
          if (row[c.field] === undefined || row[c.field] === null) {
            rowValue = 0;
          } else {
            rowValue = Number(row[c.field]);
          }
          this.totales[c.field] += rowValue;
        }
      } else {
        this.totales[c.field] = null;
      }
      if (c.field === 'prevision') {
        console.debug('total: ' + this.totales[c.field]);
      }
    });
  }

  initLov() {
    this.lovs = {};
    for (const l of this.dataTable.lovs) {
      this.lovs[l.name] = l.items;
    }
  }

  onAddRow() {
    if (this.changedDetected) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Existen cambios pendientes. Por favor guardelos o descartelos',
      });
    } else {
      this.newRow = {};
      this.displayAddDialog = true;
    }
  }
  onEditRow() {
    if (this.changedDetected) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Existen cambios sin guardar. Debe guardarlos o descartarlos refrescando la tabla',
      });
    } else if (this.tc.selection == null || this.tc.selection.length == 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar un registro primero',
      });
    } else {
      this.editRow = this.tc.selection[0];
      console.log('editRow: ' + JSON.stringify(this.editRow));
      this.displayEditDialog = true;
    }
  }

  saveNewRow() {
    if (this.newRow !== {}) {
      this.onSaveEvent.emit({ action: 'insert', rows: [this.newRow] });
      this.displayAddDialog = false;
    }
  }

  saveEditRow() {
    if (this.editRow !== {}) {
      this.tc.selection = this.editRow;
      this.markAsEdited(this.editRow);
      this.editRow = {};
      this.displayEditDialog = false;
    }
  }

  cancelNewRow() {
    this.newRow = {};
    this.displayAddDialog = false;
  }

  cancelEditRow() {
    this.editRow = {};
    this.displayEditDialog = false;
  }

  onCustomButtonClic(but: any) {
    this.onCustomButtonClicEvent.emit({ button: but, data: this.tc.selection });
  }

  onSave() {
    console.log('this.rowsToUpdate: ' + JSON.stringify(this.rowsToUpdate));
    this.confirmationService.confirm({
      message: 'Se van a guardar los cambios. Está seguro?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSaveEvent.emit({ action: 'update', rows: this.rowsToUpdate });
        this.changedDetected = false;
      },
    });
  }

  onDeleteRow() {
    if (this.changedDetected) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Existen cambios sin guardar. Debe guardarlos o descartarlos refrescando la tabla',
      });
    } else {
      if (this.tc.selection) {
        this.confirmationService.confirm({
          message: 'Se van a aplicar los cambios. Está seguro?',
          header: 'Confirmación',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.onSaveEvent.emit({ action: 'delete', rows: this.tc.selection });
          },
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Debe seleccionar un registro primero',
        });
      }
    }
  }

  getLabel(value: any, col: any) {
    let result = null;

    if (col.editType === 'dropdown' && this.lovs[col.field]) {
      result = this.lovs[col.field].find((i) => i.value === value);
    }
    if (result === null || result === undefined) {
      return value;
    } else {
      return result.label;
    }
  }

  getTableChild() {
    if (this.dataTable.tableChild !== null && this.rowSelected[this.dataTable.dataKey]) {
      this.childDataTable = null;

      this.listService.postApi(this.dataTable.tableChild, this.rowSelected).subscribe(
        (response) => {
          if (response.response.code === 0) {
            this.childDataTable = response.data;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: response.response.code + ' - ' + response.response.message,
            });
          }
        },
        (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error General',
            detail: err.message,
          });
        }
      );
    }
  }

  onRowCollapse() {
    this.childDataTable = null;
  }

  onRefresh() {
    this.onRefreshEvent.emit(null);
  }

  onSaveChild(event: any) {
    this.onSaveChildEvent.emit(event);
  }

  markAsEdited(event: Event, field?: string) {
    const index1 = this.dataTableRowsOriginal.findIndex(
      (r) => r[this.dataTable.dataKey] === event[this.dataTable.dataKey]
    );
    if (index1 > 0) {
      if (JSON.stringify(event) !== JSON.stringify(this.dataTableRowsOriginal[index1])) {
        this.changedDetected = true;
      }
    } else {
      this.changedDetected = true;
    }

    const index2 = this.rowsToUpdate.findIndex(
      (r) => r[this.dataTable.dataKey] === event[this.dataTable.dataKey]
    );
    if (index2 < 0) {
      this.rowsToUpdate.push(event);
    } else {
      this.rowsToUpdate[index2] = event;
    }
    this.calcFilterOptions();
    if (field != null) {
      this.onFieldChange(field, event);
    }
  }

  /* Orden de las columnas personalizada para poder ordenar correctamente las fechas */
  customSort(sortField, sortOrder) {
    const colData = this.dataTable.cols.find((c) => c.field === sortField);

    this.dataTable.rows.sort((data1, data2) => {
      const value1 = data1[sortField];
      const value2 = data2[sortField];
      let result = null;

      if (value1 === null && value2 !== null) {
        result = -1;
      } else if (value1 !== null && value2 === null) {
        result = 1;
      } else if (value1 === null && value2 === null) {
        result = 0;
      } else if (
        colData !== null &&
        colData !== undefined &&
        colData.type !== null &&
        colData.type === 'date'
      ) {
        const dateFormat = colData.pipe === null ? 'DD/MM/YYYY' : colData.pipe;
        const date1 = moment(value1, dateFormat);
        const date2 = moment(value2, dateFormat);

        if (moment(date2).isBefore(date1, 'day')) {
          result = 1;
        } else {
          result = -1;
        }

        return result * sortOrder;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }
      return sortOrder * result;
    });
  }

  loadDataOnScroll(event: LazyLoadEvent) {
    // console.log(JSON.stringify(event));
    this.customSort(event.sortField, event.sortOrder);

    let filteredRows = this.dataTable.rows;
    for (const f of Object.keys(event.filters)) {
      const colData = this.dataTable.cols.find((c) => c.field === f);

      switch (colData.filterType) {
        case 'includes':
          filteredRows = filteredRows.filter((r) => (r[f] + '').includes(this.tc.filters[f].value));
          break;
        case 'startsWith':
          filteredRows = filteredRows.filter((r) =>
            (r[f] + '').startsWith(this.tc.filters[f].value)
          );
          break;
        case 'endsWith':
          filteredRows = filteredRows.filter((r) => (r[f] + '').endsWith(this.tc.filters[f].value));
          break;
        case 'equals':
          filteredRows = filteredRows.filter((r) => r[f] + '' === this.tc.filters[f].value);
          break;
        default:
          filteredRows = filteredRows.filter((r) =>
            (r[f] + '').startsWith(this.tc.filters[f].value)
          );
          break;
      }
    }

    if (event.first + event.rows <= filteredRows.length) {
      this.virtualRows = filteredRows.slice(event.first, event.first + event.rows);
    } else if (event.first <= filteredRows.length) {
      this.virtualRows = filteredRows.slice(event.first);
    }

    this.cdRef.detectChanges();
  }

  onExpand(rowData: any) {
    this.rowSelected = rowData;
    this.displayChildDataTable = true;
    this.getTableChild();
  }

  detectChanges() {
    this.cdRef.detectChanges();
  }

  onCheckBoxHeaderSelect() {
    if (this.checkBoxHeaderSelect) {
      this.rowSelected = this.dataTable.rows;
    } else {
      this.rowSelected = [];
    }
    this.onRowSelectMultipleEvent.emit(this.rowSelected);
  }

  getLink(value: any, col: any) {
    this.onCustomButtonColumnClicEvent.emit({
      field: col,
      rowData: value,
    });
  }

  onFieldChange(field: string, rowData: any) {
    this.onFieldChangeEvent.emit({ field, rowData });
  }

  checkRequired(operation: string) {
    const rowData = operation === 'new' ? this.newRow : this.editRow;
    for (const col of this.dataTable.cols) {
      if (col.required && rowData[col.field] != null) {
        return true;
      }
    }
    return false;
  }

  getColFilterType(col: any) {
    let result: string;
    switch (col.filterType) {
      case 'startsWith': {
        result = 'startsWith';
        break;
      }
      case 'includes': {
        result = 'contains';
        break;
      }
      case 'equals': {
        result = 'equals';
        break;
      }
      case 'endsWith': {
        result = 'endsWith';
        break;
      }
      default: {
        result = 'startsWith';
        break;
      }
    }
    return result;
  }
}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { GfinReportService } from '../services/gfin-report.service';
import { Table } from 'primeng/table';
import { GPUtil } from 'gp-all-component';

@Component({
  selector: 'app-table-editable',
  templateUrl: './table-editable.component.html',
  styleUrls: ['./table-editable.component.scss'],
  providers: [ConfirmationService],
})
export class TableEditableComponent implements OnInit {
  @Input() dataTable: any;

  @Output() onRowSelectEvent = new EventEmitter<any>();
  @Output() onSaveEvent = new EventEmitter<any>();

  @Output() onSaveChildEvent = new EventEmitter<any>();

  @Output() onRefreshEvent = new EventEmitter<null>();

  @Output() onCheckChangeEvent = new EventEmitter<any>();

  @ViewChild('tc') private tc: Table;

  rowSelected: any;
  rowsToUpdate: any[] = [];
  selectedColumns: any[];
  optionsSelectedColumns: any[];
  newRow: any = {};

  caption: string;
  filterOptions: any[] = [];
  filterDefaultValues: any[] = [];
  totales: any[] = [];
  displayAddDialog = false;
  lovs: any = {};

  working = true;

  childDataTable: any;
  scrollHeight: number;
  scrollHeightString: string;

  calendar = GPUtil.obtainCalendarConfig();
  changedDetected = false;

  constructor(
    private confirmationService: ConfirmationService,
    private listService: GfinReportService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.working = true;
    this.selectedColumns = JSON.parse(
      JSON.stringify(
        this.dataTable.cols.filter((c) => c.showInTable === true || c.expandable === true)
      )
    );
    this.optionsSelectedColumns = JSON.parse(JSON.stringify(this.selectedColumns));
    this.initLov();
    this.calcFilterOptions();
    this.working = false;
    this.scrollHeight = this.dataTable.scrollHeight;
    this.scrollHeightString = this.scrollHeight + 'px';
  }

  onRowSelected(event: any) {
    this.onRowSelectEvent.emit(event.data);
  }

  // Enviamos las columnas seleccionadas actualmente
  checkRow(event: any) {
    this.onCheckChangeEvent.emit(this.rowSelected);
  }

  getStyle(style: string) {
    return style === null ? '' : JSON.parse(style);
  }

  calcFilterOptions() {
    let rows;
    let cols;
    let filters = null;
    if (this.tc) {
      console.log('usamos rows del tc');
      rows = this.tc.filteredValue ? this.tc.filteredValue : this.tc.value;
      cols = this.tc.columns;
      filters = this.tc.filters;
    } else {
      console.log('usamos rows del dataTable');
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
        colData.push({ value: '' });
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

  saveNewRow() {
    if (this.newRow !== {}) {
      this.onSaveEvent.emit({ action: 'insert', rows: [this.newRow] });
    }
  }

  cancelNewRow() {
    this.newRow = {};
    this.displayAddDialog = false;
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
        detail: 'Existen cambios pendientes. Por favor guardelos o descartelos',
      });
    } else {
      if (this.tc.selection) {
        this.onSaveEvent.emit({ action: 'delete', rows: this.tc.selection });
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

  getTableChild(event: any) {
    if (this.dataTable.tableChild !== null && event[this.dataTable.dataKey]) {
      this.childDataTable = null;

      this.listService.postApi(this.dataTable.tableChild, event).subscribe(
        (response) => {
          if (response.response.code === 0) {
            this.childDataTable = response.data;
            const calcHeight = this.dataTable.scrollHeight + this.childDataTable.scrollHeight + 40;
            this.scrollHeight = calcHeight;
            this.scrollHeightString = this.scrollHeight + 'px';
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
    const expandables = this.dataTable.cols.filter((c) => c.expandable === true).length * 55;
    console.log('expandables: ' + expandables);
    if (expandables > 0) {
      this.scrollHeight = this.scrollHeight + expandables;
      this.scrollHeightString = this.scrollHeight + 'px';
      console.log('scrollHeight: ' + this.scrollHeight);
    }
  }

  onRowCollapse() {
    this.childDataTable = null;
    this.scrollHeight = this.dataTable.scrollHeight;
    this.scrollHeightString = this.scrollHeight + 'px';
  }

  onRefresh() {
    this.onRefreshEvent.emit(null);
  }

  onSaveChild(event: any) {
    this.onSaveChildEvent.emit(event);
  }

  markAsEdited(event: Event) {
    this.changedDetected = true;
    const index = this.rowsToUpdate.findIndex(
      (r) => r[this.dataTable.dataKey] === event[this.dataTable.dataKey]
    );
    if (index < 0) {
      this.rowsToUpdate.push(event);
    } else {
      this.rowsToUpdate[index] = event;
    }
    console.log('index: ' + index + ', markAsEdited: ' + JSON.stringify(this.rowsToUpdate));
    this.calcFilterOptions();
  }
}

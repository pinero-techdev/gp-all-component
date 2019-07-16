import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FilterMetadata } from 'primeng/api';

class TableModel {
  columns: TableColumn[] | string[] = [];
  filterable = false;
  sortable = false;
  pagination = false;
  native: NativeOptions;
}

class NativeOptions {
  style: any;

  styleClass: string;

  tableStyle: any;

  tableStyleClass: string;

  pageLinks = 5;

  rowsPerPageOptions: any[];

  alwaysShowPaginator = true;

  paginatorPosition = 'bottom';

  paginatorDropdownAppendTo: any;

  paginatorDropdownScrollHeight = '200px';

  currentPageReportTemplate = '{currentPage} of {totalPages}';

  showCurrentPageReport: boolean;

  defaultSortOrder = 1;

  sortMode = 'single';

  resetPageOnSort = true;

  selectionMode: string;

  contextMenuSelection: any;

  contextMenuSelectionMode = 'separate';

  dataKey: string;

  metaKeySelection: boolean;

  lazy = false;

  lazyLoadOnInit = true;

  compareSelectionBy = 'deepEquals';

  csvSeparator = ',';

  exportFilename = 'download';

  filters: { [s: string]: FilterMetadata } = {};

  globalFilterFields: string[];

  filterDelay = 300;

  expandedRowKeys: { [s: string]: boolean } = {};

  editingRowKeys: { [s: string]: boolean } = {};

  rowExpandMode = 'multiple';

  scrollable: boolean;

  scrollHeight: string;

  virtualScroll: boolean;

  virtualScrollDelay = 150;

  virtualRowHeight = 28;

  frozenWidth: string;

  responsive: boolean;

  contextMenu: any;

  resizableColumns: boolean;

  columnResizeMode = 'fit';

  reorderableColumns: boolean;

  loading: boolean;

  loadingIcon = 'pi pi-spinner';

  showLoader = true;

  rowHover: boolean;

  customSort: boolean;

  autoLayout: boolean;

  exportFunction;

  stateKey: string;

  stateStorage = 'session';

  editMode = 'cell';

  rowTrackBy = (index: number, item: any) => item;
}

class TableColumn {
  key: string;
  translationKey: string;
  order: number;

  frozen = false;
  sortable = false;
  filterable = false;
}

class TableBuilder {
  model: TableModel;

  constructor(model = new TableModel()) {
    model.columns = this.toTableColumns(model.columns);
    this.model = model;
  }

  getColumns() {
    return this.model.columns;
  }

  getFrozenColumns() {
    return this.model.columns;
  }

  getColumn(index: number) {
    return this.getColumns()[index];
  }

  private toTableColumns(columns: TableColumn[] | string[]) {
    const newColumns = [];
    for (const column of columns) {
      newColumns.push(this.toTableColumn(column));
    }
    return newColumns;
  }

  private toTableColumn(column: string | TableColumn): TableColumn {
    if (typeof column === 'string') {
      return { ...new TableColumn(), key: column };
    }

    return { ...new TableColumn(), ...column };
  }
}

@Component({
  selector: 'gp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() data: any[];

  @Input()
  set model(model: TableModel) {
    this.builder = new TableBuilder(model);
  }

  builder = new TableBuilder();
}

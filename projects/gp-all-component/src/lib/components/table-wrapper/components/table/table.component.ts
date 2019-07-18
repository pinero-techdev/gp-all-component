import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ColumnTemplateDirective } from './column-template.directive';
import { FilterMetadata } from 'primeng/api';
import { isNullOrUndefined } from 'util';

export class NativeOptions {
  style: any;

  styleClass: string;

  tableStyle: any;

  tableStyleClass: string;

  pageLinks = 5;

  rowsPerPageOptions: any[];

  paginator = false;

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

export class TableColumn {
  key: string;
  translationKey: string;
  order: number;

  frozen;
  sortable;
  filterable;
}

export class TableModel {
  columns: TableColumn[] | string[] = [];
  customColumns: { [key: string]: number };
  filterable = false;
  sortable = false;
  pagination = false;
  native = new NativeOptions();
}

class TableBuilder {
  private model: TableModel;

  private customColumns: QueryList<ColumnTemplateDirective>;

  // Once we receive a model, we parse it
  constructor(model = new TableModel(), customColumns?: QueryList<ColumnTemplateDirective>) {
    // 1. Parsing model to standard model
    this.model = { ...new TableModel(), ...model };

    // 2. Converting all the columns to standard format
    this.model.columns = this.toTableColumns(this.model.columns);

    // 3. Declaring all the custom columns
    this.model.customColumns = isNullOrUndefined(this.customColumns)
      ? []
      : this.parseCustomColumns(customColumns);

    this.customColumns = customColumns;
  }

  get native() {
    return this.model.native;
  }

  isFilterable(column?: TableColumn) {
    return isNullOrUndefined(column)
      ? this.model.filterable
      : (isNullOrUndefined(column.filterable) || column.filterable) && this.model.filterable;
  }

  isSortable(column?: TableColumn) {
    return isNullOrUndefined(column)
      ? this.model.sortable
      : (isNullOrUndefined(column.sortable) || column.sortable) && this.model.sortable;
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

  isCustomColumn(key: string) {
    return !isNullOrUndefined(this.model.customColumns[key]);
  }

  getCustomColumn(key: string) {
    return this.customColumns.toArray()[this.model.customColumns[key]].template;
  }

  /**
   * Batch convert a list of columns to default TableColumn format
   * @param columns The column list to be converted
   */
  private toTableColumns(columns: TableColumn[] | string[]) {
    const newColumns = [];
    for (const column of columns) {
      newColumns.push(this.toTableColumn(column));
    }
    return newColumns;
  }

  /**
   * Convert column to default TableColumn format
   * @param column The column to be converted
   */
  private toTableColumn(column: string | TableColumn): TableColumn {
    if (typeof column === 'string') {
      return { ...new TableColumn(), key: column };
    }

    return { ...new TableColumn(), ...column };
  }

  // Create the custom columns model from the received elements
  private parseCustomColumns(columns: QueryList<ColumnTemplateDirective>) {
    const columnsList = {};
    columns.forEach((column, index) => (columnsList[column.getKey()] = index));
    return columnsList;
  }
}

@Component({
  selector: 'gp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterContentInit {
  @Input()
  data: any[];

  @Input()
  // @Watch(model => this.builder = buildModel(model))
  model: TableModel;

  @Output()
  filter = new EventEmitter<any>();

  @ContentChildren(ColumnTemplateDirective)
  customColumns: QueryList<ColumnTemplateDirective>;

  builder: TableBuilder;

  ngAfterContentInit() {
    this.builder = new TableBuilder(this.model, this.customColumns);
  }

  onFilter(event: any, column: TableColumn) {
    this.filter.emit({ column: column.key, value: event.srcElement.value });
  }
}

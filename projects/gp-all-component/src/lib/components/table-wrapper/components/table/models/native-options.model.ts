import { FilterMetadata } from 'primeng/api';

export class NativeOptions {
  style?: any;

  styleClass?: string;

  tableStyle?: any;

  tableStyleClass?: string;

  pageLinks = 5;

  rowsPerPageOptions?: any[];

  paginator = false;

  alwaysShowPaginator = true;

  paginatorPosition = 'bottom';

  paginatorDropdownAppendTo?: any;

  paginatorDropdownScrollHeight = '200px';

  currentPageReportTemplate = '{currentPage} of {totalPages}';

  showCurrentPageReport?: boolean;

  defaultSortOrder = 1;

  sortMode = 'single';

  resetPageOnSort = true;

  selectionMode?: string;

  contextMenuSelection?: any;

  contextMenuSelectionMode = 'separate';

  dataKey?: string;

  metaKeySelection?: boolean;

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

  scrollable?: boolean;

  scrollHeight?: string;

  virtualScroll?: boolean;

  virtualScrollDelay = 150;

  virtualRowHeight = 28;

  frozenWidth?: string;

  responsive?: boolean;

  contextMenu?: any;

  resizableColumns?: boolean;

  columnResizeMode = 'fit';

  reorderableColumns?: boolean;

  loadingIcon = 'pi pi-spinner';

  showLoader = true;

  rowHover?: boolean;

  customSort?: boolean;

  autoLayout?: boolean;

  exportFunction;

  stateKey?: string;

  stateStorage = 'session';

  editMode = 'cell';

  rowTrackBy = (index: number, item: any) => item;
}

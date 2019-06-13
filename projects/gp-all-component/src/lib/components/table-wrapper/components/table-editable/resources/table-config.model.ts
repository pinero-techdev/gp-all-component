import { SortDirection } from './sort-direction.enum';
import { SelectionType } from './selection-type.enum';
import { TableColumnMetadata } from './table-column-metadata.model';

export class TableConfig {
  title = '';
  sortable = true;
  filterable = true;
  actionsColumn = true;
  canAdd = true;
  canEdit = true;
  canDelete = true;
  requestItemOnEdit = true;
  selectable: SelectionType = SelectionType.SINGLE;
  itemsPerPage = 10;
  itemsPerPageOptions: number[] = [10, 20, 50];
  currentPage = 0;
  sortField;
  sortDirection: SortDirection = SortDirection.ASC;
  exportable = true;
  exportFilename = 'export';
  // check if row can be selected
  selectableFn: (item: any, index?: number, array?: any[]) => boolean;
  compareFn: (item1, item2) => boolean; // To compare selected rows
  validateFn: (item: any, columns: TableColumnMetadata[]) => boolean; // custom form validation
  beforeSaveFn: (original: any, modified: any) => any; // To modify item before save it
  beforeCreateFn: (item: any) => any; // To modify item before save it
  // Enable or disable row edition
  editableFn: (item: any, columns: TableColumnMetadata[]) => boolean;
  // Enable or disable row deletion
  deletableFn: (item: any, columns: TableColumnMetadata[]) => boolean;
}

import { SortDirection } from './sort-direction.enum';
import { SelectionType } from './selection-type.enum';
import { TableColumnMetadata } from './table-column-metadata.model';

export class TableConfig {
  title: string = '';
  sortable: boolean = true;
  filterable: boolean = true;
  actionsColumn: boolean = true;
  canAdd: boolean = true;
  canEdit: boolean = true;
  canDelete: boolean = true;
  requestItemOnEdit: boolean = true;
  selectable: SelectionType = SelectionType.SINGLE;
  itemsPerPage: number = 10;
  itemsPerPageOptions: number[] = [10, 20, 50];
  currentPage: number = 0;
  sortField: string;
  sortDirection: SortDirection = SortDirection.ASC;
  exportable: boolean = true;
  exportFilename: string = 'export';
  selectableFn: (item: any, index?: number, array?: any[]) => boolean; // check if row can be selected
  compareFn: (item1, item2) => boolean; // To compare selected rows
  validateFn: (item: any, columns: TableColumnMetadata[]) => boolean; // custom form validation
  beforeSaveFn: (original: any, modified: any) => any; // To modify item before save it
  beforeCreateFn: (item: any) => any; // To modify item before save it
  editableFn: (item: any, columns: TableColumnMetadata[]) => boolean; // Enable or disable row edition
  deletableFn: (item: any, columns: TableColumnMetadata[]) => boolean; // Enable or disable row deletion
}

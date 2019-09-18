import { TableColumn } from './table-column.model';
import { NativeOptions } from './native-options.model';
import { SelectionMode } from './selection-mode.type';

export class TableModel {
  title?: string;
  columns: TableColumn[] | string[] = [];
  globalFilter? = false;
  editable? = false;
  filterable? = false;
  sortable? = false;
  selectable?: SelectionMode;
  exportFilename = 'summary-csv';
  csvSeparator = ';';
  lazy? = true;
  pagination = false;
  native? = new NativeOptions();
}

import { TableColumn } from './table-column.model';
import { NativeOptions } from './native-options.model';
import { SelectionMode } from './selection-mode.type';
import { AssignedObject } from '../../../../../shared/assigned-object/assigned-object.class';

export class TableModel extends AssignedObject {
  title?: string;
  columns: TableColumn[] | string[] = [];
  globalFilter? = false;
  editable? = false;
  filterable? = false;
  sortable? = false;
  selectable: SelectionMode = 'single';
  exportFilename = 'summary-csv';
  csvSeparator = ';';
  lazy? = false;
  pagination = false;
  native? = new NativeOptions();
}

import { TableColumn } from './table-column.model';
import { NativeOptions } from './native-options.model';

export class TableModel {
  title?: string;
  columns: TableColumn[] | string[] = [];
  customColumns?: { [key: string]: number };
  hasGlobalFilter = false;
  filterable = false;
  sortable = false;
  lazy = true;
  pagination?: boolean;
  native = new NativeOptions();
}

import { TableModel } from './table.model';
import { QueryList } from '@angular/core';
import { ColumnTemplateDirective } from '../directives/column-template.directive';
import { EditableColumnTemplateDirective } from '../directives/editable-column-template.directive';
import { TableColumn } from './table-column.model';

export class CoreTableModel extends TableModel {
  columns: TableColumn[] = [];

  enableFilterRow? = false;

  customColumns?: { [key: string]: number };
  editableColumns?: { [key: string]: number };

  customColumnsList: QueryList<ColumnTemplateDirective>;
  editableColumnsList: QueryList<EditableColumnTemplateDirective>;
}

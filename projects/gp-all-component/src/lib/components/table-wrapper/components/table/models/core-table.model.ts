import { TableModel } from './table.model';
import { QueryList } from '@angular/core';
import { ColumnTemplateDirective } from '../directives/column-template.directive';
import { EditableColumnTemplateDirective } from '../directives/editable-column-template.directive';

export class CoreTableModel extends TableModel {
  enableFilterRow? = false;

  customColumns?: { [key: string]: number };
  editableColumns?: { [key: string]: number };

  customColumnsList: QueryList<ColumnTemplateDirective>;
  editableColumnsList: QueryList<EditableColumnTemplateDirective>;
}

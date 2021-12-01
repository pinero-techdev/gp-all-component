import { TableEditableSelectItem } from './data-table-editable-SelectItem.model';
export class TableEditableLovs {
  name: string; // Debe coincidir con col.field y debe ser col.editType = 'dropdown'
  items: TableEditableSelectItem[]; // Lista de valores (label, value)
}

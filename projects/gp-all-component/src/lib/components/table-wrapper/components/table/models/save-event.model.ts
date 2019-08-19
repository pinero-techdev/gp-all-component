import { TableColumn } from './table-column.model';

export class SaveEvent {
  row: TableColumn;
  index: number;
  save: () => void;
  error: (error: string) => void;
}

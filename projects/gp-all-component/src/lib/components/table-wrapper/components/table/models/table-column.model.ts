export class TableColumn {
  key: string;
  name: string;
  order: number;

  frozen: boolean;
  sortable: boolean;
  filterable: boolean;
  defaultSort: boolean;
}

export class TableColumn {
  field: any | any[];
  header: string;
  name: string;
  order: number;
  frozen: boolean;
  sortable: boolean;
  filterable: boolean;
  filterMode = 'contains';
  defaultSort: boolean;
}

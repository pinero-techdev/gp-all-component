import { AssignedObject } from '../../../../../shared/assigned-object/assigned-object.class';

export class TableColumn extends AssignedObject {
  field: any | any[];
  header: string;
  name: string;
  order: number;
  frozen: boolean;
  sortable: boolean;
  filterable: boolean;
  defaultSort: boolean;
}

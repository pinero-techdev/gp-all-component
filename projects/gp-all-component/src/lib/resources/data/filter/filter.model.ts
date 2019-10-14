import { FilterOperationType } from './filter-operation-type.enum';
import { AssignedObject } from '../../../shared/assigned-object/assigned-object.class';

export class Filter extends AssignedObject {
  op: FilterOperationType = null;
  field: string = null;
  values: string[] = null;
}

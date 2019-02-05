import {FilterOperationType} from './filter-operation-type.enum';

export class Filter {
    constructor(public op: FilterOperationType, public field: string, public values: string[]) {
    }
}

import {DataTableFilterType} from './data-table-filter-type.enum';

export class DataTableFilter {
    field: string;
    value: string;
    matchMode: DataTableFilterType;
}

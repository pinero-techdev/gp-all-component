import {SortDirection} from "./sort-direction.enum";
import {SelectionType} from "./selection-type.enum";
import {TableColumnMetadata} from "./table-column-metadata.model";

export class TableConfig {
    title: string = '';
    sortable: boolean = true;
    filterable: boolean = true;
    actionsColumn: boolean = true;
    editable: boolean = true;
    selectable: SelectionType = SelectionType.SINGLE;
    selectableFn: (item: any, index?: number, array?: any[]) => boolean; // check if row can be selected
    compareFn: (item1, item2) => boolean; // compare selected rows
    itemsPerPage: number = 10;
    itemsPerPageOptions: number[] = [10, 20, 50];
    currentPage: number = 0;
    sortField: string;
    sortDirection: SortDirection = SortDirection.ASC;
    exportable: boolean = true;
    exportFilename: string = 'export';
    validateFn: (item: any, columns: TableColumnMetadata[]) => boolean; // custom form validation
    editableFn: (item: any, columns: TableColumnMetadata[]) => boolean;
}
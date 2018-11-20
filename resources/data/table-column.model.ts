export class TableColumn {
    name: string;
    label: string;
    sortable: boolean = true;
    filterable: boolean = true;
    filter: any;
    visible: boolean = true;
    editable: boolean = true;
    required: boolean = false;
    order: number = -1;
    validateFn: (value:any, item: any, column: TableColumn) => boolean;
    editabeFn: (value:any, item: any, column: TableColumn) => boolean;
}
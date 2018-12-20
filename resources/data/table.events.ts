import {TableColumnMetadata} from "./table-column-metadata.model";

export interface TableFieldEvent {
    value: any;
    column: TableColumnMetadata;
}

export interface TableRowEvent {
    item: any;
    columns: TableColumnMetadata[];
}

export interface DataChangeEvent<T> {
    data: T;
    changeValue: (data: T) => void;
}

export interface ItemChangeEvent {
    original: any;
    modified: any;
    success: (item: any) => void;
}
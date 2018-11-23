import {TranslationInfo} from "../../services/table.service";
import {InputType} from "./selection-type.enum";

export class TableColumnMetadata {
    name: string;
    label: string;
    type: InputType;
    sortable: boolean = true;
    filterable: boolean = true;
    filter: any;
    visible: boolean = true;
    editable: boolean = true;
    required: boolean = false;
    order: number = -1;
    translationInfo: TranslationInfo;
    max: number;
    min: number;
    maxValue: number;
    minValie: number;
    uppercase: boolean;
    trim: boolean;
    noSpace: boolean;
    rows: number;
    validateFn: (value:any, item: any, column: TableColumnMetadata) => boolean;
    editabeFn: (value:any, item: any, column: TableColumnMetadata) => boolean;
}
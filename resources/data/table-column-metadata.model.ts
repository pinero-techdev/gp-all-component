import {TranslationInfo} from "../../services/table.service";
import {InputType} from "./field-type.enum";
import {Observable} from "rxjs";

export class TableColumnMetadata {
    name: string;
    label: string;
    type: InputType;
    sortable: boolean = true;
    filterable: boolean = true;
    filter: any;
    visible: boolean = true;
    editable: boolean = true; // TODO es necesario?
    required: boolean = false;
    order: number = -1;
    translationInfo: TranslationInfo;
    isId: boolean;
    optionsLabels: string[] = ['descripcion'];
    optionsValue: string;
    referencedTable: string; // informa del endpoint
    fieldToOrderBy: string[]; // campo que se envía como parámetro para ordenar el listado de opciones
    retrieveMetadata: boolean;
    optionsOrdered : boolean;
    max: number;
    min: number;
    maxValue: number;
    minValie: number;
    uppercase: boolean;
    trim: boolean;
    noSpace: boolean;
    rows: number;
    relatedField: string;
    referencedRelatedField: string;
    validateFn: (value:any, item: any, column: TableColumnMetadata) => boolean; // custom form validation
    editableFn: (value:any, item: any, column: TableColumnMetadata) => boolean; // Enable or disable input edition
    setOptionsFn: (options: any[], item: any, column: TableColumnMetadata) => any[] | Observable<any[]>; // Change
    beforeChangeFn: (original: any, modified: any, column: TableColumnMetadata) => any; // To modify value before change it

}
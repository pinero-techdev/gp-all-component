import {TranslationInfo} from "../../services/table.service";
import {InputType} from "./field-type.enum";
import {Observable} from "rxjs";
import {RelatedField} from "./related-field.model";

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
    messages: string[] = [];
    isId: boolean;
    allowAscii: boolean = true;
    optionsLabels: string[] = ['descripcion'];
    optionsValue: string;
    referencedTable: string; // informa del endpoint
    fieldToOrderBy: string[]; // campo que se envía como parámetro para ordenar el listado de opciones
    retrieveMetadata: boolean;
    optionsOrdered : boolean;
    maxLength: number;
    minLength: number;
    maxValue: number;
    minValue: number;
    uppercase: boolean = false;
    trim: boolean = false;
    noSpace: boolean = false;
    rows: number = 5;
    relatedFields: RelatedField[] = [];
    referenceDescription: string;
    // relatedField: string;
    // referencedRelatedField: string;
    validateFn: (value:any, item: any, column: TableColumnMetadata) => boolean; // custom input validation
    editableFn: (value:any, item: any, column: TableColumnMetadata) => boolean; // Enable or disable input edition
    setOptionsFn: (options: any[], item: any, column: TableColumnMetadata) => any[] | Observable<any[]>; // Change dropdown options
    beforeChangeFn: (original: any, modified: any, column: TableColumnMetadata) => any; // To modify value before change it

}

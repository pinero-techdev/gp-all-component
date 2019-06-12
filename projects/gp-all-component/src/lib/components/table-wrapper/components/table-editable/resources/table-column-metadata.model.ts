import { Observable } from 'rxjs/Observable';
import { GpFormFieldType } from './../../../../form-wrapper/resources/form-field-type.enum';
import { RelatedField } from './../../../../../resources/data/data-table/filter/related-field.class';
import { TranslationInfo } from './../../../../../resources/data/translation-info.model';

export class TableColumnMetadata {
  allowAscii: boolean = true;
  checkedValue: string;
  editable: boolean = true;
  fieldToOrderBy: string[]; // campo que se envía como parámetro para ordenar el listado de opciones
  filter: any;
  filterable: boolean = true;
  hideInAddOperation: boolean = false;
  isId: boolean;
  label: string;
  lengthInTable: number = -1;
  maxLength: number;
  maxValue: number;
  messages: string[] = [];
  minLength: number;
  minValue: number;
  name: string;
  noSpace: boolean = false;
  options: any[] = [];
  optionsLabels: string[] = ['descripcion'];
  optionsOrdered: boolean;
  optionsValue: string;
  order: number = -1;
  referenceDescription: string;
  referencedTable: string; // informa del endpoint
  relatedFields: RelatedField[] = [];
  required: boolean = false;
  retrieveMetadata: boolean;
  rows: number = 5;
  sortable: boolean = true;
  translationInfo: TranslationInfo;
  trim: boolean = false;
  type: GpFormFieldType;
  uncheckedValue: string;
  uppercase: boolean = false;
  visible: boolean = true;
  // relatedField: string;
  // referencedRelatedField: string;
  validateFn: (value: any, item: any, column: TableColumnMetadata) => boolean; // custom input validation
  editableFn: (value: any, item: any, column: TableColumnMetadata) => boolean; // Enable or disable input edition
  setOptionsFn: (
    options: any[],
    item: any,
    column: TableColumnMetadata
  ) => any[] | Observable<any[]>; // Change dropdown options
  beforeChangeFn: (original: any, modified: any, column: TableColumnMetadata) => any; // To modify value before change it
}

import { Observable } from 'rxjs';
import { RelatedField } from '../../../../../resources/data/data-table/filter/related-field.class';
import { TranslationInfo } from '../../../../../resources/data/translation-info.model';
import { GpFormFieldType } from '../../../../form-wrapper/resources/form-field-type.enum';

export class TableColumnMetadata {
  allowAscii = true;
  checkedValue: string;
  editable = true;
  fieldToOrderBy: string[]; // campo que se envía como parámetro para ordenar el listado de opciones
  filter: any;
  filterable = true;
  hideInAddOperation = false;
  isId: boolean;
  label: string;
  lengthInTable = -1;
  maxLength: number;
  maxValue: number;
  messages: string[] = [];
  minLength: number;
  minValue: number;
  name: string;
  noSpace = false;
  options: any[] = [];
  optionsLabels: string[] = [];
  optionsOrdered: boolean;
  optionsValue: string;
  order = -1;
  referenceDescription: string;
  referencedTable: string; // informa del endpoint
  relatedFields: RelatedField[] = [];
  required = false;
  retrieveMetadata: boolean;
  rows = 5;
  sortable = true;
  translationInfo: TranslationInfo;
  trim = false;
  type: GpFormFieldType;
  uncheckedValue: string;
  uppercase = false;
  visible = true;
  // custom input validation
  validateFn: (value: any, item: any, column: TableColumnMetadata) => boolean;
  // Enable or disable input edition
  editableFn: (value: any, item: any, column: TableColumnMetadata) => boolean;
  setOptionsFn: (
    options: any[],
    item: any,
    column: TableColumnMetadata
  ) => any[] | Observable<any[]>; // Change dropdown options
  // To modify value before change it
  beforeChangeFn: (original: any, modified: any, column: TableColumnMetadata) => any;
}

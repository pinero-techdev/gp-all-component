import {Filter} from '../../filter/filter.model';
import {TranslationInfo} from '../../translation-info.model';
import {DataTableMetaDataFieldDisplayInfoOption} from './data-table-meta-data-field-display-info-option.model';

export class DataTableMetaDataFieldDisplayInfo {
  fieldLabel: string;
  order: number;
  displayType: string;
  checkedValue: string;
  uncheckedValue: string;
  options: DataTableMetaDataFieldDisplayInfoOption[];
  referencedTable: string;
  referencedField: string;
  fieldToOrderBy: string;
  filters: Filter[];
  rowsTextArea: number;
  fieldDescriptions: string[];
  textProperties: string[];
  relatedField: string;
  relatedFieldExt: string;
  translationInfo: TranslationInfo;

  constructor(fieldLabel: string, order: number, displayType: string, checkedValue: string, uncheckedValue: string,
              options: DataTableMetaDataFieldDisplayInfoOption[], referencedTable: string, referencedField: string,
              fieldToOrderBy: string, filters: Filter[], rowsTextArea: number, fieldDescriptions: string[],
              textProperties: string[], relatedField: string, translationInfo: TranslationInfo) {
    this.fieldLabel = fieldLabel;
    this.order = order;
    this.displayType = displayType;
    this.checkedValue = checkedValue;
    this.uncheckedValue = uncheckedValue;
    this.options = options;
    this.referencedTable = referencedTable;
    this.referencedField = referencedField;
    this.fieldToOrderBy = fieldToOrderBy;
    this.filters = filters;
    this.rowsTextArea = rowsTextArea;
    this.fieldDescriptions = fieldDescriptions;
    this.textProperties = textProperties;
    this.relatedField = relatedField;
    this.translationInfo = translationInfo;
  }
}

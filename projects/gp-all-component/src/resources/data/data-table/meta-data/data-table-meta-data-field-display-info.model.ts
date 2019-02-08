import {Filter} from '../../filter/filter.model';
import {TranslationInfo} from '../../translation-info.model';
import {DataTableMetaDataFieldDisplayInfoOption} from './data-table-meta-data-field-display-info-option.model';
import {DataTableMetaDataFieldDisplayInfoRelatedField} from './data-table-meta-data-field-display-info-related-field.model';

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
  relatedFields: DataTableMetaDataFieldDisplayInfoRelatedField[];
  translationInfo: TranslationInfo;

  constructor(fieldLabel: string, order: number, displayType: string, checkedValue: string, uncheckedValue: string,
              options: DataTableMetaDataFieldDisplayInfoOption[], referencedTable: string, referencedField: string,
              fieldToOrderBy: string, filters: Filter[], rowsTextArea: number, fieldDescriptions: string[],
              textProperties: string[], relatedFields: DataTableMetaDataFieldDisplayInfoRelatedField[],
              translationInfo: TranslationInfo) {
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
    this.relatedFields = relatedFields;
    this.translationInfo = translationInfo;
  }
}

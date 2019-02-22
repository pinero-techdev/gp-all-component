import {DataTableMetaDataFieldDisplayInfo} from './data-table-meta-data-field-display-info.model';
import {DataTableMetaDataFieldRestriction} from './data-table-meta-data-field-restriction.model';

export class DataTableMetaDataField {
  fieldMaxLength: number;
  fieldName: string;
  fieldType: string;
  id: boolean;
  notNull: boolean;
  readOnly: boolean;
  allowAscii: boolean;
  hideInAddOperation: boolean;
  hideInEditOperation: boolean;
  lengthInTable: number;
  restrictions: DataTableMetaDataFieldRestriction[];
  displayInfo: DataTableMetaDataFieldDisplayInfo;

  constructor(fieldMaxLength: number, fieldName: string, fieldType: string, id: boolean, notNull: boolean, readOnly: boolean,
              allowAscii: boolean, lengthInTable: number, restrictions: DataTableMetaDataFieldRestriction[], displayInfo: DataTableMetaDataFieldDisplayInfo) {
    this.fieldMaxLength = fieldMaxLength;
    this.fieldName = fieldName;
    this.fieldType = fieldType;
    this.id = id;
    this.notNull = notNull;
    this.readOnly = readOnly;
    this.allowAscii = allowAscii;
    this.lengthInTable = lengthInTable;
    this.restrictions = restrictions;
    this.displayInfo = displayInfo;
  }
}

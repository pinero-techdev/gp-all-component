import { AssignedObject } from '../../../../shared/assigned-object/assigned-object.class';
import { Filter } from '../../filter/filter.model';
import { TranslationInfo } from '../../translation-info.model';
import { GpFormField } from '../../../../components/form-wrapper/resources/form-field.model';
import { GPUtil } from '../../../../services/core/gp-util.service';

export enum RestrictionType {
  NOT_NULL = 'NOT_NULL',
  MAX_LENGTH = 'MAX_LENGTH',
  MIN_LENGTH = 'MIN_LENGTH',
  MAX_VALUE = 'MAX_VALUE',
  MIN_VALUE = 'MIN_VALUE',
  LIST_ALLOWED_VALUES = 'LIST_ALLOWED_VALUES',
}
export enum DisplayType {
  CALENDAR = 'CALENDAR',
  CHECKBOX = 'CHECKBOX',
  DROPDOWN = 'DROPDOWN',
  DROPDOWN_RELATED = 'DROPDOWN_RELATED',
  FILE = 'FILE',
  HOUR_MINUTE = 'HOUR_MINUTE',
  IMG = 'IMG',
  NULLABLE_CHECKBOX = 'NULLABLE_CHECKBOX',
  NUMBER = 'NUMBER',
  SWITCH = 'SWITCH',
  TEXT = 'TEXT',
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
  TEXT_AREA = 'TEXT_AREA',
  WYSIWYG = 'WYSIWYG',
}

export enum FieldType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  ATTACHMENT = 'ATTACHMENT',
}

export enum TextPropertyType {
  UPPERCASE = 'UPPERCASE',
  TRIM = 'TRIM',
  NO_SPACE = 'NO_SPACE',
}

export interface IModifiedRelatedField {
  [key: string]: any;
}

export class RelatedField extends AssignedObject {
  field: string = null;
  fieldExternal: string = null;
  fieldDescription: string = null;
  // This property 'value' is customized for table-editable.
  // The API Service isn't returning this property. It's for convenience.
  value?: any;
}

export class FieldOption extends AssignedObject {
  value: string = null;
  description: string = null;
}

export class FieldDisplayInfo extends AssignedObject {
  // tslint:disable
  private _relatedFields: RelatedField[];
  private _options: FieldOption[];
  private _filters: Filter[];
  private _checkedValue: any;
  private _uncheckedValue: any;
  // tslint:enable

  displayType: DisplayType;
  fieldDescriptions: string[];
  fieldLabel: string;
  fieldToOrderBy: string[];
  order: number;
  referencedField: string;
  referencedTable: string;
  referencedMethod: string;
  rowsTextArea: number;
  textProperties: TextPropertyType[];
  translationInfo: TranslationInfo;

  get options() {
    return this._options;
  }

  set options(value: FieldOption[]) {
    this._options = null;
    if (value) {
      this._options = value.map((f) => new FieldOption().assign(f));
    }
  }

  get relatedFields() {
    return this._relatedFields;
  }

  set relatedFields(value: RelatedField[]) {
    this._relatedFields = null;
    if (value) {
      this._relatedFields = value.map((f) => new RelatedField().assign(f));
    }
  }

  get filters() {
    return this._filters;
  }

  set filters(value: Filter[]) {
    this._filters = null;
    if (value) {
      this._filters = value.map((f) => new Filter().assign(f));
    }
  }

  set checkedValue(value: any) {
    this._checkedValue = value;
  }

  get checkedValue() {
    return GPUtil.isUndefined(this._checkedValue) ? true : this._checkedValue;
  }

  set uncheckedValue(value: any) {
    this._uncheckedValue = value;
  }

  get uncheckedValue() {
    return GPUtil.isUndefined(this._uncheckedValue) ? false : this._uncheckedValue;
  }

  getRelatedName(): string[] {
    let names: string[] = [];
    if (this.relatedFields) {
      names = this.relatedFields.map((rf) => rf.field);
    }
    return names;
  }
}

export class FieldRestriction extends AssignedObject {
  restrictionType: RestrictionType;
  minLength: number;
  maxLength: number;
  maxValue?: number;
  minValue?: number;
}

export class Field extends AssignedObject {
  // tslint:disable
  private _displayInfo: FieldDisplayInfo;
  private _restrictions: FieldRestriction[];
  // tslint:enable

  allowAscii = true;
  detailEntity?: string = null;
  detailRelationField?: string = null;
  fieldMaxLength: number;
  fieldName: string = null;
  fieldType: FieldType = null;
  hideInAddOperation = false;
  hideInEditOperation = false;
  id: boolean;
  lengthInTable: number;
  notNull: boolean;
  readOnly: boolean;
  referenceDescription: string;

  isVisible(op: 'add' | 'edit' = null): boolean {
    let isVisible = !!this.displayInfo && !!this.displayInfo.displayType;
    if (op === 'add') {
      isVisible = isVisible && !this.hideInAddOperation;
    } else if (op === 'edit') {
      isVisible = isVisible && !this.hideInEditOperation;
    }
    return isVisible;
  }

  set displayInfo(value: FieldDisplayInfo) {
    this._displayInfo = null;
    if (value) {
      this._displayInfo = new FieldDisplayInfo().assign(value, true);
    }
  }

  get displayInfo() {
    return this._displayInfo;
  }

  set restrictions(value: FieldRestriction[]) {
    this._restrictions = null;
    if (value) {
      this._restrictions = value.map((v) => new FieldRestriction().assign(v, true));
    }
  }

  get restrictions() {
    return this._restrictions;
  }
}

export interface IModifiedField {
  fieldName: string;
  label?: string;
  value: any;
  field?: GpFormField;
}

export class FieldMetadata extends AssignedObject {
  // tslint:disable-next-line
  private _fields: Field[];

  tableLabel: string;

  set fields(value: Field[]) {
    this._fields = null;
    if (value) {
      this._fields = value.map((item) => new Field().assign(item, true));
    }
  }

  get fields() {
    return this._fields;
  }

  /**
   * The method returns the name of the main id in the entity (id, code, codigo...)
   */
  getIdName(): string {
    let idName = null;
    if (this.fields) {
      const field = this.fields.find((f: Field) => f.id);
      idName = field ? field.fieldName : null;
    }
    return idName;
  }

  /**
   * Gathering related fields, used when a field is change (onChangeEvent function).
   * @param data
   */
  getRelatedFields(data: any): IModifiedRelatedField {
    const relatedFields = {};
    this.fields
      .filter((field: Field) => this.hasRelatedFields(field))
      .forEach((field: Field) => {
        relatedFields[field.fieldName] = {};
        field.displayInfo.relatedFields.forEach(
          (related: RelatedField) =>
            (relatedFields[field.fieldName][related.field] = data[related.field])
        );
      });
    return relatedFields;
  }

  /**
   * The method returns the name of the related fields
   */
  getRelatedFieldNames(): string[] {
    return this.fields.reduce(
      (accumulator: string[], currentValue: Field) => [
        ...accumulator,
        ...currentValue.displayInfo.getRelatedName(),
      ],
      []
    );
  }

  /**
   * Return if the field is a related with another field .
   * @param field
   */
  private hasRelatedFields(field: Field): boolean {
    return field.displayInfo.relatedFields && field.displayInfo.relatedFields.length > 0;
  }
}

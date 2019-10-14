import {
  Field,
  FieldDisplayInfo,
  FieldMetadata,
  FieldOption,
} from '../../../../resources/data/data-table/meta-data/meta-data-field.model';
import { GpFormField } from '../../../../components/form-wrapper/resources/form-field.model';
import { GpFormControl } from './../../../../components/form-wrapper/resources/form-control.model';
import { TranslationInfo } from './../../../../resources/data/translation-info.model';
import { RelatedField } from '../../../../resources/data/data-table/filter/related-field.class';

const options = [
  new FieldOption(),
  new FieldOption(),
  new FieldOption(),
  new FieldOption(),
  new FieldOption(),
  new FieldOption(),
  new FieldOption(),
  new FieldOption(),
  new FieldOption(),
];

options[0].value = '1';
options[0].description = 'Frederik';
options[1].value = '2';
options[1].description = 'Mariana';
options[2].value = '3';
options[2].description = 'Napoleon';
options[3].value = '4';
options[3].description = 'Frederik II';
options[4].value = '5';
options[4].description = 'Mariana II';
options[5].value = '6';
options[5].description = 'Napoleon II';
options[6].value = '7';
options[6].description = 'Frederik III';
options[7].value = '8';
options[7].description = 'Mariana III';
options[8].value = '9';
options[8].description = 'Napoleon III';

const rField1 = {
  field: 'lang',
  fieldExternal: 'langCodi',
  fieldDescription: 'Language',
  value: null,
} as RelatedField;

const rField2 = {
  field: 'name',
  fieldExternal: null,
  fieldDescription: 'Name',
  value: null,
} as RelatedField;

const rField3 = {
  field: 'surname',
  fieldExternal: null,
  fieldDescription: 'Surname',
  value: null,
} as RelatedField;

const relatedFields = [rField1, rField2, rField3];

const translationInfo = {
  allowEdition: false,
  description: 'Description',
  field: 'cansCodi',
  keyFields: [],
  orderByLangCod: false,
  scheme: '',
  table: '',
} as TranslationInfo;

const displayInfo = new FieldDisplayInfo().assign(
  {
    fieldLabel: 'naciCodi',
    order: 1,
    displayType: 'TEXT',
    checkedValue: null,
    uncheckedValue: null,
    options,
    referencedTable: 'CrmNaci',
    referencedField: 'naciDesc',
    fieldToOrderBy: 'naciDesc',
    filters: [],
    rowsTextArea: 1,
    fieldDescriptions: ['langCodi', 'naciDesc'],
    textProperties: ['height', 'red'],
    relatedFields,
    translationInfo,
  },
  true
);
const dataTableObject = {
  fieldMaxLength: 100,
  fieldName: 'cansCodi',
  fieldType: 'TEXT',
  id: true,
  notNull: true,
  readOnly: false,
  allowAscii: false,
  hideInAddOperation: false,
  hideInEditOperation: false,
  lengthInTable: 30,
  restrictions: [],
  displayInfo,
};
const metadata = new FieldMetadata().assign({
  tableLabel: 'tablelabel',
  fields: [new Field().assign(dataTableObject)],
});

export const FormFieldMock = new GpFormField().assign({
  formControl: new GpFormControl(),
  fieldMetadata: metadata,
  formFieldType: 'gp-form-text-field',
  validField: true,
  fieldMsgs: null,
  header: 'Codigo Subcanal',
  field: 'cansCodi',
});

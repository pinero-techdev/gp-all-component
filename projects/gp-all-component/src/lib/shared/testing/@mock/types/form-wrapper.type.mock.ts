import { DataTableMetaDataFieldDisplayInfoRelatedField } from './../../../../resources/data/data-table/meta-data/data-table-meta-data-field-display-info-related-field.model';
import { DataTableMetaDataFieldDisplayInfoOption } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field-display-info-option.model';
import { DataTableMetaDataFieldDisplayInfo } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field-display-info.model';
import { DataTableMetaDataField } from '../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../../../components/form-wrapper/resources/form-field.model';
import { GpFormControl } from './../../../../components/form-wrapper/resources/form-control.model';
import { TranslationInfo } from '@lib/resources/data/translation-info.model';

const options = [
  new DataTableMetaDataFieldDisplayInfoOption(),
  new DataTableMetaDataFieldDisplayInfoOption(),
  new DataTableMetaDataFieldDisplayInfoOption(),
  new DataTableMetaDataFieldDisplayInfoOption(),
  new DataTableMetaDataFieldDisplayInfoOption(),
  new DataTableMetaDataFieldDisplayInfoOption(),
  new DataTableMetaDataFieldDisplayInfoOption(),
  new DataTableMetaDataFieldDisplayInfoOption(),
  new DataTableMetaDataFieldDisplayInfoOption(),
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
} as DataTableMetaDataFieldDisplayInfoRelatedField;

const rField2 = {
  field: 'name',
  fieldExternal: null,
  fieldDescription: 'Name',
  value: null,
} as DataTableMetaDataFieldDisplayInfoRelatedField;

const rField3 = {
  field: 'surname',
  fieldExternal: null,
  fieldDescription: 'Surname',
  value: null,
} as DataTableMetaDataFieldDisplayInfoRelatedField;

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

const displayInfo = new DataTableMetaDataFieldDisplayInfo(
  'naciCodi',
  1,
  'TEXT',
  null,
  null,
  options,
  'CrmNaci',
  'naciDesc',
  'naciDesc',
  [],
  1,
  ['langCodi', 'naciDesc'],
  ['height', 'red'],
  relatedFields,
  translationInfo
);

const metadata = new DataTableMetaDataField(
  100,
  'cansCodi',
  'TEXT',
  true,
  true,
  false,
  false,
  30,
  [],
  displayInfo
);

export const FormFieldMock = {
  formControl: new GpFormControl(),
  fieldMetadata: metadata,
  formFieldType: 'gp-form-text-field',
  validField: true,
  fieldMsgs: null,
  header: 'Codigo Subcanal',
  field: 'cansCodi',
} as GpFormField;

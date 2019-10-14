import { ListRs, InsertRowRs } from '../../../../services/api/table/table.service';
import { CommonRs } from './../../../../services/core/common.service';
import { FormFieldMock } from './form-wrapper.type.mock';
import {
  Field,
  FieldMetadata,
} from '../../../../resources/data/data-table/meta-data/meta-data-field.model';

const fieldMetadataCodi = new Field().assign(
  {
    allowAscii: false,
    referenceDescription: null,
    fieldMaxLength: 5,
    fieldName: 'demoCodi',
    id: true,
    lengthInTable: 1,
    notNull: true,
    readOnly: false,
    displayInfo: {
      fieldLabel: 'C\u00f3digo',
      order: 1,
      displayType: 'TEXT',
      checkedValue: '',
      uncheckedValue: '',
      options: null,
      referencedTable: null,
      referencedField: null,
      fieldToOrderBy: null,
      filters: null,
      rowsTextArea: -1,
      fieldDescriptions: null,
      textProperties: ['UPPERCASE', 'NO_SPACE'],
      relatedFields: null,
      translationInfo: null,
    },
    fieldType: 'STRING',
    restrictions: [
      {
        maxLength: 5,
        minLength: 0,
        restrictionType: 'MAX_LENGTH',
        minValue: 1,
        maxValue: 5,
      },
    ],
    hideInAddOperation: false,
  },
  true
);

const fieldMetadataDesc = new Field().assign(
  {
    allowAscii: false,
    referenceDescription: null,
    // "detailEntity" : null,
    // "detailRelationField" : null,
    fieldMaxLength: 100,
    fieldName: 'demoDesc',
    id: false,
    lengthInTable: 50,
    notNull: true,
    readOnly: false,
    displayInfo: {
      checkedValue: '',
      fieldLabel: 'Descripci\u00f3n',
      order: 2,
      referencedField: null,
      referencedTable: null,
      relatedFields: null,
      /* "relatedField" : null,
"relatedFieldExt" : null, */
      rowsTextArea: -1,
      uncheckedValue: '',
      displayType: 'TEXT',
      fieldDescriptions: null,
      options: null,
      fieldToOrderBy: null,
      filters: null,
      translationInfo: null,
      textProperties: ['UPPERCASE', 'NO_SPACE'],
    },
    fieldType: 'STRING',
    restrictions: [
      {
        maxLength: 50,
        minLength: 0,
        restrictionType: 'MAX_LENGTH',
      },
    ],
    hideInAddOperation: false,
  },
  true
);

const fieldMetadataFecIni = new Field().assign(
  {
    allowAscii: false,
    // "detailEntity" : null,
    // "detailRelationField" : null,
    referenceDescription: null,
    fieldMaxLength: -1,
    fieldName: 'demoFecIni',
    id: false,
    lengthInTable: 10,
    notNull: false,
    readOnly: false,
    displayInfo: {
      checkedValue: '',
      fieldLabel: 'Fecha inicio',
      order: 3,
      referencedField: null,
      referencedTable: null,
      relatedFields: null,
      /* "relatedField" : null,
"relatedFieldExt" : null, */
      rowsTextArea: -1,
      uncheckedValue: '',
      displayType: 'CALENDAR',
      fieldDescriptions: null,
      options: null,
      textProperties: null,
      fieldToOrderBy: null,
      filters: null,
      translationInfo: null,
    },
    fieldType: 'DATE',
    restrictions: [],
    hideInAddOperation: false,
  },
  true
);

const fieldMetadataTextarea = new Field().assign(
  {
    allowAscii: false,
    // "detailEntity" : null,
    // "detailRelationField" : null,
    referenceDescription: null,
    fieldMaxLength: -1,
    fieldName: 'demoTextarea',
    id: false,
    lengthInTable: 10,
    notNull: false,
    readOnly: false,
    displayInfo: {
      checkedValue: '',
      fieldLabel: 'Textarea',
      order: 4,
      referencedField: null,
      referencedTable: null,
      relatedFields: null,
      /* "relatedField" : null,
"relatedFieldExt" : null, */
      rowsTextArea: -1,
      uncheckedValue: '',
      displayType: 'TEXT_AREA',
      fieldDescriptions: null,
      options: null,
      textProperties: null,
      fieldToOrderBy: null,
      filters: null,
      translationInfo: null,
    },
    fieldType: 'STRING',
    restrictions: [],
    hideInAddOperation: false,
  },
  true
);

const fieldMetadataTipo = new Field().assign(
  {
    allowAscii: false,
    // "detailEntity" : null,
    // "detailRelationField" : null,
    referenceDescription: null,
    fieldMaxLength: -1,
    fieldName: 'demoTipo',
    id: false,
    lengthInTable: 10,
    notNull: false,
    readOnly: false,
    displayInfo: {
      checkedValue: '',
      fieldLabel: 'Tipo',
      order: 4,
      referencedField: null,
      referencedTable: null,
      relatedFields: null,
      /* "relatedField" : null,
"relatedFieldExt" : null, */
      rowsTextArea: -1,
      uncheckedValue: '',
      displayType: 'TEXT',
      fieldDescriptions: null,
      options: null,
      textProperties: null,
      fieldToOrderBy: null,
      filters: null,
      translationInfo: null,
    },
    fieldType: 'STRING',
    restrictions: [],
    hideInAddOperation: false,
  },
  true
);

const fieldMetadataCheck = new Field().assign(
  {
    allowAscii: false,
    // "detailEntity" : null,
    // "detailRelationField" : null,
    referenceDescription: null,
    fieldMaxLength: -1,
    fieldName: 'demoCheck',
    id: false,
    lengthInTable: 10,
    notNull: false,
    readOnly: false,
    displayInfo: {
      checkedValue: 'S',
      fieldLabel: 'Activo',
      order: 5,
      referencedField: null,
      referencedTable: null,
      relatedFields: null,
      /* "relatedField" : null,
"relatedFieldExt" : null, */
      rowsTextArea: -1,
      uncheckedValue: 'N',
      displayType: 'CHECKBOX',
      fieldDescriptions: null,
      options: null,
      textProperties: null,
      fieldToOrderBy: null,
      filters: null,
      translationInfo: null,
    },
    fieldType: 'STRING',
    restrictions: [],
    hideInAddOperation: false,
  },
  true
);
const fieldMetadataImg = new Field().assign(
  {
    allowAscii: false,
    // "detailEntity" : null,
    // "detailRelationField" : null,
    referenceDescription: 'IMG',
    fieldMaxLength: -1,
    fieldName: 'demoIMG',
    id: false,
    lengthInTable: 10,
    notNull: false,
    readOnly: false,
    displayInfo: {
      checkedValue: null,
      fieldLabel: 'IMG',
      order: 6,
      referencedField: 'value',
      referencedTable: null,
      relatedFields: null,
      /* "relatedField" : null,
"relatedFieldExt" : null, */
      rowsTextArea: -1,
      uncheckedValue: null,
      displayType: 'IMG',
      fieldDescriptions: ['description'],
      options: [],
      textProperties: null,
      fieldToOrderBy: null,
      filters: null,
      translationInfo: null,
    },
    fieldType: 'STRING',
    restrictions: [],
    hideInAddOperation: false,
  },
  true
);

const fieldMetadataWYSIWYG = new Field().assign(
  {
    allowAscii: false,
    // "detailEntity" : null,
    // "detailRelationField" : null,
    referenceDescription: 'WYSIWYG',
    fieldMaxLength: -1,
    fieldName: 'demoWYSIWYG',
    id: false,
    lengthInTable: 10,
    notNull: false,
    readOnly: false,
    displayInfo: {
      checkedValue: null,
      fieldLabel: 'WYSIWYG',
      order: 6,
      referencedField: 'value',
      referencedTable: null,
      relatedFields: null,
      /* "relatedField" : null,
"relatedFieldExt" : null, */
      rowsTextArea: -1,
      uncheckedValue: null,
      displayType: 'WYSIWYG',
      fieldDescriptions: ['description'],
      options: [],
      textProperties: null,
      fieldToOrderBy: null,
      filters: null,
      translationInfo: null,
    },
    fieldType: 'STRING',
    restrictions: [],
    hideInAddOperation: false,
  },
  true
);
const fieldMetadataFile = new Field().assign(
  {
    allowAscii: false,
    // "detailEntity" : null,
    // "detailRelationField" : null,
    referenceDescription: 'File',
    fieldMaxLength: -1,
    fieldName: 'demoFile',
    id: false,
    lengthInTable: 10,
    notNull: false,
    readOnly: false,
    displayInfo: {
      checkedValue: null,
      fieldLabel: 'File',
      order: 6,
      referencedField: 'value',
      referencedTable: null,
      relatedFields: null,
      /* "relatedField" : null,
"relatedFieldExt" : null, */
      rowsTextArea: -1,
      uncheckedValue: null,
      displayType: 'FILE',
      fieldDescriptions: ['description'],
      options: [],
      textProperties: null,
      fieldToOrderBy: null,
      filters: null,
      translationInfo: null,
    },
    fieldType: 'STRING',
    restrictions: [],
    hideInAddOperation: false,
  },
  true
);

const fieldMetadataSelect = new Field().assign(
  {
    allowAscii: false,
    // "detailEntity" : null,
    // "detailRelationField" : null,
    referenceDescription: 'description',
    fieldMaxLength: -1,
    fieldName: 'demoSelect',
    id: false,
    lengthInTable: 10,
    notNull: false,
    readOnly: false,
    displayInfo: {
      checkedValue: null,
      fieldLabel: 'Select',
      order: 6,
      referencedField: 'value',
      referencedTable: null,
      relatedFields: null,
      /* "relatedField" : null,
"relatedFieldExt" : null, */
      rowsTextArea: -1,
      uncheckedValue: null,
      displayType: 'DROPDOWN',
      fieldDescriptions: ['description'],
      options: [
        { value: 'A', description: 'Item A' },
        { value: 'B', description: 'Item B' },
        { value: 'C', description: 'Item C' },
        { value: 'D', description: 'Item D' },
        { value: 'E', description: 'Item E' },
        { value: 'F', description: 'Item F' },
        { value: 'G', description: 'Item G' },
        { value: 'Z', description: 'Item Z' },
      ],
      textProperties: null,
      fieldToOrderBy: null,
      filters: null,
      translationInfo: null,
    },
    fieldType: 'STRING',
    restrictions: [],
    hideInAddOperation: false,
  },
  true
);

export const FieldMetadataMock: Field[] = [
  fieldMetadataCodi,
  fieldMetadataDesc,
  fieldMetadataFecIni,
  fieldMetadataTipo,
  fieldMetadataCheck,
  fieldMetadataSelect,
  fieldMetadataFile,
  fieldMetadataWYSIWYG,
  fieldMetadataImg,
  fieldMetadataTextarea,
];

export let DataTableMetadataMock = new FieldMetadata().assign({
  tableLabel: 'Test',
  fields: [FormFieldMock.fieldMetadata],
});

export let CommonRsMock: CommonRs = {
  error: null,
  cacheKey: null,
  partialRows: null,
  totalRows: null,
  ok: true,
};

export let CommonRsErrorMock: CommonRs = {
  error: {
    errorMessage: 'TEST',
    fields: [],
    internalErrorMessage: 'TEST',
    notLogged: false,
  },
  cacheKey: null,
  partialRows: null,
  totalRows: null,
  ok: false,
};

export let ListRsSuccessMock: ListRs = {
  metadata: DataTableMetadataMock,
  data: [],
  ...CommonRsMock,
};

export let ListRsFailSessionMock: ListRs = {
  metadata: DataTableMetadataMock,
  data: [],
  ...CommonRsMock,
  error: {
    errorMessage: 'No se ha establecido sesion o se ha perdido.',
    fields: [],
    internalErrorMessage: 'test',
    notLogged: false,
  },
  ok: false,
};

export let ListRsFailGenericMock = {
  metadata: DataTableMetadataMock,
  data: [],
  ...CommonRsMock,
  error: {
    errorMessage: 'Error',
    fields: [],
    internalErrorMessage: 'test',
    notLogged: false,
  },
  ok: false,
};

export let SelectOneRowRsMock = {
  data: [],
  metadata: DataTableMetadataMock,
  ...CommonRsMock,
};

export let InsertRowRsMock = {
  insertedRow: {},
  ...CommonRsMock,
} as InsertRowRs;

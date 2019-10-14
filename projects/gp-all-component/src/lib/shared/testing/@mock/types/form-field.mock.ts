import {
  DisplayType,
  Field,
  FieldDisplayInfo,
  FieldType,
  RelatedField,
  TextPropertyType,
} from '../../../../resources/data/data-table/meta-data/meta-data-field.model';
import { GpFormField } from '../../../../components/form-wrapper/resources/form-field.model';
import { TestingErrorCodeMock } from '../utils/testing-mock-constants.class';
import { TranslationInfo } from '../../../../resources/data/translation-info.model';

export const FormFieldText = new GpFormField();
export const FormFieldTextarea = new GpFormField();
export const FormFieldImg = new GpFormField();
export const FormFieldWYSIWYG = new GpFormField();
export const FormFieldSwitch = new GpFormField();
export const FormFieldCheckbox = new GpFormField();
export const FormFieldCalendar = new GpFormField();
export const FormFieldDropdown = new GpFormField();
export const FormFieldDropdownNoOptions = new GpFormField();
export const FormFieldDropdownError = new GpFormField();
export const FormFieldDropdownRelated = new GpFormField();
export const FormFieldDropdownRelatedError = new GpFormField();
export const FormFieldHourTime = new GpFormField();
export const FormFieldFile = new GpFormField();
export const FormFieldCheckboxNullable = new GpFormField();
export const FormFieldNumber = new GpFormField();
export const FormFieldTextNumber = new GpFormField();

FormFieldCheckboxNullable.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.NULLABLE_CHECKBOX,
        fieldDescriptions: null,
        fieldLabel: 'Label',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: null,
        translationInfo: null,
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name8',
    fieldType: FieldType.STRING,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);

FormFieldFile.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.FILE,
        fieldDescriptions: null,
        fieldLabel: 'Label',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: null,
        translationInfo: null,
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name1',
    fieldType: FieldType.STRING,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);

FormFieldTextNumber.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.NUMBER,
        fieldDescriptions: null,
        fieldLabel: 'Label',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: null,
        translationInfo: null,
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name14',
    fieldType: FieldType.NUMBER,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);

FormFieldNumber.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.NUMBER,
        fieldDescriptions: null,
        fieldLabel: 'Label',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: null,
        translationInfo: null,
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name13',
    fieldType: FieldType.NUMBER,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);

FormFieldHourTime.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.HOUR_MINUTE,
        fieldDescriptions: null,
        fieldLabel: 'Label',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: null,
        translationInfo: null,
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name2',
    fieldType: FieldType.STRING,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);
FormFieldTextarea.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.TEXT_AREA,
        fieldDescriptions: null,
        fieldLabel: 'Label',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: 5,
        textProperties: [TextPropertyType.UPPERCASE, TextPropertyType.TRIM],
        translationInfo: new TranslationInfo().assign({ keyFields: ['ENG', 'FR'] }),
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name3',
    fieldType: FieldType.STRING,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);
FormFieldText.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.TEXT,
        fieldDescriptions: null,
        fieldLabel: 'Label',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: [TextPropertyType.UPPERCASE, TextPropertyType.TRIM],
        translationInfo: new TranslationInfo().assign({ keyFields: ['ENG', 'FR'] }),
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name4',
    fieldType: FieldType.STRING,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);
FormFieldImg.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.IMG,
        fieldDescriptions: null,
        fieldLabel: 'Label',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: null,
        translationInfo: null,
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name5',
    fieldType: FieldType.STRING,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);
FormFieldWYSIWYG.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.WYSIWYG,
        fieldDescriptions: null,
        fieldLabel: 'Label',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: [TextPropertyType.UPPERCASE],
        translationInfo: null,
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name6',
    fieldType: FieldType.STRING,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);
FormFieldSwitch.fieldMetadata = new Field().assign({
  allowAscii: false,
  detailEntity: null,
  detailRelationField: null,
  displayInfo: new FieldDisplayInfo().assign({
    checkedValue: 'TRUE',
    displayType: DisplayType.SWITCH,
    fieldDescriptions: null,
    fieldLabel: 'Label',
    fieldToOrderBy: null,
    filters: null,
    options: null,
    order: 1,
    referencedField: null,
    referencedTable: null,
    relatedFields: null,
    rowsTextArea: -1,
    textProperties: null,
    translationInfo: null,
    uncheckedValue: 'FALSE',
  }),
  fieldMaxLength: -1,
  fieldName: 'name7',
  fieldType: FieldType.STRING,
  hideInAddOperation: true,
  hideInEditOperation: false,
  id: true,
  lengthInTable: 0,
  notNull: false,
  readOnly: false,
  referenceDescription: null,
  restrictions: [],
});
FormFieldCheckbox.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: 'S',
        displayType: DisplayType.CHECKBOX,
        fieldDescriptions: null,
        fieldLabel: 'Label checkbox',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: null,
        translationInfo: null,
        uncheckedValue: 'N',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name10',
    fieldType: FieldType.BOOLEAN,
    hideInAddOperation: false,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);
FormFieldCalendar.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.CALENDAR,
        fieldDescriptions: null,
        fieldLabel: 'Label calendar',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: null,
        translationInfo: null,
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name11',
    fieldType: FieldType.DATE,
    hideInAddOperation: false,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);

FormFieldDropdown.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.DROPDOWN,
        fieldDescriptions: null,
        fieldLabel: 'Dropdown label',
        fieldToOrderBy: null,
        filters: null,
        options: [
          {
            description: 'Selecciona',
            value: null,
          },
          {
            description: 'Value 1',
            value: '1',
          },
          {
            description: 'Value 2',
            value: '2',
          },
          {
            description: 'Value 3',
            value: '3',
          },
        ],
        order: 1,
        referencedField: null,
        referencedTable: null,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: null,
        translationInfo: null,
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name9',
    fieldType: FieldType.STRING,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);
FormFieldDropdownNoOptions.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.DROPDOWN,
        fieldDescriptions: ['name'],
        fieldLabel: 'Dropdown label',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: 'codigo',
        referencedTable: TestingErrorCodeMock.NO_ERROR,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: null,
        translationInfo: null,
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name9',
    fieldType: FieldType.STRING,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);
FormFieldDropdownError.fieldMetadata = new Field().assign(
  {
    allowAscii: false,
    detailEntity: null,
    detailRelationField: null,
    displayInfo: new FieldDisplayInfo().assign(
      {
        checkedValue: '',
        displayType: DisplayType.DROPDOWN,
        fieldDescriptions: ['name'],
        fieldLabel: 'Dropdown label',
        fieldToOrderBy: null,
        filters: null,
        options: null,
        order: 1,
        referencedField: 'codigo',
        referencedTable: TestingErrorCodeMock.ERROR_NO_OPTIONS,
        relatedFields: null,
        rowsTextArea: -1,
        textProperties: null,
        translationInfo: null,
        uncheckedValue: '',
      },
      true
    ),
    fieldMaxLength: -1,
    fieldName: 'name9',
    fieldType: FieldType.STRING,
    hideInAddOperation: true,
    hideInEditOperation: false,
    id: true,
    lengthInTable: 0,
    notNull: false,
    readOnly: false,
    referenceDescription: null,
    restrictions: [],
  },
  true
);

FormFieldDropdownRelated.fieldMetadata = {
  allowAscii: false,
  detailEntity: null,
  detailRelationField: null,
  displayInfo: {
    checkedValue: '',
    displayType: DisplayType.DROPDOWN_RELATED,
    fieldDescriptions: ['name'],
    fieldLabel: 'Sub Id',
    fieldToOrderBy: null,
    filters: null,
    options: null,
    order: 1,
    referencedField: 'name12',
    referencedTable: TestingErrorCodeMock.NO_ERROR,
    relatedFields: [
      new RelatedField().assign({
        field: 'codigo',
        fieldExternal: 'codigo',
        fieldDescription: 'name',
      }),
    ],
    rowsTextArea: -1,
    textProperties: null,
    translationInfo: null,
    uncheckedValue: '',
  },
  fieldMaxLength: -1,
  fieldName: 'name12',
  fieldType: FieldType.STRING,
  hideInAddOperation: true,
  hideInEditOperation: false,
  id: false,
  lengthInTable: 0,
  notNull: false,
  readOnly: false,
  referenceDescription: null,
  restrictions: [],
} as Field;

FormFieldDropdownRelatedError.fieldMetadata = {
  allowAscii: false,
  detailEntity: null,
  detailRelationField: null,
  displayInfo: {
    checkedValue: '',
    displayType: DisplayType.DROPDOWN_RELATED,
    fieldDescriptions: ['name'],
    fieldLabel: 'Sub Id',
    fieldToOrderBy: null,
    filters: null,
    options: null,
    order: 1,
    referencedField: 'name12',
    referencedTable: TestingErrorCodeMock.ERROR_NO_OPTIONS,
    relatedFields: [
      new RelatedField().assign({
        field: 'codigo',
        fieldExternal: 'codigo',
        fieldDescription: 'name',
      }),
    ],
    rowsTextArea: -1,
    textProperties: null,
    translationInfo: null,
    uncheckedValue: '',
  },
  fieldMaxLength: -1,
  fieldName: 'name12',
  fieldType: FieldType.STRING,
  hideInAddOperation: true,
  hideInEditOperation: false,
  id: false,
  lengthInTable: 0,
  notNull: false,
  readOnly: false,
  referenceDescription: 'dropdown-tester',
  restrictions: [],
} as Field;

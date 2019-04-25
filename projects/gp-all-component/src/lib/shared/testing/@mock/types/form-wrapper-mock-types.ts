import { GpFormField } from '../../../../components/form-wrapper/resources/gp-form-field.model';
import { DataTableMetaDataField } from '@lib/resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormControl } from '@lib/components/form-wrapper/resources/gp-form-control.model';

export let FormControlMock = {
  edicionEdit: false,
  edicionAdd: false,
  lockFields: false,
  originalRow: null,
  editedRow: null,
} as GpFormControl;

export let FieldMetadataMock = {
  allowAscii: false,
  hideInEditOperation: false,
  detailEntity: null,
  detailRelationField: null,
  fieldMaxLength: -1,
  fieldName: 'cansCodi',
  hideInAddOperation: false,
  id: true,
  lengthInTable: -1,
  notNull: false,
  readOnly: false,
  displayInfo: {
    checkedValue: '',
    fieldLabel: 'Codigo Subcanal',
    fieldToOrderBy: null,
    order: 2,
    referencedField: null,
    referencedTable: null,
    rowsTextArea: -1,
    uncheckedValue: '',
    displayType: 'TEXT',
    fieldDescriptions: null,
    filters: null,
    options: null,
    relatedFields: null,
    textProperties: null,
    translationInfo: null,
  },
  fieldType: 'STRING',
  restrictions: [],
} as DataTableMetaDataField;

export let FormFieldMock = {
  formControl: FormControlMock,
  fieldMetadata: FieldMetadataMock,
  formFieldType: 'gp-form-text-field',
  validField: true,
  fieldMsgs: null,
  header: 'Codigo Subcanal',
  field: 'cansCodi',
} as GpFormField;

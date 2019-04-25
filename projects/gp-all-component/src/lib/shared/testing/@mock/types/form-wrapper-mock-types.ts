import { DataTableMetaDataFieldDisplayInfoOption } from './../../../../resources/data/data-table/meta-data/data-table-meta-data-field-display-info-option.model';
import { DataTableMetaDataFieldDisplayInfo } from './../../../../resources/data/data-table/meta-data/data-table-meta-data-field-display-info.model';
import { DataTableMetaDataField } from './../../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormField } from '../../../../components/form-wrapper/resources/gp-form-field.model';
import { GpFormControl } from '@lib/components/form-wrapper/resources/gp-form-control.model';

const options = [
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

const displayInfo = new DataTableMetaDataFieldDisplayInfo(
    'name',
    1,
    'TEXT',
    null,
    null,
    options,
    null,
    null,
    'alphabetically',
    [],
    1,
    ['Description 1', 'Description 2'],
    ['height', 'red'],
    null,
    null
);

const metadata = new DataTableMetaDataField(
    100,
    'name',
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

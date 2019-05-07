import { ListRs, InsertRowRs } from '../../../../services/api/table/table.service';
import { DataTableMetaData } from '@lib/resources/data/data-table/meta-data/data-table-meta-data.model';
import { CommonRs } from '@lib/services/core/common.service';
import { FormFieldMock } from './form-wrapper.type.mock';

export let DataTableMetadataMock: DataTableMetaData = {
  tableLabel: 'Test',
  fields: [FormFieldMock.fieldMetadata],
};

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

export let ListRsFailGenericMock: ListRs = {
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

import { TestingErrorCodeMock } from './../../../shared/testing/@mock/utils/testing-mock-constants.class';
import { Observable, of, throwError } from 'rxjs';
import { ListRs } from './table.service';
import { Filter } from './../../../resources/data/filter/filter.model';
import { ErrorInformation } from '@lib/resources/data/error-information/error-information.model';
export const TableServiceMockResponse: ListRs = {
  ok: true,
  data: [
    {
      langCodi: 'EN',
      naciCodi: 'AFG',
      naciDesc: 'AFGANISTAN',
    },
    {
      langCodi: 'ES',
      naciCodi: 'VEN',
      naciDesc: 'VENEZUELA',
    },
    {
      langCodi: 'ES',
      naciCodi: 'ESP',
      naciDesc: 'ESPAÑA',
    },
    {
      langCodi: 'EN-GB',
      naciCodi: 'ENG',
      naciDesc: 'GREAT BRITAIN',
    },
  ],
  error: null,
  metadata: {
    tableLabel: 'Nacionalidades',
    fields: [
      {
        allowAscii: false,
        detailEntity: null,
        detailRelationField: null,
        fieldMaxLength: -1,
        fieldName: 'naciCodi',
        hideInAddOperation: false,
        id: true,
        lengthInTable: -1,
        notNull: false,
        readOnly: false,
        displayInfo: {
          checkedValue: '',
          fieldLabel: 'C\u00f3digo',
          fieldToOrderBy: null,
          order: 1,
          referencedField: null,
          referencedTable: null,
          rowsTextArea: -1,
          uncheckedValue: '',
          displayType: 'TEXT',
          fieldDescriptions: null,
          filters: null,
          options: null,
          relatedFields: null,
          textProperties: ['UPPERCASE'],
          translationInfo: null,
        },
        fieldType: 'STRING',
        restrictions: [],
      },
      {
        allowAscii: true,
        detailEntity: null,
        detailRelationField: null,
        fieldMaxLength: -1,
        fieldName: 'naciDesc',
        hideInAddOperation: false,
        id: false,
        lengthInTable: -1,
        notNull: true,
        readOnly: false,
        displayInfo: {
          checkedValue: '',
          fieldLabel: 'Descripci\u00f3n',
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
          textProperties: ['TRIM'],
          translationInfo: null,
        },
        fieldType: 'STRING',
        restrictions: [],
      },
      {
        allowAscii: false,
        detailEntity: null,
        detailRelationField: null,
        fieldMaxLength: -1,
        fieldName: 'langCodi',
        hideInAddOperation: false,
        id: false,
        lengthInTable: -1,
        notNull: false,
        readOnly: false,
        displayInfo: {
          checkedValue: '',
          fieldLabel: 'Idioma',
          fieldToOrderBy: null,
          order: 3,
          referencedField: null,
          referencedTable: null,
          rowsTextArea: -1,
          uncheckedValue: '',
          displayType: 'TEXT',
          fieldDescriptions: null,
          filters: null,
          options: null,
          relatedFields: null,
          textProperties: ['UPPERCASE'],
          translationInfo: null,
        },
        fieldType: 'STRING',
        restrictions: [],
      },
    ],
  },
  cacheKey: null,
  totalRows: null,
  partialRows: null,
};

export class TableServiceMock {
  list(
    tableName: string | TestingErrorCodeMock,
    retrieveMetadata: boolean,
    ordered?: boolean,
    fieldsToOrderBy?: string[],
    filters?: Filter[],
    translate?: boolean,
    translationLanguage?: string
  ): Observable<ListRs> {
    const error = new ErrorInformation();
    const response = JSON.parse(JSON.stringify(TableServiceMockResponse));
    if (tableName === TestingErrorCodeMock.ERROR_500) {
      error.errorMessage = TestingErrorCodeMock.ERROR_500;
      error.internalErrorMessage = 'Server is down';
      return throwError(error);
    } else if (tableName === TestingErrorCodeMock.ERROR_404) {
      response.ok = false;
      response.error = error;
    }
    return of(response);
  }
}

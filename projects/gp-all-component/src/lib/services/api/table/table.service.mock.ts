import { TestingErrorCodeMock } from './../../../shared/testing/@mock/utils/testing-mock-constants.class';
import { Observable, of, throwError } from 'rxjs';
import { ListRs, MetadataRs, SelectOneRowRq, SelectOneRowRs } from './table.service';
import { Filter } from './../../../resources/data/filter/filter.model';

export const TableServiceMockResponse: ListRs = {
  result: { ok: true },
  data: [
    {
      langCodi: 'EN',
      naciCodi: 'TEST1',
      naciDesc: 'TEST 1',
    },
    {
      langCodi: 'EN',
      naciCodi: 'TEST2',
      naciDesc: 'TEST 2',
    },
    {
      langCodi: 'EN',
      naciCodi: 'TEST3',
      naciDesc: 'TEST 3',
    },
    {
      langCodi: 'EN',
      naciCodi: 'TEST4',
      naciDesc: 'TEST 4',
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
      langCodi: 'EN',
      naciCodi: 'ENG',
      naciDesc: 'GREAT BRITAIN',
    },
  ],
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
    const response = JSON.parse(JSON.stringify(TableServiceMockResponse));
    if (tableName === TestingErrorCodeMock.ERROR_500) {
      return throwError({
        errorMessage: TestingErrorCodeMock.ERROR_500,
        internalErrorMessage: 'Server is down',
      });
    } else if (tableName === TestingErrorCodeMock.ERROR_404) {
      response.result = { ok: false, errorMessage: TestingErrorCodeMock.ERROR_404 };
    }
    return of(response);
  }

  selectOneRow(tableName: string, reg: any) {
    const rq = new SelectOneRowRq();
    const response = new SelectOneRowRs();
    rq.jsonRowToSelect = JSON.stringify(reg);
    return of(response);
  }

  metadata(tableName: string): Observable<MetadataRs> {
    return of({ metadata: TableServiceMockResponse.metadata } as MetadataRs);
  }
}

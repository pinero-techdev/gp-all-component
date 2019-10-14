import { TestingErrorCodeMock } from './../../../shared/testing/@mock/utils/testing-mock-constants.class';
import { Observable, of, throwError } from 'rxjs';
import { ListRs, MetadataRs, SelectOneRowRq, SelectOneRowRs } from './table.service';
import { Filter } from './../../../resources/data/filter/filter.model';
import { ErrorInformation } from './../../../resources/data/error-information/error-information.model';
import {
  DisplayType,
  Field,
  FieldDisplayInfo,
  FieldMetadata,
} from '../../../resources/data/data-table/meta-data/meta-data-field.model';

const TableServiceMockResponse = new ListRs();
export const TableServiceMockResponse2 = new ListRs();
TableServiceMockResponse.data = [
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
];
TableServiceMockResponse2.data = [
  {
    codigo: 'A',
    name: 'Value A',
  },
  {
    codigo: 'B',
    name: 'Value B',
  },
  {
    codigo: 'C',
    name: 'Value C',
  },
];
TableServiceMockResponse2.metadata = new FieldMetadata().assign({
  tableLabel: 'TableServiceList2',
  fields: [],
});
TableServiceMockResponse2.ok = true;
TableServiceMockResponse.metadata = new FieldMetadata().assign({
  tableLabel: 'Nacionalidades',
  fields: [
    new Field().assign({
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
      displayInfo: new FieldDisplayInfo().assign({
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
      }),
      fieldType: 'STRING',
      restrictions: [],
    }),
    new Field().assign({
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
      displayInfo: new FieldDisplayInfo().assign({
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
      }),
      fieldType: 'STRING',
      restrictions: [],
    }),
    new Field().assign({
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
      displayInfo: new FieldDisplayInfo().assign({
        checkedValue: '',
        fieldLabel: 'Idioma',
        fieldToOrderBy: null,
        order: 3,
        referencedField: null,
        referencedTable: null,
        rowsTextArea: -1,
        uncheckedValue: '',
        displayType: DisplayType.TEXT,
        fieldDescriptions: null,
        filters: null,
        options: null,
        relatedFields: null,
        textProperties: ['UPPERCASE'],
        translationInfo: null,
      }),
      fieldType: 'STRING',
      restrictions: [],
    }),
  ],
});
TableServiceMockResponse.ok = true;

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
    const response2 = JSON.parse(JSON.stringify(TableServiceMockResponse2));
    if (tableName === TestingErrorCodeMock.ERROR_500) {
      error.errorMessage = TestingErrorCodeMock.ERROR_500;
      error.internalErrorMessage = 'Server is down';
      return throwError(error);
    } else if (tableName === TestingErrorCodeMock.ERROR_404) {
      response.ok = false;
      response.error = error;
    } else if (tableName === TestingErrorCodeMock.NO_ERROR) {
      response2.ok = true;
      response2.error = null;
      return of(response2);
    } else if (tableName === TestingErrorCodeMock.ERROR_NO_OPTIONS) {
      response2.ok = false;
      response2.error = error;
      return of(response2);
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

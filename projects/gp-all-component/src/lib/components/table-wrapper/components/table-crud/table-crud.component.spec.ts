import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  TableWrapperSharedModules,
  TableWrapperSharedProviders,
} from '../../../../shared/imports/table-wrapper-shared';
import { TableCrudComponent } from './table-crud.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  TableService,
  ListRs,
  SelectOneRowRs,
  InsertRowRs,
} from './../../../../services/api/table/table.service';
import { Observable } from 'rxjs';
import { Filter } from './../../../../resources/data/filter/filter.model';
import { FilterOperationType } from './../../../../resources/data/filter/filter-operation-type.enum';
import {
  ListRsSuccessMock,
  ListRsFailSessionMock,
  ListRsFailGenericMock,
  SelectOneRowRsMock,
  CommonRsMock,
  CommonRsErrorMock,
  InsertRowRsMock,
} from '../../../../shared/testing/@mock/types/list-rs.type.mock';
import moment = require('moment');
import { MessagesService } from './../../../../services/core/messages.service';
import { Router } from '@angular/router';
import { FormFieldMock } from './../../../../shared/testing/@mock/types/form-wrapper.type.mock';
import { GpTableDisplayTypes } from '../../resources/gp-table-display-types.enum';
import { take } from 'rxjs/operators';
import { CommonRs } from './../../../../services/core/common.service';
import { InfoCampoModificado } from './../../../../resources/data/info-campo-modificado.model';
import { GpFormFieldType } from './../../../../components/form-wrapper/resources/form-field-type.enum';
import { GpFormField } from './../../../../components/form-wrapper/resources/form-field.model';

describe('TableCrudComponent', () => {
  let component: TableCrudComponent;
  let fixture: ComponentFixture<TableCrudComponent>;
  let tableService: TableService;
  let messagesService: MessagesService;

  const router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableCrudComponent],
      imports: [TableWrapperSharedModules, RouterTestingModule, HttpClientTestingModule],
      providers: [TableWrapperSharedProviders, { provide: Router, useValue: router }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCrudComponent);
    component = fixture.componentInstance;
    tableService = TestBed.get(TableService);
    messagesService = TestBed.get(MessagesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize table', () => {
    const tableName = 'Test';

    component.initTable(tableName);

    expect(component.tableName).toEqual(tableName);
  });

  describe('on new given filter or options', () => {
    let mockFilters: Filter[];
    let mockFieldsToOrderBy: string[];

    beforeEach(() => {
      mockFilters = [
        new Filter(FilterOperationType.GTE, 'fecHasta', [moment().format('YYYY-MM-DD')]),
      ];
      mockFieldsToOrderBy = ['codTurno'];
    });

    it('should reset properties and set filters', () => {
      component.cambiaTablaDetail(mockFilters, mockFieldsToOrderBy);

      expect(component.working).toEqual(true);
      expect(component.columns.length).toEqual(0);
      expect(component.tableColumns.length).toEqual(0);
      expect(component.data.length).toEqual(0);
      expect(component.selectedRow).toBeNull();
      expect(component.formControl.originalRow).toBeNull();
      expect(component.dialogErrors).toBeFalsy();
      expect(component.filters).toEqual(mockFilters);
    });

    it('should success on requesting data', () => {
      const customData = ['Test'];

      const mockObservable = new Observable<ListRs>((subscriber) =>
        subscriber.next({ ...ListRsSuccessMock, data: customData })
      );

      const $tableServiceSpy = spyOn(tableService, 'list').and.returnValue(mockObservable);

      component.cambiaTablaDetail(mockFilters, mockFieldsToOrderBy);

      expect($tableServiceSpy).toHaveBeenCalled();
      expect(component.data).toEqual(customData);
    });

    describe('should success on connection but fail requesting data', () => {
      it('should fail due to an expired session', () => {
        const mockObservable = new Observable<ListRs>((subscriber) =>
          subscriber.next(ListRsFailSessionMock)
        );

        const $tableServiceSpy = spyOn(tableService, 'list').and.returnValue(mockObservable);

        component.cambiaTablaDetail(mockFilters, mockFieldsToOrderBy);

        expect($tableServiceSpy).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['login']);
      });

      it('should fail due to a generic error', () => {
        const mockObservable = new Observable<ListRs>((subscriber) =>
          subscriber.next(ListRsFailGenericMock)
        );

        const $tableServiceSpy = spyOn(tableService, 'list').and.returnValue(mockObservable);
        const $messagesServiceSpy = spyOn(messagesService, 'showErrorAlert');

        component.cambiaTablaDetail(mockFilters, mockFieldsToOrderBy);

        expect($tableServiceSpy).toHaveBeenCalled();
        expect($messagesServiceSpy).toHaveBeenCalled();
      });
    });

    it('should fail on requesting data', () => {
      const mockObservable = new Observable<ListRs>((subscriber) => subscriber.error('Error'));

      const $tableServiceSpy = spyOn(tableService, 'list').and.returnValue(mockObservable);

      component.cambiaTablaDetail(mockFilters, mockFieldsToOrderBy);

      expect($tableServiceSpy).toHaveBeenCalled();
    });
  });

  describe('on new table selected', () => {
    let mockTableName: string;
    let mockFieldsToOrderBy: string[];

    beforeEach(() => {
      mockTableName = 'TEST';
      mockFieldsToOrderBy = ['codTurno'];
    });

    it(`should do nothing if provided table name equals current
      table name, and selected row filters are null`, () => {
      component.tableName = mockTableName;
      component.working = true;
      component.rowSelectedFilters = null;

      component.cambiaTabla(mockTableName, mockFieldsToOrderBy);

      expect(component.working).toBeFalsy();
    });

    it('should reset properties and set filters', () => {
      const mockFilters = [
        new Filter(FilterOperationType.GTE, 'fecHasta', [moment().format('YYYY-MM-DD')]),
      ];

      component.rowSelectedFilters = mockFilters;

      component.cambiaTabla(mockTableName, mockFieldsToOrderBy);

      expect(component.working).toEqual(true);
      expect(component.columns.length).toEqual(0);
      expect(component.tableColumns.length).toEqual(0);
      expect(component.tableName).toEqual(mockTableName);
      expect(component.data.length).toEqual(0);
      expect(component.selectedRow).toBeNull();
      expect(component.formControl.originalRow).toBeNull();
      expect(component.dialogErrors).toBeFalsy();
      expect(component.filters.length).toEqual(mockFilters.length);
    });

    it('should success on requesting data', () => {
      const customData = ['Test'];

      const mockObservable = new Observable<ListRs>((subscriber) =>
        subscriber.next({ ...ListRsSuccessMock, data: customData })
      );

      const $tableServiceSpy = spyOn(tableService, 'list').and.returnValue(mockObservable);

      const mockFilters = [
        new Filter(FilterOperationType.GTE, 'fecHasta', [moment().format('YYYY-MM-DD')]),
      ];

      component.rowSelectedFilters = mockFilters;

      component.cambiaTabla(mockTableName, mockFieldsToOrderBy);

      expect($tableServiceSpy).toHaveBeenCalled();
      expect(component.data).toEqual(customData);
    });

    describe('should success on connection but fail requesting data', () => {
      it('should fail due to an expired session', () => {
        const mockObservable = new Observable<ListRs>((subscriber) =>
          subscriber.next(ListRsFailSessionMock)
        );

        const $tableServiceSpy = spyOn(tableService, 'list').and.returnValue(mockObservable);

        const mockFilters = [
          new Filter(FilterOperationType.GTE, 'fecHasta', [moment().format('YYYY-MM-DD')]),
        ];

        component.rowSelectedFilters = mockFilters;

        component.cambiaTabla(mockTableName, mockFieldsToOrderBy);

        expect($tableServiceSpy).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['login']);
      });

      it('should fail due to a generic error', () => {
        const mockObservable = new Observable<ListRs>((subscriber) =>
          subscriber.next(ListRsFailGenericMock)
        );

        const $tableServiceSpy = spyOn(tableService, 'list').and.returnValue(mockObservable);
        const $messagesServiceSpy = spyOn(messagesService, 'showErrorAlert');

        const mockFilters = [
          new Filter(FilterOperationType.GTE, 'fecHasta', [moment().format('YYYY-MM-DD')]),
        ];

        component.rowSelectedFilters = mockFilters;

        component.cambiaTabla(mockTableName, mockFieldsToOrderBy);

        expect($tableServiceSpy).toHaveBeenCalled();
        expect($messagesServiceSpy).toHaveBeenCalled();
      });
    });

    it('should fail on requesting data', () => {
      const mockObservable = new Observable<ListRs>((subscriber) => subscriber.error('Error'));

      const $tableServiceSpy = spyOn(tableService, 'list').and.returnValue(mockObservable);

      const mockFilters = [
        new Filter(FilterOperationType.GTE, 'fecHasta', [moment().format('YYYY-MM-DD')]),
      ];

      component.rowSelectedFilters = mockFilters;

      component.cambiaTabla(mockTableName, mockFieldsToOrderBy);

      expect($tableServiceSpy).toHaveBeenCalled();
    });
  });

  describe('on calculating field type', () => {
    it('should return default field type if no match was found', () => {
      const formField = {
        ...FormFieldMock,
        fieldMetadata: {
          displayInfo: {
            displayType: 'GENERIC',
          },
        },
      } as GpFormField;

      component.calcFieldType(formField);

      expect(formField.formFieldType).toEqual(GpFormFieldType.TEXT);
    });

    it('should match passed displayType', () => {
      const formField = {
        ...FormFieldMock,
        fieldMetadata: {
          displayInfo: {
            displayType: GpTableDisplayTypes.WYSIWYG,
          },
        },
      } as GpFormField;

      component.calcFieldType(formField);

      expect(formField.formFieldType).toEqual(GpFormFieldType.WYSIWYG);
    });

    it('should default to calendar fieldType', () => {
      const formField = {
        ...FormFieldMock,
        fieldMetadata: {
          fieldType: 'DATE',
          displayInfo: {
            displayType: 'GENERIC',
          },
        },
      } as GpFormField;

      component.calcFieldType(formField);

      expect(formField.formFieldType).toEqual(GpFormFieldType.CALENDAR);
    });

    it('should default to switch fieldType', () => {
      const formField = {
        ...FormFieldMock,
        fieldMetadata: {
          fieldType: 'BOOLEAN',
          notNull: true,
          displayInfo: {
            displayType: 'GENERIC',
          },
        },
      } as GpFormField;

      component.calcFieldType(formField);

      expect(formField.formFieldType).toEqual(GpFormFieldType.SWITCH);
    });

    it('should default to dropdown fieldType', () => {
      const formField = {
        ...FormFieldMock,
        fieldMetadata: {
          fieldType: 'BOOLEAN',
          notNull: false,
          displayInfo: {
            displayType: 'GENERIC',
          },
        },
      } as GpFormField;

      component.calcFieldType(formField);

      expect(formField.formFieldType).toEqual(GpFormFieldType.DROPDOWN);
    });
  });

  describe('on row selection', () => {
    it('should call service to select one row and emit event', () => {
      const responseMock = new Observable<SelectOneRowRs>((subscriber) =>
        subscriber.next({ ...SelectOneRowRsMock, data: [] })
      );

      const selectedRow = {};

      const mockedFormField = {
        ...FormFieldMock,
        formFieldType: 'gp-form-text-field',
      } as GpFormField;

      component.columns = [mockedFormField];

      const $tableServiceSpy = spyOn(tableService, 'selectOneRow').and.returnValue(responseMock);

      component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toEqual(selectedRow));

      component.selectedRow = selectedRow;

      fixture.detectChanges();

      component.onRowSelect();

      expect($tableServiceSpy).toHaveBeenCalled();
      expect(component.displayEdicion).toBeTruthy();
    });

    it('should success on call to service but return error', () => {
      const responseMock = new Observable<SelectOneRowRs>((subscriber) =>
        subscriber.next({ ...SelectOneRowRsMock, data: [], ok: false })
      );

      const selectedRow = {};

      const $tableServiceSpy = spyOn(tableService, 'selectOneRow').and.returnValue(responseMock);

      component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toEqual(selectedRow));

      component.selectedRow = selectedRow;

      component.onRowSelect();

      expect($tableServiceSpy).toHaveBeenCalled();
      expect(component.displayEdicion).toBeFalsy();
    });

    it('should fail on call to service', () => {
      const responseMock = new Observable<SelectOneRowRs>((subscriber) =>
        subscriber.error('Error')
      );

      const selectedRow = {};

      const $tableServiceSpy = spyOn(tableService, 'selectOneRow').and.returnValue(responseMock);
      const $messagesServiceSpy = spyOn(messagesService, 'showErrorAlert');

      component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toEqual(selectedRow));

      component.selectedRow = selectedRow;

      component.onRowSelect();

      expect($tableServiceSpy).toHaveBeenCalled();
      expect($messagesServiceSpy).toHaveBeenCalledWith('Error interno recuperando el registro.');
    });
  });

  describe('on dialog delete action', () => {
    it('should call to service and emit changes event', () => {
      const tableName = 'TEST';
      const rows = ['TEST_ROW'];
      const selectedRow = rows[0];

      const responseMock = new Observable<CommonRs>((subscriber) => subscriber.next(CommonRsMock));

      const $tableServiceSpy = spyOn(tableService, 'deleteRow').and.returnValue(responseMock);

      component.data = rows;
      component.selectedRow = selectedRow;
      component.formControl.originalRow = selectedRow;
      component.tableName = tableName;

      component.changes.pipe(take(1)).subscribe((data) => expect(data).toBeTruthy());

      component.onDialogDelete();

      expect($tableServiceSpy).toHaveBeenCalled();
      expect(component.data.length).toEqual(0);
    });

    it('should call to service but return an error', () => {
      const tableName = 'TEST';
      const rows = ['TEST_ROW'];
      const selectedRow = rows[0];
      const errorResponse = 'Error borrando el registro: ' + CommonRsErrorMock.error.errorMessage;

      const responseMock = new Observable<CommonRs>((subscriber) =>
        subscriber.next(CommonRsErrorMock)
      );

      const $tableServiceSpy = spyOn(tableService, 'deleteRow').and.returnValue(responseMock);
      const $messagesServiceSpy = spyOn(messagesService, 'showErrorAlert');

      component.data = rows;
      component.selectedRow = selectedRow;
      component.formControl.originalRow = selectedRow;
      component.tableName = tableName;

      component.onDialogDelete();

      expect($messagesServiceSpy).toHaveBeenCalledWith(errorResponse);
      expect($tableServiceSpy).toHaveBeenCalled();
    });

    it('should fail on call to service', () => {
      const tableName = 'TEST';
      const rows = ['TEST_ROW'];
      const selectedRow = rows[0];
      const errorResponse = 'Error interno borrando el registro.';

      const responseMock = new Observable<CommonRs>((subscriber) => subscriber.error('Error'));

      const $tableServiceSpy = spyOn(tableService, 'deleteRow').and.returnValue(responseMock);
      const $messagesServiceSpy = spyOn(messagesService, 'showErrorAlert');

      component.data = rows;
      component.selectedRow = selectedRow;
      component.formControl.originalRow = selectedRow;
      component.tableName = tableName;

      component.onDialogDelete();

      expect($messagesServiceSpy).toHaveBeenCalledWith(errorResponse);
      expect($tableServiceSpy).toHaveBeenCalled();
    });
  });

  describe('on dialog save action', () => {
    xit('should return if edition is not allowed', () => {
      const selectedRow = {};
      const mockedFormField = {
        ...FormFieldMock,
        formFieldType: 'gp-form-text-field',
        fieldMetadata: {
          ...FormFieldMock.fieldMetadata,
          hideInAddOperation: false,
          notNull: true,
          displayInfo: {
            ...FormFieldMock.fieldMetadata.displayInfo,
            fieldLabel: '',
          },
        },
      } as GpFormField;

      const tableName = 'TEST';
      const rows = ['TEST_ROW'];

      component.formControl.editedRow = {};
      component.formControl.originalRow = {};

      component.data = rows;
      component.selectedRow = selectedRow;
      component.formControl.originalRow = selectedRow;
      component.tableName = tableName;

      component.selectedRow = selectedRow;
      component.addSelectedCodes = [{ key: 'cansCodi' }];
      component.working = false;
      component.displayEdicion = true;
      component.formControl.edicionEdit = false;
      component.formControl.edicionAdd = false;

      component.columns = [mockedFormField];

      fixture.detectChanges();

      component.onDialogSave();

      expect(component.formControl.lockFields).toBeTruthy();
    });

    describe('on call to component update row method', () => {
      it('should success', () => {
        const tableName = 'TEST';
        const rows = [{ name: 'TEST_ROW' }];
        const selectedRow = rows[0];

        const mockedFormField = {
          ...FormFieldMock,
          formFieldType: 'gp-form-text-field',
        } as GpFormField;

        component.columns = [mockedFormField];

        const mockObservable = new Observable<CommonRs>((subscriber) =>
          subscriber.next(CommonRsMock)
        );

        component.changes.pipe(take(1)).subscribe((data) => expect(data).toBeTruthy());

        const $tableServiceSpy = spyOn(tableService, 'updateRow').and.returnValue(mockObservable);

        component.data = rows;
        component.selectedRow = selectedRow;
        component.formControl.originalRow = selectedRow;
        component.tableName = tableName;
        component.formControl.editedRow = 'TEST';

        fixture.detectChanges();

        component.onDialogSave();

        expect($tableServiceSpy).toHaveBeenCalled();
      });

      it('should succed on call but return an error', () => {
        const tableName = 'TEST';
        const rows = ['TEST_ROW'];
        const selectedRow = rows[0];

        const mockObservable = new Observable<CommonRs>((subscriber) =>
          subscriber.next(CommonRsErrorMock)
        );

        const $tableServiceSpy = spyOn(tableService, 'updateRow').and.returnValue(mockObservable);
        const $messagesServiceSpy = spyOn(messagesService, 'showErrorAlert');

        component.data = rows;
        component.selectedRow = selectedRow;
        component.formControl.originalRow = selectedRow;
        component.tableName = tableName;
        component.formControl.editedRow = 'TEST';

        component.onDialogSave();

        expect($tableServiceSpy).toHaveBeenCalled();
        expect($messagesServiceSpy).toHaveBeenCalledWith(
          'Error actualizando el registro: ' + CommonRsErrorMock.error.errorMessage
        );
      });

      it('should fail', () => {
        const tableName = 'TEST';
        const rows = ['TEST_ROW'];
        const selectedRow = rows[0];

        const mockObservable = new Observable<CommonRs>((subscriber) => subscriber.error('TEST'));

        const $tableServiceSpy = spyOn(tableService, 'updateRow').and.returnValue(mockObservable);
        const $messagesServiceSpy = spyOn(messagesService, 'showErrorAlert');

        component.data = rows;
        component.selectedRow = selectedRow;
        component.formControl.originalRow = selectedRow;
        component.tableName = tableName;
        component.formControl.editedRow = 'TEST';

        component.onDialogSave();

        expect($tableServiceSpy).toHaveBeenCalled();
        expect($messagesServiceSpy).toHaveBeenCalledWith('Error interno actualizando el registro.');
      });
    });

    describe('on call to component insert row method', () => {
      it('should success', () => {
        const tableName = 'TEST';
        const rows = [];
        const newRow = 'TEST_ROW';

        const mockObservable = new Observable<InsertRowRs>((subscriber) =>
          subscriber.next(InsertRowRsMock)
        );

        const $tableServiceSpy = spyOn(tableService, 'insertRow').and.returnValue(mockObservable);

        component.data = rows;
        component.selectedRow = null;
        component.formControl.originalRow = newRow;
        component.tableName = tableName;
        component.formControl.editedRow = 'TEST';

        component.onDialogSave();

        expect($tableServiceSpy).toHaveBeenCalled();
      });

      it('should success but return an error', () => {
        const tableName = 'TEST';
        const rows = [];
        const newRow = 'TEST_ROW';

        const mockObservable = new Observable<InsertRowRs>((subscriber) =>
          subscriber.next({ ...InsertRowRsMock, ...CommonRsErrorMock })
        );

        const $tableServiceSpy = spyOn(tableService, 'insertRow').and.returnValue(mockObservable);
        const $messagesServiceSpy = spyOn(messagesService, 'showErrorAlert');

        component.data = rows;
        component.selectedRow = null;
        component.formControl.originalRow = newRow;
        component.tableName = tableName;
        component.formControl.editedRow = 'TEST';

        component.onDialogSave();

        expect($tableServiceSpy).toHaveBeenCalled();
        expect($messagesServiceSpy).toHaveBeenCalledWith(
          'Error actualizando el registro: ' + CommonRsErrorMock.error.errorMessage
        );
      });

      it('should fail', () => {
        const tableName = 'TEST';
        const rows = [];
        const newRow = 'TEST_ROW';

        const mockObservable = new Observable<InsertRowRs>((subscriber) =>
          subscriber.error('Error')
        );

        const $tableServiceSpy = spyOn(tableService, 'insertRow').and.returnValue(mockObservable);
        const $messagesServiceSpy = spyOn(messagesService, 'showErrorAlert');

        component.data = rows;
        component.selectedRow = null;
        component.formControl.originalRow = newRow;
        component.tableName = tableName;
        component.formControl.editedRow = 'TEST';

        component.onDialogSave();

        expect($tableServiceSpy).toHaveBeenCalled();
        expect($messagesServiceSpy).toHaveBeenCalledWith('Error interno insertando el registro.');
      });
    });
  });

  describe('on close dialog', () => {
    it('should emit event and reset variables', () => {
      component.dialogErrors = false;

      component.closedDialog.pipe(take(1)).subscribe((data) => expect(data).toBeTruthy());

      component.closeDialog();

      expect(component.displayEdicion).toBeFalsy();
      expect(component.selectedRow).toBeNull();
      expect(component.formControl.originalRow).toBeNull();
      expect(component.formControl.edicionAdd).toBeFalsy();
      expect(component.formControl.edicionEdit).toBeFalsy();
      expect(component.formControl.lockFields).toBeFalsy();
    });

    it('should change table if any dialogErrors', () => {
      const tableName = 'TEST';

      component.dialogErrors = true;
      component.tableName = tableName;

      component.closedDialog.pipe(take(1)).subscribe((data) => expect(data).toBeTruthy());

      const $componentSpy = spyOn(component, 'cambiaTabla');

      component.closeDialog();

      expect(component.displayEdicion).toBeFalsy();
      expect(component.selectedRow).toBeNull();
      expect(component.formControl.originalRow).toBeNull();
      expect(component.formControl.edicionAdd).toBeFalsy();
      expect(component.formControl.edicionEdit).toBeFalsy();
      expect(component.formControl.lockFields).toBeFalsy();

      expect($componentSpy).toHaveBeenCalledWith(tableName);
    });
  });

  describe('on dialog add', () => {
    it('should execute logic from length greater than zero', () => {
      const selectedRow = {};
      const mockedFormField = {
        ...FormFieldMock,
        formFieldType: 'gp-form-text-field',
      } as GpFormField;

      component.columns = [mockedFormField];

      component.selectedRow = selectedRow;
      component.addSelectedCodes = [{ key: 'cansCodi' }];
      component.working = false;
      component.displayEdicion = true;
      component.formControl.edicionEdit = false;
      component.formControl.edicionAdd = false;

      component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toBeNull());

      fixture.detectChanges();

      component.onDialogAdd();

      expect(component.selectedRow).toBeNull();
      expect(component.formControl.originalRow).toBeNull();
      expect(component.formControl.edicionEdit).toBeFalsy();
      expect(component.formControl.edicionAdd).toBeTruthy();
      expect(component.displayEdicion).toBeTruthy();
      expect(component.textFormFields.length).toEqual(1);
    });

    it('should execute logic from length less than zero', () => {
      const selectedRow = {};
      const mockedFormField = {
        ...FormFieldMock,
        formFieldType: 'gp-form-text-field',
      } as GpFormField;

      component.selectedRow = selectedRow;
      component.working = false;
      component.displayEdicion = true;
      component.formControl.edicionEdit = false;
      component.formControl.edicionAdd = false;

      component.columns = [mockedFormField];

      component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toBeNull());

      fixture.detectChanges();

      component.onDialogAdd();

      expect(component.selectedRow).toBeNull();
      expect(component.formControl.originalRow).toBeNull();
      expect(component.formControl.edicionEdit).toBeFalsy();
      expect(component.formControl.edicionAdd).toBeTruthy();
      expect(component.displayEdicion).toBeTruthy();
      expect(component.textFormFields.length).toEqual(1);
    });

    describe('on iterating different types of form fields', () => {
      it('should iterate textarea-field', () => {
        const selectedRow = {};
        const mockedFormField = {
          ...FormFieldMock,
          formFieldType: 'gp-form-textarea-field',
        } as GpFormField;

        component.selectedRow = selectedRow;
        component.working = false;
        component.displayEdicion = true;
        component.formControl.edicionEdit = false;
        component.formControl.edicionAdd = false;

        component.columns = [mockedFormField];

        component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toBeNull());

        fixture.detectChanges();

        component.onDialogAdd();

        expect(component.selectedRow).toBeNull();
        expect(component.formControl.originalRow).toBeNull();
        expect(component.formControl.edicionEdit).toBeFalsy();
        expect(component.formControl.edicionAdd).toBeTruthy();
        expect(component.displayEdicion).toBeTruthy();
        expect(component.textAreaFormFields.length).toEqual(1);
      });

      it('should iterate time-field', () => {
        const selectedRow = {};
        const mockedFormField = {
          ...FormFieldMock,
          formFieldType: 'gp-form-time-field',
        } as GpFormField;

        component.selectedRow = selectedRow;
        component.working = false;
        component.displayEdicion = true;
        component.formControl.edicionEdit = false;
        component.formControl.edicionAdd = false;

        component.columns = [mockedFormField];

        component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toBeNull());

        fixture.detectChanges();

        component.onDialogAdd();

        expect(component.selectedRow).toBeNull();
        expect(component.formControl.originalRow).toBeNull();
        expect(component.formControl.edicionEdit).toBeFalsy();
        expect(component.formControl.edicionAdd).toBeTruthy();
        expect(component.displayEdicion).toBeTruthy();
        expect(component.timeFormFields.length).toEqual(1);
      });

      it('should iterate switch-field', () => {
        const selectedRow = {};
        const mockedFormField = {
          ...FormFieldMock,
          formFieldType: 'gp-form-switch-field',
        } as GpFormField;

        component.selectedRow = selectedRow;
        component.working = false;
        component.displayEdicion = true;
        component.formControl.edicionEdit = false;
        component.formControl.edicionAdd = false;

        component.columns = [mockedFormField];

        component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toBeNull());

        fixture.detectChanges();

        component.onDialogAdd();

        expect(component.selectedRow).toBeNull();
        expect(component.formControl.originalRow).toBeNull();
        expect(component.formControl.edicionEdit).toBeFalsy();
        expect(component.formControl.edicionAdd).toBeTruthy();
        expect(component.displayEdicion).toBeTruthy();
        expect(component.switchFormFields.length).toEqual(1);
      });

      it('should iterate dropdown-field', () => {
        const selectedRow = {};
        const mockedFormField = {
          ...FormFieldMock,
          formFieldType: 'gp-form-dropdown-field',
        } as GpFormField;

        component.selectedRow = selectedRow;
        component.working = false;
        component.displayEdicion = true;
        component.formControl.edicionEdit = false;
        component.formControl.edicionAdd = false;

        component.columns = [mockedFormField];

        component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toBeNull());

        fixture.detectChanges();

        component.onDialogAdd();

        expect(component.selectedRow).toBeNull();
        expect(component.formControl.originalRow).toBeNull();
        expect(component.formControl.edicionEdit).toBeFalsy();
        expect(component.formControl.edicionAdd).toBeTruthy();
        expect(component.displayEdicion).toBeTruthy();
        expect(component.dropdownFormFields.length).toEqual(1);
      });

      it('should iterate dropdown-related-field', () => {
        const selectedRow = {};
        const mockedFormField = {
          ...FormFieldMock,
          formFieldType: 'gp-form-dropdown-related-field',
        } as GpFormField;

        component.selectedRow = selectedRow;
        component.working = false;
        component.displayEdicion = true;
        component.formControl.edicionEdit = false;
        component.formControl.edicionAdd = false;
        component.fieldsChanged = [];

        component.columns = [mockedFormField];

        component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toBeNull());

        fixture.detectChanges();

        component.onDialogAdd();

        expect(component.selectedRow).toBeNull();
        expect(component.formControl.originalRow).toBeNull();
        expect(component.formControl.edicionEdit).toBeFalsy();
        expect(component.formControl.edicionAdd).toBeTruthy();
        expect(component.displayEdicion).toBeTruthy();
        expect(component.dropdownRelatedFormFields.length).toEqual(1);
      });

      it('should iterate checkbox-field', () => {
        const selectedRow = {};
        const mockedFormField = {
          ...FormFieldMock,
          formFieldType: 'gp-form-checkbox-field',
        } as GpFormField;

        component.selectedRow = selectedRow;
        component.working = false;
        component.displayEdicion = true;
        component.formControl.edicionEdit = false;
        component.formControl.edicionAdd = false;

        component.columns = [mockedFormField];

        component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toBeNull());

        fixture.detectChanges();

        component.onDialogAdd();

        expect(component.selectedRow).toBeNull();
        expect(component.formControl.originalRow).toBeNull();
        expect(component.formControl.edicionEdit).toBeFalsy();
        expect(component.formControl.edicionAdd).toBeTruthy();
        expect(component.displayEdicion).toBeTruthy();
        expect(component.checkboxFormFields.length).toEqual(1);
      });

      it('should iterate calendar-field', () => {
        const selectedRow = {};
        const mockedFormField = {
          ...FormFieldMock,
          formFieldType: 'gp-form-calendar-field',
        } as GpFormField;

        component.selectedRow = selectedRow;
        component.working = false;
        component.displayEdicion = true;
        component.formControl.edicionEdit = false;
        component.formControl.edicionAdd = false;

        component.columns = [mockedFormField];

        component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toBeNull());

        fixture.detectChanges();

        component.onDialogAdd();

        expect(component.selectedRow).toBeNull();
        expect(component.formControl.originalRow).toBeNull();
        expect(component.formControl.edicionEdit).toBeFalsy();
        expect(component.formControl.edicionAdd).toBeTruthy();
        expect(component.displayEdicion).toBeTruthy();
        expect(component.calendarFormFields.length).toEqual(1);
      });

      it('should iterate wysiwyg-field', () => {
        const selectedRow = {};
        const mockedFormField = {
          ...FormFieldMock,
          formFieldType: 'gp-form-wysiwyg-field',
        } as GpFormField;

        component.selectedRow = selectedRow;
        component.working = false;
        component.displayEdicion = true;
        component.formControl.edicionEdit = false;
        component.formControl.edicionAdd = false;

        component.columns = [mockedFormField];

        component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toBeNull());

        fixture.detectChanges();

        component.onDialogAdd();

        expect(component.selectedRow).toBeNull();
        expect(component.formControl.originalRow).toBeNull();
        expect(component.formControl.edicionEdit).toBeFalsy();
        expect(component.formControl.edicionAdd).toBeTruthy();
        expect(component.displayEdicion).toBeTruthy();
        expect(component.wysiwygFormFields.length).toEqual(1);
      });

      it('should iterate img-field', () => {
        const selectedRow = {};
        const mockedFormField = {
          ...FormFieldMock,
          formFieldType: 'gp-form-img-field',
        } as GpFormField;

        component.selectedRow = selectedRow;
        component.working = false;
        component.displayEdicion = true;
        component.formControl.edicionEdit = false;
        component.formControl.edicionAdd = false;

        component.columns = [mockedFormField];

        component.rowSelected.pipe(take(1)).subscribe((data) => expect(data).toBeNull());

        fixture.detectChanges();

        component.onDialogAdd();

        expect(component.selectedRow).toBeNull();
        expect(component.formControl.originalRow).toBeNull();
        expect(component.formControl.edicionEdit).toBeFalsy();
        expect(component.formControl.edicionAdd).toBeTruthy();
        expect(component.displayEdicion).toBeTruthy();
        expect(component.imgFormFields.length).toEqual(1);
      });
    });
  });

  describe('on change event', () => {
    it('should add field to fields changed', () => {
      const modifiedField = new InfoCampoModificado('TEST', 'TEST');

      component.changeEvent(modifiedField);

      expect(component.fieldsChanged).toEqual({ TEST: 'TEST' });
    });
  });
});

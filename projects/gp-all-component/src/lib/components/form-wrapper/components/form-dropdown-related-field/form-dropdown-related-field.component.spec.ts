import { TableServiceMockResponse } from '@lib/services/api/table/table.service.mock';
import { TableServiceMock } from '@lib/services/api/table/table.service.mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormDropdownRelatedFieldComponent } from './form-dropdown-related-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '@lib/shared/imports/form-wrapper-shared';
import { FormFieldMock } from '@lib/shared/testing/@mock/types/form-wrapper.type.mock';
import { TableService } from '@lib/services/api/table/table.service';
import { TestingErrorCodeMock } from '@lib/shared/testing/@mock/utils/testing-mock-constants.class';

describe('FormDropdownRelatedFieldComponent', () => {
  let component: FormDropdownRelatedFieldComponent;
  let fixture: ComponentFixture<FormDropdownRelatedFieldComponent>;
  let tableService: TableService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormDropdownRelatedFieldComponent],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDropdownRelatedFieldComponent);
    component = fixture.componentInstance;
    tableService = TestBed.get(TableService);
    // Set spies
    spyOn(component, 'init').and.callThrough();
    spyOn(component, 'processData').and.callThrough();
    spyOn(component, 'relatedFieldsSelected').and.callThrough();
    spyOn(tableService, 'list').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have metadata', () => {
    expect(component.getFieldMetadata()).toBeNull();
  });

  describe('When the field has metadata', () => {
    beforeEach(() => {
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('should have metadata', () => {
      expect(component.getFieldMetadata()).not.toBeNull();
    });

    it('should list', () => {
      expect(component.init).toHaveBeenCalled();
      expect(tableService.list).toHaveBeenCalled();
      expect(component.processData).toHaveBeenCalled();
      expect(component.isDisabled).toBeFalsy();
      expect(component.list.length).toEqual(TableServiceMockResponse.data.length);
      expect(component.relatedFields).toEqual(
        FormFieldMock.fieldMetadata.displayInfo.relatedFields
      );
    });

    describe('Then a related field is changed', () => {
      beforeEach(() => {
        component.relatedField = { name: 'Frederik' };
        fixture.detectChanges();
      });

      it('should update the value', () => {
        expect(component.listAllowedValuesOptions.length).toEqual(1);
        expect(component.relatedFieldsSelected).toHaveBeenCalled();
        expect(component.currentValue).toBeNull();
      });
    });

    describe('Then every related field has been selected', () => {
      beforeEach(() => {
        spyOn(component, 'reset').and.callThrough();
        component.relatedFields = [FormFieldMock.fieldMetadata.displayInfo.relatedFields[0]];
        component.formField.fieldMetadata.displayInfo.relatedFields = [
          FormFieldMock.fieldMetadata.displayInfo.relatedFields[0],
        ];
        fixture.detectChanges();
        component.relatedField = { lang: 'EN' };
        fixture.detectChanges();
      });

      it('should update the value', () => {
        expect(component.relatedFieldsSelected).toHaveBeenCalled();
        expect(component.reset).toHaveBeenCalled();
        expect(component.processData).toHaveBeenCalled();
        expect(component.currentValue).toBeNull();
        expect(component.listAllowedValuesOptions.length).toEqual(6);
      });
    });

    describe('Then every related field has been selected but there is not data for them', () => {
      beforeEach(() => {
        spyOn(component, 'reset').and.callThrough();
        component.relatedFields = [FormFieldMock.fieldMetadata.displayInfo.relatedFields[0]];
        component.formField.fieldMetadata.displayInfo.relatedFields = [
          FormFieldMock.fieldMetadata.displayInfo.relatedFields[0],
        ];
        fixture.detectChanges();
        component.relatedField = { lang: 'NEW_VALUE' };
        fixture.detectChanges();
      });

      it('should update the value', () => {
        expect(component.relatedFieldsSelected).toHaveBeenCalled();
        expect(component.reset).toHaveBeenCalled();
        expect(component.processData).toHaveBeenCalled();
        expect(component.listAllowedValuesOptions.length).toEqual(1);
      });
    });

    describe('Then validateField is called', () => {
      let returnedValue: boolean;

      beforeEach(() => {
        spyOn(component, 'validateFieldAddMsgs').and.callThrough();
        component.formField.fieldMetadata.notNull = false;
        returnedValue = component.validateField();
        fixture.detectChanges();
      });

      it('should return true if notNull prop is false', () => {
        expect(returnedValue).toBeTruthy();
        expect(component.formField.validField).toBeTruthy();
        expect(component.validateFieldAddMsgs).not.toHaveBeenCalled();
      });
    });

    describe('Then copyValueFromControlToEditedRow is called', () => {
      const row = {};
      row[FormFieldMock.fieldMetadata.fieldName] = 'TEST';

      beforeEach(() => {
        component.currentValue = 'B';
      });

      it('should set row', () => {
        component.copyValueFromControlToEditedRow(row);
        fixture.detectChanges();
        expect(row[FormFieldMock.fieldMetadata.fieldName]).toEqual('B');
      });
    });

    describe('Then copyValueFromEditedRowToControl is called', () => {
      const row = {};
      row[FormFieldMock.fieldMetadata.fieldName] = 'A';

      beforeEach(() => {
        component.copyValueFromEditedRowToControl();
      });

      it('should not do nothing', () => {
        expect(component.currentValue).toBeNull();
      });

      it('should get row', () => {
        component.formField.fieldMetadata.notNull = false;
        fixture.detectChanges();
        component.copyValueFromEditedRowToControl(row);
        expect(component.currentValue).toBeTruthy();
      });

      it('should not get row', () => {
        component.formField.fieldMetadata.notNull = true;
        fixture.detectChanges();
        component.copyValueFromEditedRowToControl();
        expect(component.currentValue).toBeFalsy();
      });
    });
  });

  describe('When the field has metadata and no table reference', () => {
    beforeEach(() => {
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      component.formField.fieldMetadata.notNull = true;
      component.formField.fieldMetadata.displayInfo.referencedTable = null;
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('should create', () => {
      expect(component.init).toHaveBeenCalled();
      expect(component.isDisabled).toBeFalsy();
      expect(component.listAllowedValuesOptions.length).toEqual(0);
      expect(component.relatedFields.length).toEqual(
        FormFieldMock.fieldMetadata.displayInfo.relatedFields.length
      );
    });

    describe('Testing validateField method', () => {
      let returnedValue: boolean;

      beforeEach(() => {
        returnedValue = component.validateField();
      });

      it('should return false', () => {
        expect(returnedValue).toBeFalsy();
      });
    });

    describe('Testing reset method', () => {
      beforeEach(() => {
        component.reset();
      });

      it('should have been charged', () => {
        expect(component.list).toBeNull();
        expect(component.processData).not.toHaveBeenCalled();
        expect(component.listAllowedValuesOptions.length).toEqual(1);
      });
    });
  });

  describe('When API call fails', () => {
    beforeEach(() => {
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      component.formField.fieldMetadata.displayInfo.referencedTable =
        TestingErrorCodeMock.ERROR_404;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should return an error', () => {
      expect(component.init).toHaveBeenCalled();
      expect(component.listAllowedValuesOptions.length).toEqual(1);
      expect(component.list).toBeNull();
      expect(tableService.list).toHaveBeenCalled();
    });
  });

  describe('When server is down', () => {
    beforeEach(() => {
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      component.formField.fieldMetadata.displayInfo.referencedTable =
        TestingErrorCodeMock.ERROR_500;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should return an error', () => {
      expect(component.init).toHaveBeenCalled();
      expect(component.listAllowedValuesOptions.length).toEqual(1);
      expect(tableService.list).toHaveBeenCalled();
      expect(component.list).toBeNull();
    });
  });
});

import { TableServiceMockResponse } from '@lib/services/api/table/table.service.mock';
import { TableServiceMock } from '@lib/services/api/table/table.service.mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDropdownRelatedFieldComponent } from './form-dropdown-related-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '@lib/shared/imports/form-wrapper-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormFieldMock } from '@lib/shared/testing/@mock/types/form-wrapper-mock-types';
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

  describe('When the field has metadata', () => {
    beforeEach(() => {
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      component.formField.fieldMetadata.displayInfo.referencedTable = null;
      component.formField.fieldMetadata.notNull = true;
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.init).toHaveBeenCalled();
      expect(component.isDisabled).toBeFalsy();
      expect(component.listAllowedValuesOptions.length).toEqual(0);
      expect(component.relatedFields.length).toEqual(
        FormFieldMock.fieldMetadata.displayInfo.relatedFields.length
      );
    });

    describe('Then validateField is called', () => {
      let returnedValue: boolean;

      beforeEach(() => {
        returnedValue = component.validateField();
        fixture.detectChanges();
      });

      it('should return false', () => {
        expect(returnedValue).toBeFalsy();
      });
    });

    describe('Then reset is called', () => {
      beforeEach(() => {
        component.reset();
      });

      it('should have been charged', () => {
        expect(component.list).toBeUndefined();
        expect(component.processData).not.toHaveBeenCalled();
        expect(component.listAllowedValuesOptions.length).toEqual(1);
      });
    });
  });

  describe('Then reset is called', () => {
    beforeEach(() => {
      component.ngOnInit();
      component.reset();
    });

    it('should have been charged', () => {
      expect(component.list).toBeUndefined();
      expect(component.processData).not.toHaveBeenCalled();
      expect(component.listAllowedValuesOptions.length).toEqual(1);
    });
  });

  describe('Then validateField is called', () => {
    let returnedValue: boolean;

    beforeEach(() => {
      returnedValue = component.validateField();
      fixture.detectChanges();
    });

    it('should return false', () => {
      expect(returnedValue).toBeFalsy();
    });
  });

  it('should not have metadata', () => {
    expect(component.getFieldMetadata()).toBeNull();
  });

  describe('When it has a table reference', () => {
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
      const row = [FormFieldMock.fieldMetadata.fieldName];
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
      const row = [FormFieldMock.fieldMetadata.fieldName];
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

  describe('When there is not related fields', () => {
    beforeEach(() => {
      spyOn(component, 'getLabel').and.callThrough();
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      component.formField.fieldMetadata.displayInfo.relatedFields = [];
      fixture.detectChanges();
    });

    it('should not have options', () => {
      expect(component.relatedFieldsSelected).toHaveBeenCalled();
      expect(component.getLabel).not.toHaveBeenCalled();
      expect(component.relatedFields.length).toEqual(0);
      expect(component.listAllowedValuesOptions.length).toEqual(
        TableServiceMockResponse.data.length + 1
      );
    });
  });

  describe('When there is not valid related fields', () => {
    beforeEach(() => {
      spyOn(component, 'getLabel').and.callThrough();
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      component.formField.fieldMetadata.displayInfo.relatedFields.forEach(
        (field) => (field.value = null)
      );
      fixture.detectChanges();
    });

    it('should not have options', () => {
      expect(component.relatedFieldsSelected).toHaveBeenCalled();
      expect(component.getLabel).toHaveBeenCalled();
      expect(component.relatedFields.length).toEqual(
        FormFieldMock.fieldMetadata.displayInfo.relatedFields.length
      );
      expect(component.listAllowedValuesOptions.length).toEqual(1);
    });

    describe('Then reset is called', () => {
      beforeEach(() => {
        component.reset();
      });

      it('should have been charged', () => {
        expect(component.listAllowedValuesOptions.length).toEqual(1);
        expect(component.listAllowedValuesOptions['0'].label).toEqual(
          'No existen opciones para el valor seleccionado'
        );
      });
    });
  });

  describe('When there is valid related fields', () => {
    beforeEach(() => {
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      component.formField.fieldMetadata.displayInfo.relatedFields = [
        FormFieldMock.fieldMetadata.displayInfo.relatedFields.pop(),
      ];
      fixture.detectChanges();
    });

    it('should have 3 options', () => {
      expect(component.relatedFieldsSelected).toHaveBeenCalled();
      expect(component.relatedFields.length).toEqual(1);
      expect(component.listAllowedValuesOptions.length).toEqual(3);
    });

    describe('Then reset is called', () => {
      beforeEach(() => {
        component.currentValue = 'TESTING-COUNTRY';
        component.reset();
      });

      it('should have been charged', () => {
        expect(component.currentValue).toBeNull();
      });
    });
  });

  describe('When the related field input is set up', () => {
    beforeEach(() => {
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      fixture.detectChanges();
    });

    it('should have 3 options', () => {
      component.relatedField = [FormFieldMock.fieldMetadata.displayInfo.relatedFields[0].field];
      fixture.detectChanges();
      expect(component.relatedFieldsSelected).toHaveBeenCalled();
      expect(component.relatedFields.length).toEqual(
        FormFieldMock.fieldMetadata.displayInfo.relatedFields.length
      );
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

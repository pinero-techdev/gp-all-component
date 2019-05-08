import { TableServiceMockResponse } from './../../../../services/api/table/table.service.mock';
import { TestingErrorCodeMock } from './../../../../shared/testing/@mock/utils/testing-mock-constants.class';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDropdownFieldComponent } from './form-dropdown-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper.type.mock';
import { InfoCampoModificado } from './../../../../resources/data/info-campo-modificado.model';
import { TableServiceMock } from './../../../../services/api/table/table.service.mock';
import { TableService } from './../../../../services/api/table/table.service';

fdescribe('FormDropdownFieldComponent', () => {
  let component: FormDropdownFieldComponent;
  let fixture: ComponentFixture<FormDropdownFieldComponent>;
  let tableService: TableService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormDropdownFieldComponent],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDropdownFieldComponent);
    component = fixture.componentInstance;
    spyOn(component, 'init').and.callThrough();
    component.formField = JSON.parse(JSON.stringify(FormFieldMock));
    tableService = TestBed.get(TableService);
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.init).toHaveBeenCalled();
    expect(component.isDisabled).toBeFalsy();
  });

  describe('When formField is undefined', () => {
    beforeEach(() => {
      component.formField = undefined;
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('should be disabled', () => {
      expect(component.isDisabled).toBeFalsy();
    });

    it('should not have metadata', () => {
      expect(component.getFieldMetadata()).toBeNull();
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

    describe('Then copyValueFromEditedRowToControl is called', () => {
      beforeEach(() => {
        component.copyValueFromEditedRowToControl();
      });

      it('should not do nothing', () => {
        expect(component.currentValueDropDown).toBeNull();
      });
    });

    describe('Then copyValueFromControlToEditedRow is called', () => {
      beforeEach(() => {
        component.copyValueFromControlToEditedRow();
      });

      it('should return false', () => {
        expect(component.formField).toBeUndefined();
      });
    });

    describe('Then getFormField is called', () => {
      it('should return null', () => {
        expect(component.getFormField()).not.toBeUndefined();
        expect(component.getFormField()).toBeNull();
      });
    });
  });

  describe('When formField is filled', () => {
    beforeEach(() => {
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should not be disabled', () => {
      expect(component.isDisabled).toBeFalsy();
    });

    it('should init', () => {
      expect(component.init).toHaveBeenCalled();
      expect(component.listAllowedValuesOptions.length).toBeGreaterThan(0);
    });

    it('should have metadata', () => {
      expect(component.getFieldMetadata()).not.toBeNull();
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

    describe('Then validateField is called', () => {
      let returnedValue: boolean;

      beforeEach(() => {
        spyOn(component, 'validateFieldAddMsgs').and.callThrough();
        returnedValue = component.validateField();
        fixture.detectChanges();
      });

      it('should return false', () => {
        fixture.detectChanges();
        returnedValue = component.validateField();
        expect(returnedValue).toBeFalsy();
        expect(component.formField.validField).toBeFalsy();
        expect(component.validateFieldAddMsgs).toHaveBeenCalled();
      });

      it('should be valid', () => {
        const row = {};
        row[FormFieldMock.fieldMetadata.fieldName] = 'A';
        fixture.detectChanges();
        returnedValue = component.validateField(row);
        expect(returnedValue).toBeTruthy();
      });
    });

    describe('Then copyValueFromEditedRowToControl is called', () => {
      const row = {};
      row[FormFieldMock.fieldMetadata.fieldName] = 'A';
      beforeEach(() => {
        component.copyValueFromEditedRowToControl();
      });

      it('should not do nothing', () => {
        expect(component.currentValueDropDown).toBeNull();
      });

      it('should get row', () => {
        component.formField.fieldMetadata.notNull = false;
        fixture.detectChanges();
        component.copyValueFromEditedRowToControl(row);
        expect(component.currentValueDropDown).toBeTruthy();
      });

      it('should not get row', () => {
        component.formField.fieldMetadata.notNull = true;
        fixture.detectChanges();
        component.copyValueFromEditedRowToControl();
        expect(component.currentValueDropDown).toBeFalsy();
      });
    });

    describe('Then copyValueFromControlToEditedRow is called', () => {
      const row = {};
      row[FormFieldMock.fieldMetadata.fieldName] = 'TEST';

      beforeEach(() => {
        component.currentValueDropDown = 'B';
      });

      it('should set row', () => {
        component.copyValueFromControlToEditedRow(row);
        fixture.detectChanges();
        expect(row[FormFieldMock.fieldMetadata.fieldName]).toEqual('B');
      });
    });

    describe('Then getFormField is called', () => {
      it('should return null', () => {
        expect(component.getFormField()).not.toBeUndefined();
        expect(component.getFormField()).not.toBeNull();
      });
    });

    describe('Then select an option', () => {
      it('should trigger onchange event', () => {
        spyOn(component, 'onChange').and.callThrough();
        const field = new InfoCampoModificado(FormFieldMock.fieldMetadata.fieldName, '1');
        component.valueChanged.first().subscribe((value) => expect(value).toEqual(field));
        component.currentValueDropDown = '1';
        expect(component.onChange).toHaveBeenCalledWith('1');
      });
    });
  });

  describe('When formField is filled with a table reference', () => {
    beforeEach(() => {
      spyOn(tableService, 'list').and.callThrough();
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      component.formField.fieldMetadata.displayInfo.options = [];
    });

    describe('and API call is success', () => {
      beforeEach(() => {
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should not be disabled', () => {
        expect(component.isDisabled).toBeFalsy();
      });

      it('should init', () => {
        expect(component.init).toHaveBeenCalled();
        expect(component.listAllowedValuesOptions.length).toEqual(
          TableServiceMockResponse.data.length + 1
        );
        expect(tableService.list).toHaveBeenCalled();
      });
    });

    describe('and service is down', () => {
      beforeEach(() => {
        component.formField.fieldMetadata.displayInfo.referencedTable =
          TestingErrorCodeMock.ERROR_500;
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should return an error', () => {
        expect(component.init).toHaveBeenCalled();
        expect(component.listAllowedValuesOptions.length).toEqual(1);
        expect(tableService.list).toHaveBeenCalled();
      });
    });

    describe('and API call fails', () => {
      beforeEach(() => {
        component.formField.fieldMetadata.displayInfo.referencedTable =
          TestingErrorCodeMock.ERROR_404;
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should return an error', () => {
        expect(component.init).toHaveBeenCalled();
        expect(component.listAllowedValuesOptions.length).toEqual(1);
        expect(tableService.list).toHaveBeenCalled();
      });
    });
  });
});

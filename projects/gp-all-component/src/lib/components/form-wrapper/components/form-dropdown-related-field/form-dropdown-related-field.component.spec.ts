import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  TableServiceMock,
  TableServiceMockResponse2,
} from '../../../../services/api/table/table.service.mock';
import { TableService } from '../../../../services/api/table/table.service';
import {
  FormFieldDropdownRelated,
  FormFieldDropdownRelatedError,
} from '../../../../shared/testing/@mock/types/form-field.mock';
import { GpFormField } from '../../resources/form-field.model';
import { FormDropdownRelatedFieldComponent } from './form-dropdown-related-field.component';
import { FormFieldValidatorDirective } from '../form-field-validator/form-field-validator.directive';

describe('FormDropdownRelatedFieldComponent', () => {
  let component: FormDropdownRelatedFieldComponent;
  let fixture: ComponentFixture<FormDropdownRelatedFieldComponent>;
  let tableService: TableService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormDropdownRelatedFieldComponent, FormFieldValidatorDirective],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDropdownRelatedFieldComponent);
    component = fixture.componentInstance;
    tableService = TestBed.get(TableService);
    spyOn(tableService, 'list').and.callThrough();
    spyOn(component, 'onChangeEvent').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(tableService).toBeTruthy();
  });

  describe('Scenario: formField is NULL', () => {
    beforeEach(() => {
      component.formField = null;
      fixture.detectChanges();
    });

    it('should NOT call init', () => {
      expect(component.formField).toBeNull();
      expect(component.readonly).toBeFalsy();
      expect(component.required).toBeFalsy();
      expect(component.isDisabled).toBeFalsy();
      expect(component.currentValue).toBeUndefined();
    });
  });

  describe('Scenario: field has not options', () => {
    const value = '1';
    const editRow = { [FormFieldDropdownRelated.fieldMetadata.fieldName]: value };
    const changeEvent = { ['value']: value };

    beforeEach(() => {
      component.formField = new GpFormField().assign(FormFieldDropdownRelated);
      component.currentValue = value;
      fixture.detectChanges();
    });

    describe('Scenario: relatedfield was changed', () => {
      beforeEach(() => {
        component.relatedFields = editRow;
        component.formField = new GpFormField().assign(FormFieldDropdownRelated);
        fixture.detectChanges();
      });

      it('should call table service to list', () => {
        expect(component.isDisabled).toBeFalsy();
        expect(tableService.list).toHaveBeenCalled();
      });

      it('should have N items', () => {
        expect(component.items.length).toEqual(TableServiceMockResponse2.data.length + 1);
      });
    });

    it('should be disabled', () => {
      expect(component.isDisabled).toBeTruthy();
    });

    it('should be mandatory', () => {
      expect(component.required).toEqual(FormFieldDropdownRelated.fieldMetadata.notNull);
    });

    it('should be readonly', () => {
      expect(component.readonly).toEqual(FormFieldDropdownRelated.fieldMetadata.readOnly);
    });

    it('should copy value to editRow', () => {
      component.copyValueFromControlToEditedRow(component.formField.formControl.editedRow);
      expect(component.formField.formControl.editedRow).toEqual(editRow);
    });

    it('should copy value from editRow', () => {
      component.copyValueFromEditedRowToControl(editRow);
      expect(component.currentValue).toEqual(value);
    });

    it('should get the new value', () => {
      component.onChangeEvent(changeEvent);
      expect(component.currentValue).toEqual(value);
      expect(component.formField.validField).toBeTruthy();
      expect(component.formField.formControl.editedRow).toEqual(editRow);
    });
  });

  describe('Scenario: field has not options and service fails', () => {
    beforeEach(() => {
      component.formField = new GpFormField().assign(FormFieldDropdownRelatedError);
      component.relatedFields = { [FormFieldDropdownRelatedError.fieldMetadata.fieldName]: '2' };
      fixture.detectChanges();
    });

    it('should call table service to list', () => {
      expect(tableService.list).toHaveBeenCalled();
    });

    it('should have N items', () => {
      expect(component.items.length).toEqual(1);
    });
  });
});

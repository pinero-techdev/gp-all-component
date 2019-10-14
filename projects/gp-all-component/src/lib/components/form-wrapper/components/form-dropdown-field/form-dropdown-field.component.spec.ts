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
import { FormDropdownFieldComponent } from './form-dropdown-field.component';
import { TableService } from '../../../../services/api/table/table.service';
import {
  FormFieldDropdown,
  FormFieldDropdownError,
  FormFieldDropdownNoOptions,
} from '../../../../shared/testing/@mock/types/form-field.mock';
import { GpFormField } from '../../resources/form-field.model';
import { FormFieldValidatorDirective } from '../form-field-validator/form-field-validator.directive';

describe('FormDropdownFieldComponent', () => {
  let component: FormDropdownFieldComponent;
  let fixture: ComponentFixture<FormDropdownFieldComponent>;
  let tableService: TableService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormDropdownFieldComponent, FormFieldValidatorDirective],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDropdownFieldComponent);
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

  describe('Scenario: field has options', () => {
    const value = '1';
    const editRow = { [FormFieldDropdown.fieldMetadata.fieldName]: value };

    beforeEach(() => {
      component.currentValue = value;
      component.formField = new GpFormField().assign(FormFieldDropdown);
      fixture.detectChanges();
    });

    it('should have N items', () => {
      expect(component.items.length).toEqual(
        FormFieldDropdown.fieldMetadata.displayInfo.options.length
      );
    });

    it('should be enabled', () => {
      expect(component.isDisabled).toBeFalsy();
    });

    it('should be mandatory', () => {
      expect(component.required).toEqual(FormFieldDropdown.fieldMetadata.notNull);
    });

    it('should be readonly', () => {
      expect(component.readonly).toEqual(FormFieldDropdown.fieldMetadata.readOnly);
    });

    it('should copy value to editRow', () => {
      component.copyValueFromControlToEditedRow(component.formField.formControl.editedRow);
      expect(component.formField.formControl.editedRow).toEqual(editRow);
    });

    it('should copy value from editRow', () => {
      component.copyValueFromEditedRowToControl(editRow);
      expect(component.currentValue).toEqual(value);
    });
  });

  describe('Scenario: field has not options', () => {
    const value = 'A';
    const editRow = { [FormFieldDropdownNoOptions.fieldMetadata.fieldName]: value };
    const changeEvent = { ['value']: value };

    beforeEach(() => {
      component.currentValue = value;
      component.formField = new GpFormField().assign(FormFieldDropdownNoOptions);
      fixture.detectChanges();
    });

    it('should call table service to list', () => {
      expect(tableService.list).toHaveBeenCalled();
    });

    it('should have N items', () => {
      expect(component.items.length).toEqual(TableServiceMockResponse2.data.length + 1);
    });

    it('should be enabled', () => {
      expect(component.isDisabled).toBeFalsy();
    });

    it('should be mandatory', () => {
      expect(component.required).toEqual(FormFieldDropdownNoOptions.fieldMetadata.notNull);
    });

    it('should be readonly', () => {
      expect(component.readonly).toEqual(FormFieldDropdownNoOptions.fieldMetadata.readOnly);
    });

    it('should copy value to editRow', () => {
      component.copyValueFromControlToEditedRow(component.formField.formControl.editedRow);
      expect(component.formField.formControl.editedRow).toEqual(editRow);
    });

    it('should copy value from editRow', () => {
      component.copyValueFromEditedRowToControl(editRow);
      expect(component.currentValue).toBeTruthy();
    });

    it('should get the new value', () => {
      spyOn(component, 'onFieldChange').and.callThrough();
      component.onChangeEvent(changeEvent);
      expect(component.currentValue).toEqual(value);
      expect(component.formField.validField).toBeTruthy();
      expect(component.formField.formControl.editedRow).toEqual(editRow);
      expect(component.onFieldChange).toHaveBeenCalled();
    });
  });

  describe('Scenario: field has not options and service fails', () => {
    beforeEach(() => {
      component.formField = new GpFormField().assign(FormFieldDropdownError);
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

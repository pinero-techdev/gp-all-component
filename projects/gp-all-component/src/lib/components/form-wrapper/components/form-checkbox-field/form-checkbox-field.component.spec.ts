import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableServiceMock } from '../../../../services/api/table/table.service.mock';
import { TableService } from '../../../../services/api/table/table.service';
import { FormFieldCheckbox } from '../../../../shared/testing/@mock/types/form-field.mock';
import { GpFormField } from '../../resources/form-field.model';
import { FormCheckboxFieldComponent } from './form-checkbox-field.component';
import { FormFieldValidatorDirective } from '../form-field-validator/form-field-validator.directive';

describe('FormCheckboxFieldComponent', () => {
  let component: FormCheckboxFieldComponent;
  let fixture: ComponentFixture<FormCheckboxFieldComponent>;
  let tableService: TableService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCheckboxFieldComponent, FormFieldValidatorDirective],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckboxFieldComponent);
    component = fixture.componentInstance;
    component.formField = new GpFormField().assign(FormFieldCheckbox);
    tableService = TestBed.get(TableService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(tableService).toBeTruthy();
  });

  describe('Scenario: value is true', () => {
    const value = true;
    const editRow = {
      [FormFieldCheckbox.fieldMetadata.fieldName]:
        FormFieldCheckbox.fieldMetadata.displayInfo.checkedValue,
    };

    it('should copy value to editRow', () => {
      component.currentValue = value;
      component.copyValueFromControlToEditedRow(component.formField.formControl.editedRow);
      expect(component.formField.formControl.editedRow).toEqual(editRow);
    });

    it('should copy value from editRow', () => {
      component.currentValue = null;
      component.formField.formControl.editedRow = editRow;
      component.copyValueFromEditedRowToControl(editRow);
      expect(component.currentValue).toEqual(value);
    });
  });

  describe('Scenario: value is false', () => {
    const value = false;
    const editRow = {
      [FormFieldCheckbox.fieldMetadata.fieldName]:
        FormFieldCheckbox.fieldMetadata.displayInfo.uncheckedValue,
    };

    it('should copy value to editRow', () => {
      component.currentValue = value;
      component.copyValueFromControlToEditedRow(component.formField.formControl.editedRow);
      expect(component.formField.formControl.editedRow).toEqual(editRow);
    });

    it('should copy value from editRow', () => {
      component.currentValue = null;
      component.formField.formControl.editedRow = editRow;
      component.copyValueFromEditedRowToControl(editRow);
      expect(component.currentValue).toEqual(value);
    });
  });
});

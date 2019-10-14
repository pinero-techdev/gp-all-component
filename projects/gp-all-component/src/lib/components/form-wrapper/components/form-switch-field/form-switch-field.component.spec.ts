import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableServiceMock } from '../../../../services/api/table/table.service.mock';
import { TableService } from '../../../../services/api/table/table.service';
import { GpFormField } from '../../resources/form-field.model';
import { FormFieldSwitch } from '../../../../shared/testing/@mock/types/form-field.mock';
import { FormSwitchFieldComponent } from './form-switch-field.component';
import { FormFieldValidatorDirective } from '../form-field-validator/form-field-validator.directive';

describe('FormSwitchFieldComponent', () => {
  let component: FormSwitchFieldComponent;
  let fixture: ComponentFixture<FormSwitchFieldComponent>;
  let tableService: TableService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSwitchFieldComponent, FormFieldValidatorDirective],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSwitchFieldComponent);
    component = fixture.componentInstance;
    component.formField = new GpFormField().assign(FormFieldSwitch);
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
      [FormFieldSwitch.fieldMetadata.fieldName]:
        FormFieldSwitch.fieldMetadata.displayInfo.checkedValue,
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
      [FormFieldSwitch.fieldMetadata.fieldName]:
        FormFieldSwitch.fieldMetadata.displayInfo.uncheckedValue,
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

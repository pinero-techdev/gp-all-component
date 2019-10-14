import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableServiceMock } from '../../../../services/api/table/table.service.mock';
import { TableService } from '../../../../services/api/table/table.service';
import { FormFieldCheckboxNullable } from '../../../../shared/testing/@mock/types/form-field.mock';
import { GpFormField } from '../../resources/form-field.model';
import { FormNullableCheckboxComponent } from './form-nullable-checkbox.component';
import { FormFieldValidatorDirective } from '../form-field-validator/form-field-validator.directive';

describe('FormNullableCheckboxComponent', () => {
  let component: FormNullableCheckboxComponent;
  let fixture: ComponentFixture<FormNullableCheckboxComponent>;
  let tableService: TableService;
  const value = true;
  const editRow = { [FormFieldCheckboxNullable.fieldMetadata.fieldName]: value };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormNullableCheckboxComponent, FormFieldValidatorDirective],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNullableCheckboxComponent);
    component = fixture.componentInstance;
    component.formField = new GpFormField().assign(FormFieldCheckboxNullable);
    tableService = TestBed.get(TableService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(tableService).toBeTruthy();
  });

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

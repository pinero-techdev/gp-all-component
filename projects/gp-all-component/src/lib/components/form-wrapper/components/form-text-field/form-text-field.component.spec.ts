import { FormFieldText } from '../../../../shared/testing/@mock/types/form-field.mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GpFormField } from '../../resources/form-field.model';
import { TableServiceMock } from '../../../../services/api/table/table.service.mock';
import { TableService } from '../../../../services/api/table/table.service';
import { FormTextFieldComponent } from './form-text-field.component';
import { FormFieldValidatorDirective } from '../form-field-validator/form-field-validator.directive';

describe('FormTextFieldComponent', () => {
  let component: FormTextFieldComponent;
  let fixture: ComponentFixture<FormTextFieldComponent>;
  let tableService: TableService;
  const value = 'Lorem ipsum';
  const editRow = { [FormFieldText.fieldMetadata.fieldName]: value.toUpperCase() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormTextFieldComponent, FormFieldValidatorDirective],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextFieldComponent);
    component = fixture.componentInstance;
    component.formField = new GpFormField().assign(FormFieldText);
    tableService = TestBed.get(TableService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(tableService).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(tableService).toBeTruthy();
  });

  it('should have uppercase class', () => {
    expect(component.textboxClass).toEqual(' text-uppercase');
  });

  it('should have uppercase class', () => {
    component.currentValue = '';
    fixture.detectChanges();
    expect(component.textboxClass).toEqual(' text-uppercase');
  });

  it('should trim the value', () => {
    component.currentValue = '    Testing   - -    Text     ';
    fixture.detectChanges();
    expect(component.currentValue).toEqual('Testing   - -    Text'.toUpperCase());
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
    expect(component.currentValue).toEqual(value.toUpperCase());
    expect(component.translationKeys).not.toBeUndefined();
  });
});

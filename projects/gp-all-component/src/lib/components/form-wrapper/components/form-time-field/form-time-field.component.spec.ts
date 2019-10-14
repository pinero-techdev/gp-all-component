import { FormFieldHourTime } from '../../../../shared/testing/@mock/types/form-field.mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GpFormField } from '../../resources/form-field.model';
import { TableServiceMock } from '../../../../services/api/table/table.service.mock';
import { TableService } from '../../../../services/api/table/table.service';
import { FormTimeFieldComponent } from './form-time-field.component';
import { FormFieldValidatorDirective } from '../form-field-validator/form-field-validator.directive';

describe('FormTimeFieldComponent', () => {
  let component: FormTimeFieldComponent;
  let fixture: ComponentFixture<FormTimeFieldComponent>;
  let tableService: TableService;
  const value = '02:12';
  const editRow = { [FormFieldHourTime.fieldMetadata.fieldName]: value };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormTimeFieldComponent, FormFieldValidatorDirective],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTimeFieldComponent);
    component = fixture.componentInstance;
    component.formField = new GpFormField().assign(FormFieldHourTime);
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

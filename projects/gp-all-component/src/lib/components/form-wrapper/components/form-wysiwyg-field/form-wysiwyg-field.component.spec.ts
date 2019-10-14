import { FormFieldWYSIWYG } from '../../../../shared/testing/@mock/types/form-field.mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GpFormField } from '../../resources/form-field.model';
import { TableServiceMock } from '../../../../services/api/table/table.service.mock';
import { TableService } from '../../../../services/api/table/table.service';
import { FormWysiwygFieldComponent } from './form-wysiwyg-field.component';
import { FormFieldValidatorDirective } from '../form-field-validator/form-field-validator.directive';

describe('FormWysiwygFieldComponent', () => {
  let component: FormWysiwygFieldComponent;
  let fixture: ComponentFixture<FormWysiwygFieldComponent>;
  let tableService: TableService;
  const value = '<p>Lorem ipsum <b>Lorem ipsum</b></p>';
  const editRow = { [FormFieldWYSIWYG.fieldMetadata.fieldName]: value.toUpperCase() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormWysiwygFieldComponent, FormFieldValidatorDirective],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWysiwygFieldComponent);
    component = fixture.componentInstance;
    component.formField = new GpFormField().assign(FormFieldWYSIWYG);
    component.currentValue = value;
    tableService = TestBed.get(TableService);
    fixture.detectChanges();
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
  });

  it('should change event', () => {
    const newValue = '<p>Testing ipsum <b>Lorem ipsum</b></p>';
    const changeEvent = { ['htmlValue']: newValue };
    component.onChangeEvent(changeEvent);
    expect(component.currentValue).toEqual(newValue.toUpperCase());
  });
});

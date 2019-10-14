import { FormFieldTextarea } from '../../../../shared/testing/@mock/types/form-field.mock';
import { FormTextAreaFieldComponent } from './form-text-area-field.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GpFormField } from '../../resources/form-field.model';
import { TableServiceMock } from '../../../../services/api/table/table.service.mock';
import { TableService } from '../../../../services/api/table/table.service';
import { FormFieldValidatorDirective } from '../form-field-validator/form-field-validator.directive';

describe('FormTextAreaFieldComponent', () => {
  let component: FormTextAreaFieldComponent;
  let fixture: ComponentFixture<FormTextAreaFieldComponent>;
  let tableService: TableService;
  const value =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
    'Morbi vestibulum ex ligula, eget posuere massa porttitor ' +
    'at. Proin sed sagittis nisi. Aliquam massa orci, porttitor' +
    ' at augue at, interdum dignissim quam. Nulla pretium at ' +
    'eros tristique mollis. Sed nec luctus nibh. Donec faucibus ' +
    'augue id justo ullamcorper, quis ultrices dui fermentum.' +
    ' Duis aliquam mi quis erat scelerisque, sed sodales est ' +
    'vulputate. Pellentesque rutrum elit ut eros tristique, ' +
    'sed eleifend massa tempor. Phasellus neque tellus, ' +
    'pulvinar non efficitur sed, consectetur vitae lectus. ' +
    'Suspendisse ac tellus ligula. Integer eu libero vel ' +
    'nunc dignissim mattis. Curabitur vel ligula a est ' +
    'dictum ultrices. Maecenas vehicula eros quis vehicula porta.';
  const editRow = { [FormFieldTextarea.fieldMetadata.fieldName]: value.toUpperCase() };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormTextAreaFieldComponent, FormFieldValidatorDirective],
      imports: [FormWrapperSharedModules, HttpClientTestingModule],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextAreaFieldComponent);
    component = fixture.componentInstance;
    component.formField = new GpFormField().assign(FormFieldTextarea);
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormNullableCheckboxComponent } from './form-nullable-checkbox.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper.type.mock';

describe('FormCheckboxFieldComponent', () => {
  let component: FormNullableCheckboxComponent;
  let fixture: ComponentFixture<FormNullableCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormNullableCheckboxComponent],
      imports: [FormWrapperSharedModules],
      providers: [FormWrapperSharedProviders],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNullableCheckboxComponent);
    component = fixture.componentInstance;
    component.formField = {
      ...FormFieldMock,
      fieldMetadata: {
        ...FormFieldMock.fieldMetadata,
        displayInfo: {
          ...FormFieldMock.fieldMetadata.displayInfo,
          checkedValue: 'true',
          uncheckedValue: 'false',
        },
      },
    };
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should return formField', () => {
    const formField = FormFieldMock;

    component.formField = formField;

    const returnedFormField = component.getFormField();

    expect(returnedFormField).toEqual(formField);
  });

  it('should return fieldMetadata', () => {
    const formField = FormFieldMock;

    component.formField = formField;

    const metadata = component.getFieldMetadata();

    expect(metadata).toEqual(formField.fieldMetadata);
  });

  it('should copy null value from control to edited row', () => {
    const editedFormField = {
      ...FormFieldMock,
      cansCodi: null,
    };

    component.copyValueFromControlToEditedRow(editedFormField);

    expect(editedFormField[component.formField.fieldMetadata.fieldName]).toBeNull();
  });

  it('should copy value from control to edited row', () => {
    const editedFormField = {
      ...FormFieldMock,
      cansCodi: false,
    };

    component.copyValueFromControlToEditedRow(editedFormField);

    expect(editedFormField[component.formField.fieldMetadata.fieldName]).toBeFalsy();
  });

  it('should copy null value from edited row to control', () => {
    const editedFormField = {
      ...FormFieldMock,
      cansCodi: null,
    };

    component.copyValueFromEditedRowToControl(editedFormField);

    expect(component.currentValue).toBeNull();
  });

  it('should copy value from edited row to control', () => {
    const editedFormField = {
      ...FormFieldMock,
      cansCodi: false,
    };

    component.copyValueFromEditedRowToControl(editedFormField);

    expect(component.currentValue).toBeFalsy();
  });

  describe('on validate', () => {
    it('should pass', () => {
      const validation = component.validateField();

      expect(validation).toBeTruthy();
    });

    it('should fail', () => {
      component.formField = undefined;

      const validation = component.validateField();

      expect(validation).toBeFalsy();
    });
  });
});

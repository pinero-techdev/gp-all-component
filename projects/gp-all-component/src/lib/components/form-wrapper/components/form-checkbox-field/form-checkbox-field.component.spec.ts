import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCheckboxFieldComponent } from './form-checkbox-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { FormFieldMock } from '@lib/shared/testing/@mock/types/form-wrapper.type.mock';

describe('FormCheckboxFieldComponent', () => {
  let component: FormCheckboxFieldComponent;
  let fixture: ComponentFixture<FormCheckboxFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCheckboxFieldComponent],
      imports: [FormWrapperSharedModules],
      providers: [FormWrapperSharedProviders],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckboxFieldComponent);
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

  it('should copy value from control to edited row', () => {
    const editedFormField = {
      ...FormFieldMock,
      cansCodi: false,
    };

    component.copyValueFromControlToEditedRow(editedFormField);

    expect(editedFormField[component.formField.fieldMetadata.fieldName]).toBeTruthy();
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

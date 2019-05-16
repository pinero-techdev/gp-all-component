import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSwitchFieldComponent } from './form-switch-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { GpFormField } from '../../resources/form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper.type.mock';

describe('FormSwitchFieldComponent', () => {
  let component: FormSwitchFieldComponent;
  let fixture: ComponentFixture<FormSwitchFieldComponent>;
  let formField: GpFormField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSwitchFieldComponent],
      imports: [FormWrapperSharedModules],
      providers: [FormWrapperSharedProviders],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSwitchFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no metadata', () => {
    expect(component.getFieldMetadata()).toBeNull();
    expect(component.getFormField()).toBeUndefined();
  });

  describe('on copy value from control to edited row', () => {
    beforeEach(() => {
      formField = FormFieldMock;
      component.formField = formField;
      fixture.detectChanges();
    });

    it('should just copy checkedValue', () => {
      const text = 'testing text';
      const editedFormField = {
        ...FormFieldMock,
        cansCodi: '',
        fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
      };

      component.formField.fieldMetadata.displayInfo.checkedValue = text;
      component.currentValue = text;
      component.copyValueFromControlToEditedRow(editedFormField);

      expect(editedFormField[component.formField.fieldMetadata.fieldName]).toEqual(text);
    });
  });

  describe('on copy value from edited row to control', () => {
    beforeEach(() => {
      formField = FormFieldMock;
      component.formField = formField;
      fixture.detectChanges();
    });

    it('should just copy', () => {
      const text = 'Test text';
      const editedFormField = {
        ...FormFieldMock,
        cansCodi: text,
        fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
      };
      component.formField.fieldMetadata.displayInfo.checkedValue = text;
      component.copyValueFromEditedRowToControl(editedFormField);

      expect(component.currentValue).toBeTruthy();
    });
  });

  describe('on validate field', () => {
    beforeEach(() => {
      formField = FormFieldMock;
      component.formField = formField;
      fixture.detectChanges();
    });

    it('should pass', () => {
      const editedFormField = {
        ...FormFieldMock,
        cansCodi: '',
        fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
      };
      const isValid = component.validateField(editedFormField);

      expect(isValid).toBeTruthy();
    });
  });
});

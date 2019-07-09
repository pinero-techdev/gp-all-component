import { FormNumberFieldComponent } from './form-number-field.component';
import { LocaleES } from '../../../../resources/localization/es-ES.lang';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { GpFormField } from '../../resources/form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper.type.mock';

describe('FormNumberFieldComponent', () => {
  let component: FormNumberFieldComponent;
  let fixture: ComponentFixture<FormNumberFieldComponent>;
  let formField: GpFormField;
  const text = 12345;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormNumberFieldComponent],
      imports: [FormWrapperSharedModules],
      providers: [FormWrapperSharedProviders],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNumberFieldComponent);
    component = fixture.componentInstance;
    formField = FormFieldMock;
    component.formField = formField;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return fieldMetadata', () => {
    const metadata = component.getFieldMetadata();
    expect(metadata).toEqual(component.formField.fieldMetadata);
  });

  describe('on copy value from control to edited row', () => {
    it('should just copy', () => {
      const editedFormField = {
        ...FormFieldMock,
        cansCodi: '',
        fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
      };

      component.formField.fieldMetadata.displayInfo.textProperties = [];

      component.currentValue = text;

      component.copyValueFromControlToEditedRow(editedFormField);

      expect(editedFormField[component.formField.fieldMetadata.fieldName]).toEqual(text);
    });
  });

  describe('on copy value from edited row to control', () => {
    it('should just copy', () => {
      const editedFormField = {
        ...FormFieldMock,
        cansCodi: text,
        fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
      };

      component.copyValueFromEditedRowToControl(editedFormField);

      expect(component.currentValue).toEqual(text);
    });
  });

  describe('on validate field', () => {
    describe('validating not null condition', () => {
      it('should pass', () => {
        const editedFormField = {
          ...FormFieldMock,
          cansCodi: '01:45',
          fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
        };

        const valid = component.validateField(editedFormField);

        expect(valid).toBeTruthy();
        expect(component.formField.validField).toBeTruthy();
      });

      it('should not pass', () => {
        const editedFormField = {
          ...FormFieldMock,
          cansCodi: '',
          fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
        };

        const valid = component.validateField(editedFormField);

        expect(valid).toBeFalsy();
        expect(component.formField.validField).toBeFalsy();
        expect(component.formField.fieldMsgs).toContain({
          severity: 'error',
          detail: LocaleES.VALUE_IS_REQUIRED,
        });
      });
    });
  });
});

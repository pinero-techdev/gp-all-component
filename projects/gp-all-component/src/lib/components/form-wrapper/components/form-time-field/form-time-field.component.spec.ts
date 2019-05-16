import { LocaleES } from './../../../../resources/localization/es-ES.lang';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GpTableRestrictions } from '@lib/components/table-wrapper/resources/gp-table-restrictions.enum';
import { FormTimeFieldComponent } from './form-time-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { GpFormField } from '../../resources/form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper.type.mock';

describe('FormTimeFieldComponent', () => {
  let component: FormTimeFieldComponent;
  let fixture: ComponentFixture<FormTimeFieldComponent>;
  let formField: GpFormField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormTimeFieldComponent],
      imports: [FormWrapperSharedModules],
      providers: [FormWrapperSharedProviders],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTimeFieldComponent);
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

  it('should copy value from edited row to control and get it', () => {
    const editedFormField = {
      ...FormFieldMock,
      cansCodi: '01:45',
      fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
    };

    component.copyValueFromEditedRowToControl(editedFormField);
    component.copyValueFromControlToEditedRow(editedFormField);

    expect(editedFormField[component.formField.fieldMetadata.fieldName]).toBeTruthy();
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

    describe('validate min length', () => {
      it('should pass', () => {
        const editedFormField = {
          ...FormFieldMock,
          cansCodi: '01:45',
          fieldMetadata: {
            ...FormFieldMock.fieldMetadata,
            restrictions: [
              { restrictionType: GpTableRestrictions.MIN_LENGTH, minLength: 5, maxLength: 20 },
            ],
          },
        };

        component.formField = editedFormField;

        const valid = component.validateField(editedFormField);

        expect(valid).toBeTruthy();
        expect(component.formField.validField).toBeTruthy();
      });

      it('should not pass', () => {
        const minLength = 5;
        const editedFormField = {
          ...FormFieldMock,
          cansCodi: '01:4',
          fieldMetadata: {
            ...FormFieldMock.fieldMetadata,
            restrictions: [
              { restrictionType: GpTableRestrictions.MIN_LENGTH, minLength, maxLength: 20 },
            ],
          },
        };

        component.formField = editedFormField;

        const valid = component.validateField(editedFormField);

        expect(valid).toBeFalsy();
        expect(component.formField.validField).toBeFalsy();
        expect(component.formField.fieldMsgs).toContain({
          severity: 'error',
          detail: LocaleES.VALIDATION_VALUE_TOO_SHORT(minLength),
        });
      });
    });

    describe('validate max length', () => {
      it('should pass', () => {
        const maxLength = 5;
        const editedFormField = {
          ...FormFieldMock,
          cansCodi: '01:45',
          fieldMetadata: {
            ...FormFieldMock.fieldMetadata,
            restrictions: [
              { restrictionType: GpTableRestrictions.MAX_LENGTH, maxLength, minLength: 5 },
            ],
          },
        };

        component.formField = editedFormField;

        const valid = component.validateField(editedFormField);

        expect(valid).toBeTruthy();
        expect(component.formField.validField).toBeTruthy();
      });

      it('should not pass', () => {
        const maxLength = 5;
        const editedFormField = {
          ...FormFieldMock,
          cansCodi: '01:434',
          fieldMetadata: {
            ...FormFieldMock.fieldMetadata,
            restrictions: [
              { restrictionType: GpTableRestrictions.MAX_LENGTH, maxLength, minLength: 5 },
            ],
          },
        };

        component.formField = editedFormField;

        const valid = component.validateField(editedFormField);

        expect(valid).toBeFalsy();
        expect(component.formField.validField).toBeFalsy();
        expect(component.formField.fieldMsgs).toContain({
          severity: 'error',
          detail: LocaleES.VALIDATION_VALUE_TOO_LONG(maxLength),
        });
      });
    });
  });
});

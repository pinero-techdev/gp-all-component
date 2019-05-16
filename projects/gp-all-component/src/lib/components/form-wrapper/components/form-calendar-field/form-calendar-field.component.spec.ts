import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocaleES } from '../../../../resources/localization/es-ES.lang';
import { FormCalendarFieldComponent } from './form-calendar-field.component';
import { CommonModule } from '@angular/common';
import { FormWrapperSharedModules } from '../../../../shared/imports/form-wrapper-shared';
import { GpFormField } from '../../resources/form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper.type.mock';

describe('FormCalendarFieldComponent', () => {
  let component: FormCalendarFieldComponent;
  let fixture: ComponentFixture<FormCalendarFieldComponent>;
  let formField: GpFormField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCalendarFieldComponent],
      imports: [CommonModule, FormWrapperSharedModules],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCalendarFieldComponent);
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
      cansCodi: '2015-03-22',
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
          cansCodi: '2015-03-22',
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

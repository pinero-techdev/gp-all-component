import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormWysiwygFieldComponent } from './form-wysiwyg-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { GpFormField } from '../../resources/form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper.type.mock';
import { GpTableRestrictions } from '@lib/components/table-wrapper/resources/gp-table-restrictions.enum';
import { TableService } from '@lib/services/api/table/table.service';
import { LocaleES } from '@lib/resources/localization/es-ES.lang';

describe('FormWysiwygFieldComponent', () => {
  let component: FormWysiwygFieldComponent;
  let fixture: ComponentFixture<FormWysiwygFieldComponent>;
  let formField: GpFormField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormWysiwygFieldComponent],
      imports: [FormWrapperSharedModules],
      providers: [FormWrapperSharedProviders],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWysiwygFieldComponent);
    component = fixture.componentInstance;
    formField = FormFieldMock;
    component.formField = formField;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have metadata', () => {
    const metadata = component.getFieldMetadata();
    expect(metadata).toEqual(component.formField.fieldMetadata);
  });

  describe('on init', () => {
    const minLength = 5;
    const maxLength = 5;

    it('should set min length', () => {
      component.formField.fieldMetadata.restrictions = [
        { maxLength, minLength, restrictionType: GpTableRestrictions.MIN_LENGTH },
      ];
      component.init();
      expect(component.minLength).toEqual(minLength);
    });

    it('should set max length', () => {
      component.formField.fieldMetadata.restrictions = [
        { maxLength, minLength, restrictionType: GpTableRestrictions.MAX_LENGTH },
      ];
      component.init();
      expect(component.maxLength).toEqual(maxLength);
    });

    afterAll(() => {
      component.formField.fieldMetadata.restrictions = [];
    });
  });

  describe('on copy value from control to edited row', () => {
    it('should just copy', () => {
      const text = 'Test text';
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

    it('should convert text to uppercase', () => {
      const text = 'Test text';
      const editedFormField = {
        ...FormFieldMock,
        cansCodi: '',
        fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
      };

      component.currentValue = text;

      component.formField.fieldMetadata.displayInfo.textProperties = [TableService.TEXT_UPPERCASE];

      component.copyValueFromControlToEditedRow(editedFormField);

      expect(component.currentValue).toEqual(text.toUpperCase());
    });

    it('should trim text', () => {
      const text = 'Test text';
      const editedFormField = {
        ...FormFieldMock,
        cansCodi: '',
        fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
      };

      component.currentValue = text;

      component.formField.fieldMetadata.displayInfo.textProperties = [TableService.TEXT_TRIM];

      component.copyValueFromControlToEditedRow(editedFormField);

      expect(component.currentValue).toEqual(text.trim());
    });
  });

  describe('on copy value from edited row to control', () => {
    it('should just copy', () => {
      const text = 'Test text';
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

    describe('validate ascii restrictions ', () => {
      let editedFormField;

      beforeEach(() => {
        component.formField.fieldMetadata.allowAscii = false;

        editedFormField = {
          ...FormFieldMock,
          cansCodi: 'Test text',
        };
      });
      describe('validate space restriction', () => {
        beforeEach(() => {
          component.formField.fieldMetadata.displayInfo.textProperties = [
            TableService.TEXT_NO_SPACE,
          ];
        });

        afterAll(() => {
          component.formField.fieldMetadata.displayInfo.textProperties = [];
        });

        it('should pass', () => {
          const text = 'TextNoSpace';
          editedFormField.cansCodi = text;

          const valid = component.validateField(editedFormField);

          expect(valid).toBeTruthy();
          expect(component.formField.validField).toBeTruthy();
        });

        it('should not pass', () => {
          const text = 'Text With Space';
          editedFormField.cansCodi = text;

          const valid = component.validateField(editedFormField);

          expect(valid).toBeFalsy();
          expect(component.formField.validField).toBeFalsy();
          expect(component.formField.fieldMsgs).toContain({
            severity: 'error',
            detail: LocaleES.VALIDATION_SPACES,
          });
        });
      });

      describe('validate special characters restriction', () => {
        it('should pass', () => {
          const text = `Text with no special characters`;
          editedFormField.cansCodi = text;

          const valid = component.validateField(editedFormField);

          expect(valid).toBeTruthy();
          expect(component.formField.validField).toBeTruthy();
        });

        it('should not pass', () => {
          const text = `T€xt W&th Løts Øf $p€cial ch@racters`;
          editedFormField.cansCodi = text;

          const valid = component.validateField(editedFormField);

          expect(valid).toBeFalsy();
          expect(component.formField.validField).toBeFalsy();
          expect(component.formField.fieldMsgs).toContain({
            severity: 'error',
            detail: LocaleES.VALIDATION_SPECIAL_CHARACTERS,
          });
        });
      });
      describe('validate control space restriction', () => {
        it('should pass', () => {
          const text = `Text No Control Spaces`;
          editedFormField.cansCodi = text;

          const valid = component.validateField(editedFormField);

          expect(valid).toBeTruthy();
          expect(component.formField.validField).toBeTruthy();
        });

        it('should not pass', () => {
          const text = `Text With 
          Control
           Spaces`;
          editedFormField.cansCodi = text;

          const valid = component.validateField(editedFormField);

          expect(valid).toBeFalsy();
          expect(component.formField.validField).toBeFalsy();
          expect(component.formField.fieldMsgs).toContain({
            severity: 'error',
            detail: LocaleES.VALIDATION_CONTROL_SPACES,
          });
        });
      });
    });
  });
});

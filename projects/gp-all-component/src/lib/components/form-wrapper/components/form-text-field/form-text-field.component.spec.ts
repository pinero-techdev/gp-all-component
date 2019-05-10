import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GpTableRestrictions } from '@lib/components/table-wrapper/resources/gp-table-restrictions.enum';
import { TableService } from '@lib/services/api/table/table.service';
import { FormTextFieldComponent } from './form-text-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { GpFormField } from '../../resources/form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper.type.mock';

describe('FormTextFieldComponent', () => {
  let component: FormTextFieldComponent;
  let fixture: ComponentFixture<FormTextFieldComponent>;
  let formField: GpFormField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormTextFieldComponent],
      imports: [FormWrapperSharedModules],
      providers: [FormWrapperSharedProviders],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextFieldComponent);
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

  describe('on inicializa', () => {
    const minLength = 5;
    const maxLength = 5;

    it('should set min length', () => {
      component.formField.fieldMetadata.restrictions = [
        { maxLength, minLength, restrictionType: GpTableRestrictions.MIN_LENGTH },
      ];
      component.inicializa();
      expect(component.minLength).toEqual(minLength);
    });

    it('should set max length', () => {
      component.formField.fieldMetadata.restrictions = [
        { maxLength, minLength, restrictionType: GpTableRestrictions.MAX_LENGTH },
      ];
      component.inicializa();
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

    it('should copy translation keys', () => {
      const text = 'Test text';
      const cansCodiTranslationKey = 'translation.key';
      const editedFormField = {
        ...FormFieldMock,
        cansCodi: text,
        cansCodiTranslationKey,
        fieldMetadata: {
          ...FormFieldMock.fieldMetadata,
          displayInfo: {
            ...FormFieldMock.fieldMetadata.displayInfo,
            translationInfo: {
              ...FormFieldMock.fieldMetadata.displayInfo.translationInfo,
              keyFields: ['cansCodiTranslationKey'],
            },
          },
        },
      };

      component.formField = editedFormField;

      component.copyValueFromEditedRowToControl(editedFormField);

      expect(component.translationKeys).toEqual(cansCodiTranslationKey);
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
          detail: 'El valor es obligatorio.',
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
          detail: 'Valor demasiado corto (longitud mínima ' + minLength + ')',
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
          detail: 'Valor demasiado largo (longitud máxima ' + maxLength + ')',
        });
      });
    });

    describe('validate ascii restriction', () => {
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
            detail: `El valor indicado no puede contener espacios. Han sido
                             eliminados. Seleccione guardar otra vez para aceptar los cambios.`,
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
            detail: `El valor indicado contiene caracteres de control. Han sido
                     sustituidos por espacios. Seleccione guardar
                      otra vez para aceptar los cambios.`,
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
            detail: `El valor indicado contiene caracteres no válidos (acentos, eñes ...).
                     Han sido sustituidos por caracteres equivalentes o descartados.
                      Seleccione guardar otra vez para aceptar los cambios.`,
          });
        });
      });
    });
  });
});

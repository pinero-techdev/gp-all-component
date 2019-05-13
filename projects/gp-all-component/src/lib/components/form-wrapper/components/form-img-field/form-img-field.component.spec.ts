import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormImgFieldComponent } from './form-img-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper.type.mock';
import { TableService } from './../../../../services/api/table/table.service';
import { TableServiceMock } from '@lib/services/api/table/table.service.mock';
import { GpTableRestrictions } from '@lib/components/table-wrapper/resources/gp-table-restrictions.enum';
import { GpFormField } from '../../resources/form-field.model';

fdescribe('FormImgFieldComponent', () => {
  let component: FormImgFieldComponent;
  let fixture: ComponentFixture<FormImgFieldComponent>;
  let formField: GpFormField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormImgFieldComponent],
      imports: [FormWrapperSharedModules],
      providers: [
        FormWrapperSharedProviders,
        { provide: TableService, useClass: TableServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormImgFieldComponent);
    component = fixture.componentInstance;
    // Spies
    spyOn(component, 'inicializa').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have metadata', () => {
    expect(component.getFieldMetadata()).toBeNull();
    expect(component.getFormField()).toBeUndefined();
  });

  describe('When the field has metadata uppercased', () => {
    beforeEach(() => {
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
      component.formField.fieldMetadata.displayInfo.textProperties = ['UPPERCASE'];
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('should have metadata', () => {
      expect(component.getFieldMetadata()).not.toBeNull();
    });

    it('shoud init with text-uppercase', () => {
      expect(component.textboxClass).toEqual('text-uppercase');
    });
  });

  describe('on copy value from control to edited row', () => {
    beforeEach(() => {
      formField = FormFieldMock;
      component.formField = formField;
      fixture.detectChanges();
    });

    it('should just copy', () => {
      const text = 'testing text';
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

    it('convert text to uppercase', () => {
      const text = 'texting text';
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

    it('could not convert to uppercase', () => {
      const editedFormField = {
        ...FormFieldMock,
        cansCodi: '',
        fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
      };
      component.currentValue = null;
      component.formField.fieldMetadata.displayInfo.textProperties = [TableService.TEXT_UPPERCASE];
      component.copyValueFromControlToEditedRow(editedFormField);

      expect(component.currentValue).toBeNull();
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

    it('could not trim text', () => {
      const editedFormField = {
        ...FormFieldMock,
        cansCodi: '',
        fieldMetadata: { ...FormFieldMock.fieldMetadata, notNull: true },
      };

      component.currentValue = null;
      component.formField.fieldMetadata.displayInfo.textProperties = [TableService.TEXT_TRIM];
      component.copyValueFromControlToEditedRow(editedFormField);

      expect(component.currentValue).toBeNull();
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

      component.copyValueFromEditedRowToControl(editedFormField);

      expect(component.currentValue).toEqual(text);
    });
  });

  describe('on validate field', () => {
    describe('validating not null condition', () => {
      beforeEach(() => {
        formField = FormFieldMock;
        component.formField = formField;
        fixture.detectChanges();
      });

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

    describe('validating min length', () => {
      beforeEach(() => {
        formField = FormFieldMock;
        component.formField = formField;
        fixture.detectChanges();
      });

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

    describe('validating max length', () => {
      beforeEach(() => {
        formField = FormFieldMock;
        component.formField = formField;
        fixture.detectChanges();
      });

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

    describe('validating ascii restrictions', () => {
      let editedFormField;

      beforeEach(() => {
        formField = FormFieldMock;
        component.formField = formField;
        component.formField.fieldMetadata.allowAscii = false;
        editedFormField = {
          ...FormFieldMock,
          cansCodi: 'Test text',
        };
        fixture.detectChanges();
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
        });
      });
    });
  });

  describe('Has field restrictions', () => {
    const minLength = 12;
    const maxLength = 20;

    beforeEach(() => {
      component.formField = JSON.parse(JSON.stringify(FormFieldMock));
    });

    it('field has min length restriction of 12', () => {
      component.formField.fieldMetadata.restrictions = [
        {
          minLength,
          maxLength,
          restrictionType: GpTableRestrictions.MIN_LENGTH,
        },
      ];
      fixture.detectChanges();
      component.ngOnInit();
      expect(component.minLength).toEqual(12);
    });

    it('field has MAX length restriction of 20', () => {
      component.formField.fieldMetadata.restrictions = [
        {
          minLength,
          maxLength,
          restrictionType: GpTableRestrictions.MAX_LENGTH,
        },
      ];
      fixture.detectChanges();
      component.ngOnInit();
      expect(component.maxLength).toEqual(20);
    });
  });
});

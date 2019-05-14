import { MessagesService } from './../../../../services/core/messages.service';
import { MultiLanguageServiceMock } from './../../../../services/api/multi-language/multi-language.service.mock';
import { TranslationInfo } from './../../../../resources/data/translation-info.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTextAreaFieldComponent } from './form-text-area-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper.type.mock';
import { MultiLanguageService } from './../../../../services/api/multi-language/multi-language.service';
import { TableService } from '@lib/services/api/table/table.service';

describe('FormTextAreaFieldComponent', () => {
  let component: FormTextAreaFieldComponent;
  let fixture: ComponentFixture<FormTextAreaFieldComponent>;
  let $elementRef: HTMLElement;
  const formField = JSON.parse(JSON.stringify(FormFieldMock));
  const description =
    'orem ipsum dolor sit amet, consectetur adipiscing elit. ' +
    'Duis consequat enim arcu, non ornare augue convallis id.Mauris sed volutpat mi.Pellentesque';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormTextAreaFieldComponent],
      imports: [FormWrapperSharedModules],
      providers: [
        FormWrapperSharedProviders,
        MessagesService,
        { provide: MultiLanguageService, useClass: MultiLanguageServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextAreaFieldComponent);
    component = fixture.componentInstance;
    formField.formFieldType = 'gp-form-textarea-field';
    formField.field = 'description';
    formField.fieldMetadata.fieldName = 'description';
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When the formField is filled', () => {
    beforeEach(() => {
      component.formField = formField;
      fixture.detectChanges();
    });

    it('should have 1 row', () => {
      expect(component).toBeTruthy();
      expect(component.rows).toEqual(component.formField.fieldMetadata.displayInfo.rowsTextArea);
    });

    describe('Then the translate info is filled', () => {
      const translationInfo = new TranslationInfo();
      const editedRow = {
        description,
        A: 'Test 1',
        B: 'Test 2',
        C: 'Test 3',
      };

      beforeEach(() => {
        translationInfo.keyFields = ['A', 'B', 'C'];
        component.formField.fieldMetadata.displayInfo.translationInfo = null;
        component.ngOnInit();
        fixture.detectChanges();
        $elementRef = fixture.debugElement.nativeElement;
      });

      it('should show multi-language component', () => {
        component.formField.fieldMetadata.displayInfo.translationInfo = translationInfo;
        fixture.detectChanges();
        component.copyValueFromEditedRowToControl(editedRow);
        fixture.detectChanges();
        expect(component.isDisabled).toBeFalsy();
        expect(component.currentValue).toEqual(description);
        expect(component.translateInfo.keyFields.length).toEqual(translationInfo.keyFields.length);
        expect(component.translationKeys).toEqual('Test 1Test 2Test 3');
        expect($elementRef.querySelector('gp-multi-language')).not.toBeNull();
      });

      it('should not show multi-language component when editedRow is undefined', () => {
        component.copyValueFromEditedRowToControl();
        fixture.detectChanges();
        expect(component.isDisabled).toBeFalsy();
        expect(component.currentValue).toBeUndefined();
        expect(component.translationKeys).toBeUndefined();
        expect($elementRef.querySelector('gp-multi-language')).toBeNull();
      });

      it('should not show multi-language component', () => {
        component.copyValueFromEditedRowToControl(editedRow);
        fixture.detectChanges();
        expect(component.isDisabled).toBeFalsy();
        expect(component.currentValue).toEqual(description);
        expect(component.translateInfo).toBeNull();
        expect(component.translationKeys).toBeFalsy();
        expect($elementRef.querySelector('gp-multi-language')).toBeNull();
      });
    });

    describe('Then check validations when is required', () => {
      const editedRow = {
        description: null,
        A: 'Test 1',
        B: 'Test 2',
        C: 'Test 3',
      };

      let isValid = false;

      beforeEach(() => {
        component.ngOnInit();
        component.formField.fieldMetadata.notNull = true;
        fixture.detectChanges();
        $elementRef = fixture.debugElement.nativeElement;
      });

      it('should not be valid', () => {
        editedRow.description = null;
        isValid = component.validateField(editedRow);
        fixture.detectChanges();
        expect(isValid).toBeFalsy();
      });

      it('should be valid', () => {
        editedRow.description = description;
        isValid = component.validateField(editedRow);
        fixture.detectChanges();
        expect(isValid).toBeTruthy();
      });
    });

    describe('Then copy value to edited row', () => {
      const editedRow = {
        description: null,
        A: 'Test 1',
        B: 'Test 2',
        C: 'Test 3',
      };

      beforeEach(() => {
        component.ngOnInit();
        fixture.detectChanges();
        $elementRef = fixture.debugElement.nativeElement;
      });

      it('should be null', () => {
        component.currentValue = null;
        editedRow.description = null;
        component.copyValueFromControlToEditedRow(editedRow);
        fixture.detectChanges();
        expect(editedRow.description).toBeNull();
      });

      it('should not be valid', () => {
        editedRow.description = null;
        component.currentValue = description;
        component.copyValueFromControlToEditedRow(editedRow);
        fixture.detectChanges();
        expect(editedRow.description).toEqual(description);
      });

      it('should copy currentValue TRIM property', () => {
        component.currentValue = description;
        fixture.detectChanges();
        editedRow.description = description;
        component.formField.fieldMetadata.displayInfo.textProperties = [TableService.TEXT_TRIM];
        component.copyValueFromControlToEditedRow(editedRow);
        fixture.detectChanges();
        expect(editedRow.description).toEqual(description.trim());
      });

      it('should copy currentValue UPPERCASE property', () => {
        component.currentValue = description;
        editedRow.description = description;
        component.formField.fieldMetadata.displayInfo.textProperties = [
          TableService.TEXT_UPPERCASE,
        ];
        fixture.detectChanges();
        component.copyValueFromControlToEditedRow(editedRow);
        fixture.detectChanges();
        expect(editedRow.description).toEqual(description.toUpperCase());
      });
    });
  });
});

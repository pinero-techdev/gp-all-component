import { TestingMockEvents } from './../../../../shared/testing/@mock/utils/testing-mock-events.class';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckboxFieldComponent } from './form-checkbox-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper-mock-types';
// import { GpFormField } from '../../resources/form-field.model';

describe('FormCheckboxFieldComponent', () => {
  let component: FormCheckboxFieldComponent;
  let fixture: ComponentFixture<FormCheckboxFieldComponent>;
  let $checkbox: HTMLElement;

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
    $checkbox = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When formField is undefined', () => {
    beforeEach(() => {
      component.formField = undefined;
      fixture.detectChanges();
    });

    it('should not have metadata', () => {
      expect(component.getFieldMetadata()).toBeNull();
    });

    // describe('When checkbox is clicked', () => {
    //   let $checkboxElement;

    //   beforeEach(() => {
    //     spyOn(component, 'onFieldChange').and.callThrough();
    //     // console.log('BLABLA', component.formField);
    //     spyOn(component, 'copyValueFromControlToEditedRow').and.callThrough();
    //     $checkboxElement = $checkbox.querySelector('input[type="checkbox"]');
    //   });

    //   it('should call onFieldChange function', () => {
    //     TestingMockEvents.triggerChangeEvent($checkboxElement);
    //     fixture.detectChanges();
    //     expect(component.onFieldChange).toHaveBeenCalled();
    //     expect(component.copyValueFromControlToEditedRow).toHaveBeenCalled();
    //   });
    // });

    describe('Then validateField is called', () => {
      let returnedValue: boolean;

      beforeEach(() => {
        returnedValue = component.validateField();
        fixture.detectChanges();
      });

      it('should return true', () => {
        expect(returnedValue).toBeUndefined();
        expect(component.formField).toBeUndefined();
      });
    });
  });

  describe('When formField is filled', () => {
    beforeEach(() => {
      component.formField = FormFieldMock;
      fixture.detectChanges();
    });

    it('should have metadata', () => {
      expect(component.getFieldMetadata()).not.toBeNull();
    });

    describe('When checkbox is clicked', () => {
      let $checkboxElement;

      beforeEach(() => {
        spyOn(component, 'onFieldChange').and.callThrough();
        // console.log('BLABLA', component.formField);
        spyOn(component, 'copyValueFromControlToEditedRow').and.callThrough();
        $checkboxElement = $checkbox.querySelector('input[type="checkbox"]');
      });

      it('should call onFieldChange function', () => {
        TestingMockEvents.triggerChangeEvent($checkboxElement);
        fixture.detectChanges();
        expect(component.onFieldChange).toHaveBeenCalled();
        expect(component.copyValueFromControlToEditedRow).toHaveBeenCalled();
      });
    });

    describe('Then validateField is called', () => {
      let returnedValue: boolean;

      beforeEach(() => {
        returnedValue = component.validateField();
        fixture.detectChanges();
      });

      it('should return true', () => {
        expect(returnedValue).toBeTruthy();
        expect(component.formField).not.toBeUndefined();
        expect(component.formField.fieldMsgs).toBeNull();
      });
    });
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDropdownFieldComponent } from './form-dropdown-field.component';
import {
    FormWrapperSharedModules,
    FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper-mock-types';
import { DebugElement } from '@angular/core';

fdescribe('FormDropdownFieldComponent', () => {
    let component: FormDropdownFieldComponent;
    let fixture: ComponentFixture<FormDropdownFieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDropdownFieldComponent],
            imports: [FormWrapperSharedModules, HttpClientTestingModule],
            providers: [FormWrapperSharedProviders],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDropdownFieldComponent);
        component = fixture.componentInstance;
        spyOn(component, 'init').and.callThrough();
        component.formField = FormFieldMock;
        fixture.detectChanges();
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.init).toHaveBeenCalled();
        expect(component.isDisabled).toBeFalsy();
    });

    describe('When formField is undefined', () => {
        beforeEach(() => {
            component.formField = undefined;
            component.ngOnInit();
            fixture.detectChanges();
        });

        it('should be disabled', () => {
            expect(component.isDisabled).toBeFalsy();
        });

        describe('Then validateField is called', () => {
            let returnedValue: boolean;

            beforeEach(() => {
                returnedValue = component.validateField();
                fixture.detectChanges();
            });

            it('should return false', () => {
                expect(returnedValue).toBeFalsy();
                expect(component.formField.validField).toBeFalsy();
            });
        });

        describe('Then copyValueFromEditedRowToControl is called', () => {
            beforeEach(() => {
                component.copyValueFromEditedRowToControl();
            });

            it('should not do nothing', () => {
                expect(component.currentValueDropDown).toBeNull();
            });
        });

        describe('Then copyValueFromControlToEditedRow is called', () => {
            beforeEach(() => {
                component.copyValueFromControlToEditedRow();
            });

            it('should return false', () => {
                expect(component.formField).toBeUndefined();
            });
        });

        describe('Then getFormField is called', () => {
            it('should return null', () => {
                expect(component.getFormField()).not.toBeUndefined();
                expect(component.getFormField()).toBeNull();
            });
        });
    });

    describe('When formField is filled', () => {
        beforeEach(() => {
            component.formField = FormFieldMock;
            component.ngOnInit();
            fixture.detectChanges();
        });

        it('should not be disabled', () => {
            expect(component.isDisabled).toBeTruthy();
        });

        it('should init', () => {
            expect(component.init).toHaveBeenCalled();
            expect(component.listAllowedValuesOptions.length).toBeGreaterThan(0);
        });

        describe('Then validateField is called', () => {
            let returnedValue: boolean;

            beforeEach(() => {
                spyOn(component, 'validateFieldAddMsgs').and.callThrough();

                returnedValue = component.validateField();
                fixture.detectChanges();
            });

            it('should return true', () => {
                expect(returnedValue).toBeTruthy();
                expect(component.formField.validField).toBeTruthy();
                expect(component.validateFieldAddMsgs).not.toHaveBeenCalled();
            });

            it('should return false', () => {
                component.formField.fieldMetadata.notNull = true;
                fixture.detectChanges();
                returnedValue = component.validateField();
                expect(returnedValue).toBeFalsy();
                expect(component.formField.validField).toBeFalsy();
                expect(component.validateFieldAddMsgs).toHaveBeenCalled();
            });

            it('should be valid', () => {
                const row = [FormFieldMock.fieldMetadata.fieldName];
                row[FormFieldMock.fieldMetadata.fieldName] = 'A';
                component.formField.fieldMetadata.notNull = false;
                fixture.detectChanges();
                returnedValue = component.validateField(row);
                expect(returnedValue).toBeTruthy();
            });
        });

        describe('Then copyValueFromEditedRowToControl is called', () => {
            const row = [FormFieldMock.fieldMetadata.fieldName];
            row[FormFieldMock.fieldMetadata.fieldName] = 'A';
            beforeEach(() => {
                component.copyValueFromEditedRowToControl();
            });

            it('should not do nothing', () => {
                expect(component.currentValueDropDown).toBeNull();
            });

            it('should get row', () => {
                component.formField.fieldMetadata.notNull = false;
                fixture.detectChanges();
                component.copyValueFromEditedRowToControl(row);
                expect(component.currentValueDropDown).toBeTruthy();
            });

            it('should not get row', () => {
                component.formField.fieldMetadata.notNull = true;
                fixture.detectChanges();
                component.copyValueFromEditedRowToControl();
                expect(component.currentValueDropDown).toBeFalsy();
            });
        });

        describe('Then copyValueFromControlToEditedRow is called', () => {
            const row = [FormFieldMock.fieldMetadata.fieldName];
            row[FormFieldMock.fieldMetadata.fieldName] = 'TEST';

            beforeEach(() => {
                component.currentValueDropDown = 'B';
            });

            it('should set row', () => {
                component.copyValueFromControlToEditedRow(row);
                fixture.detectChanges();
                expect(row[FormFieldMock.fieldMetadata.fieldName]).toEqual('B');
            });
        });

        describe('Then getFormField is called', () => {
            it('should return null', () => {
                expect(component.getFormField()).not.toBeUndefined();
                expect(component.getFormField()).not.toBeNull();
            });
        });

        fdescribe('Then select an option', () => {
            it('should trigger onchange event', () => {
                const debugElement: DebugElement = fixture.debugElement;
                // debugElement.query('')
            });
        });
    });
});

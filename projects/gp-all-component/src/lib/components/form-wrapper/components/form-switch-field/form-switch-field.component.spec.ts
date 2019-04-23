import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSwitchFieldComponent } from './form-switch-field.component';
import {
    FormWrapperSharedModules,
    FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { GpFormField } from '../../resources/gp-form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper-mock-types';

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
        formField = FormFieldMock;
        component.formField = formField;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

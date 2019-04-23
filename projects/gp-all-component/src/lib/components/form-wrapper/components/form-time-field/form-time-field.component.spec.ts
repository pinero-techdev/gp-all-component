import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTimeFieldComponent } from './form-time-field.component';
import {
    FormWrapperSharedModules,
    FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { GpFormField } from '../../resources/gp-form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper-mock-types';

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
});

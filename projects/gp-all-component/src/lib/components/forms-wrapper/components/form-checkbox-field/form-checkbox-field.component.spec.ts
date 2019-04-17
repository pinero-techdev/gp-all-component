import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckboxFieldComponent } from './form-checkbox-field.component';
import {
    FormsWrapperCommonModules,
    FormsWrapperCommonProviders,
} from '../../common/common.imports';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/forms-wrapper-mock-types';
import { GpFormField } from '../../resources/gp-form-field.model';

describe('FormCheckboxFieldComponent', () => {
    let component: FormCheckboxFieldComponent;
    let fixture: ComponentFixture<FormCheckboxFieldComponent>;
    let formField: GpFormField;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormCheckboxFieldComponent],
            imports: [FormsWrapperCommonModules],
            providers: [FormsWrapperCommonProviders],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormCheckboxFieldComponent);
        component = fixture.componentInstance;
        formField = FormFieldMock;
        component.formField = formField;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

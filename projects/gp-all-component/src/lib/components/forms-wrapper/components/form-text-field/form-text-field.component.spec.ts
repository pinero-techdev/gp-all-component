import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTextFieldComponent } from './form-text-field.component';
import {
    FormsWrapperCommonModules,
    FormsWrapperCommonProviders,
} from '../../common/common.imports';
import { GpFormField } from '../../resources/gp-form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/forms-wrapper-mock-types';

describe('FormTextFieldComponent', () => {
    let component: FormTextFieldComponent;
    let fixture: ComponentFixture<FormTextFieldComponent>;
    let formField: GpFormField;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTextFieldComponent],
            imports: [FormsWrapperCommonModules],
            providers: [FormsWrapperCommonProviders],
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
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTextAreaFieldComponent } from './form-text-area-field.component';
import {
    FormsWrapperCommonModules,
    FormsWrapperCommonProviders,
} from '../../common/common.imports';
import { GpFormField } from '../../resources/gp-form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/forms-wrapper-mock-types';

describe('FormTextAreaFieldComponent', () => {
    let component: FormTextAreaFieldComponent;
    let fixture: ComponentFixture<FormTextAreaFieldComponent>;
    let formField: GpFormField;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTextAreaFieldComponent],
            imports: [FormsWrapperCommonModules],
            providers: [FormsWrapperCommonProviders],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormTextAreaFieldComponent);
        component = fixture.componentInstance;
        formField = FormFieldMock;
        component.formField = formField;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

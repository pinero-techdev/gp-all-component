import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTimeFieldComponent } from './form-time-field.component';
import {
    FormsWrapperCommonModules,
    FormsWrapperCommonProviders,
} from '../../common/common.imports';
import { GpFormField } from '../../resources/gp-form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/forms-wrapper-mock-types';

describe('FormTimeFieldComponent', () => {
    let component: FormTimeFieldComponent;
    let fixture: ComponentFixture<FormTimeFieldComponent>;
    let formField: GpFormField;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormTimeFieldComponent],
            imports: [FormsWrapperCommonModules],
            providers: [FormsWrapperCommonProviders],
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

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDropdownFieldComponent } from './form-dropdown-field.component';
import {
    FormsWrapperCommonModules,
    FormsWrapperCommonProviders,
} from '../../common/common.imports';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/forms-wrapper-mock-types';
import { GpFormField } from '../../resources/gp-form-field.model';

describe('FormDropdownFieldComponent', () => {
    let component: FormDropdownFieldComponent;
    let fixture: ComponentFixture<FormDropdownFieldComponent>;
    let formField: GpFormField;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDropdownFieldComponent],
            imports: [FormsWrapperCommonModules, HttpClientTestingModule],
            providers: [FormsWrapperCommonProviders],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDropdownFieldComponent);
        component = fixture.componentInstance;
        formField = FormFieldMock;
        component.formField = formField;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

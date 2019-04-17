import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormDropdownRelatedFieldComponent } from './form-dropdown-related-field.component';
import {
    FormsWrapperCommonModules,
    FormsWrapperCommonProviders,
} from '../../common/common.imports';
import { GpFormField } from '../../resources/gp-form-field.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/forms-wrapper-mock-types';

describe('FormDropdownRelatedFieldComponent', () => {
    let component: FormDropdownRelatedFieldComponent;
    let fixture: ComponentFixture<FormDropdownRelatedFieldComponent>;
    let formField: GpFormField;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormDropdownRelatedFieldComponent],
            imports: [FormsWrapperCommonModules, HttpClientTestingModule],
            providers: [FormsWrapperCommonProviders],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormDropdownRelatedFieldComponent);
        component = fixture.componentInstance;
        formField = FormFieldMock;
        component.formField = formField;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

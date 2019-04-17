import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormImgFieldComponent } from './form-img-field.component';
import {
    FormsWrapperCommonModules,
    FormsWrapperCommonProviders,
} from '../../common/common.imports';
import { GpFormField } from '../../resources/gp-form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/forms-wrapper-mock-types';

describe('FormImgFieldComponent', () => {
    let component: FormImgFieldComponent;
    let fixture: ComponentFixture<FormImgFieldComponent>;
    let formField: GpFormField;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormImgFieldComponent],
            imports: [FormsWrapperCommonModules],
            providers: [FormsWrapperCommonProviders],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormImgFieldComponent);
        component = fixture.componentInstance;
        formField = FormFieldMock;
        component.formField = formField;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

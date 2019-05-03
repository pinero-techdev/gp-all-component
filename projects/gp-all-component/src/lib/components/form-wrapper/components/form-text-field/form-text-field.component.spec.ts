import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTextFieldComponent } from './form-text-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { GpFormField } from '../../resources/form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper-mock-types';

describe('FormTextFieldComponent', () => {
  let component: FormTextFieldComponent;
  let fixture: ComponentFixture<FormTextFieldComponent>;
  let formField: GpFormField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormTextFieldComponent],
      imports: [FormWrapperSharedModules],
      providers: [FormWrapperSharedProviders],
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

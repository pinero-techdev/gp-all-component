import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckboxFieldComponent } from './form-checkbox-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper.type.mock';
import { GpFormField } from '../../resources/form-field.model';

describe('FormCheckboxFieldComponent', () => {
  let component: FormCheckboxFieldComponent;
  let fixture: ComponentFixture<FormCheckboxFieldComponent>;
  let formField: GpFormField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCheckboxFieldComponent],
      imports: [FormWrapperSharedModules],
      providers: [FormWrapperSharedProviders],
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

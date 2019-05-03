import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTextAreaFieldComponent } from './form-text-area-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';
import { GpFormField } from '../../resources/form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper-mock-types';

describe('FormTextAreaFieldComponent', () => {
  let component: FormTextAreaFieldComponent;
  let fixture: ComponentFixture<FormTextAreaFieldComponent>;
  let formField: GpFormField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormTextAreaFieldComponent],
      imports: [FormWrapperSharedModules],
      providers: [FormWrapperSharedProviders],
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCheckboxFieldComponent } from './form-checkbox-field.component';
import {
  FormWrapperSharedModules,
  FormWrapperSharedProviders,
} from '../../../../shared/imports/form-wrapper-shared';

describe('FormCheckboxFieldComponent', () => {
  let component: FormCheckboxFieldComponent;
  let fixture: ComponentFixture<FormCheckboxFieldComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

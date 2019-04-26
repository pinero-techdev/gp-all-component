import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCalendarFieldComponent } from './form-calendar-field.component';
import { CommonModule } from '@angular/common';
import { FormWrapperSharedModules } from '../../../../shared/imports/form-wrapper-shared';
import { GpFormField } from '../../resources/form-field.model';
import { FormFieldMock } from '../../../../shared/testing/@mock/types/form-wrapper-mock-types';

describe('FormCalendarFieldComponent', () => {
  let component: FormCalendarFieldComponent;
  let fixture: ComponentFixture<FormCalendarFieldComponent>;
  let formField: GpFormField;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCalendarFieldComponent],
      imports: [CommonModule, FormWrapperSharedModules],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCalendarFieldComponent);
    component = fixture.componentInstance;
    formField = FormFieldMock;
    component.formField = formField;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

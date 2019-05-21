import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckboxFieldTesterComponent } from './form-checkbox-field-tester.component';

describe('DropdownTesterComponent', () => {
  let component: FormCheckboxFieldTesterComponent;
  let fixture: ComponentFixture<FormCheckboxFieldTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCheckboxFieldTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckboxFieldTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSwitchFieldTesterComponent } from './form-switch-field-tester.component';

describe('FormSwitchFieldComponent', () => {
  let component: FormSwitchFieldTesterComponent;
  let fixture: ComponentFixture<FormSwitchFieldTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSwitchFieldTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSwitchFieldTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

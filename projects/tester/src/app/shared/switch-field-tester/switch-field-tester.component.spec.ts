import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchFieldTesterComponent } from './switch-field-tester.component';

describe('FormSwitchFieldComponent', () => {
  let component: SwitchFieldTesterComponent;
  let fixture: ComponentFixture<SwitchFieldTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchFieldTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchFieldTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

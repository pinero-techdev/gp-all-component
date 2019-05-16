import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFieldTesterComponent } from './time-field-tester.component';

describe('TimeFieldTesterComponent', () => {
  let component: TimeFieldTesterComponent;
  let fixture: ComponentFixture<TimeFieldTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeFieldTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFieldTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

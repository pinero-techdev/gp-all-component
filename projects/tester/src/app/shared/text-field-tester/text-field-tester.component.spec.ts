import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldTesterComponent } from './text-field-tester.component';

describe('TextFieldTesterComponent', () => {
  let component: TextFieldTesterComponent;
  let fixture: ComponentFixture<TextFieldTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextFieldTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

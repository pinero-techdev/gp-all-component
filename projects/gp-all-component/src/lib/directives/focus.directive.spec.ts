import { FocusDirective } from './focus.directive';

import { FormsModule, NgControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `
    <input type="text" gp-focus />
  `,
})
class TestFocusComponent {}

describe('FocusDirective', () => {
  let component: TestFocusComponent;
  let fixture: ComponentFixture<TestFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FocusDirective, TestFocusComponent],
      imports: [FormsModule],
      providers: [NgControl],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
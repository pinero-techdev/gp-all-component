import { FocusDirective } from './focus.directive';

import { FormsModule, NgControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <input type="text" gpFocus />
    <div gpFocus>
      <input type="text" />
    </div>
  `,
})
class TestFocusComponent {}

describe('FocusDirective: Input element', () => {
  let component: TestFocusComponent;
  let fixture: ComponentFixture<TestFocusComponent>;
  let inputEl: DebugElement;

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
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('focus on input element', () => {
    const inputEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    inputEl.nativeElement.dispatchEvent(inputEvent);

    fixture.detectChanges();

    expect(inputEl.nativeElement.focus).toBeTruthy();
  });

  describe('FocusDirective: Not input element', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestFocusComponent);
      component = fixture.componentInstance;
      inputEl = fixture.debugElement.query(By.css('div'));
    });

    it('focus on not input element', () => {
      const inputEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      inputEl.nativeElement.dispatchEvent(inputEvent);

      fixture.detectChanges();
      expect(inputEl.nativeElement.focus).toBeTruthy();
    });
  });
});

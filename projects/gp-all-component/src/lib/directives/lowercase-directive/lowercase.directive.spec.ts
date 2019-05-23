import { LowercaseDirective } from './lowercase.directive';
import { FormsModule, NgControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
@Component({
  template: `
    <input type="text" gpLowercase />
  `,
})
class TestLowercaseComponent {}

describe('LowercaseDirective', () => {
  let component: TestLowercaseComponent;
  let fixture: ComponentFixture<TestLowercaseComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LowercaseDirective, TestLowercaseComponent],
      imports: [FormsModule],
      providers: [NgControl],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLowercaseComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uppercases text', () => {
    const text = 'TESTING TEXT';
    const inputEvent = new MouseEvent('input');
    inputEl.nativeElement.value = text;
    inputEl.nativeElement.dispatchEvent(inputEvent);

    fixture.detectChanges();

    expect(inputEl.nativeElement.value).toEqual(text.toLowerCase());
  });
});

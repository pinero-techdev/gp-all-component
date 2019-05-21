import { FormsModule, NgControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { UppercaseDirective } from './uppercase.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <input type="text" gpUppercase />
  `,
})
class TestUppercaseComponent {}

describe('UppercaseDirective', () => {
  let component: TestUppercaseComponent;
  let fixture: ComponentFixture<TestUppercaseComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UppercaseDirective, TestUppercaseComponent],
      imports: [FormsModule],
      providers: [NgControl],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUppercaseComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uppercases text', () => {
    const text = 'testing text';
    const inputEvent = new MouseEvent('input');
    inputEl.nativeElement.value = text;
    inputEl.nativeElement.dispatchEvent(inputEvent);

    fixture.detectChanges();

    expect(inputEl.nativeElement.value).toEqual(text.toUpperCase());
  });
});

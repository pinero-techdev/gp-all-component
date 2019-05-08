import { LowercaseDirective } from './lowercase.directive';
import { FormsModule, NgControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
@Component({
  template: `
    <input type="text" gp-lowercase />
  `,
})
class TestLowercaseComponent {}

describe('LowercaseDirective', () => {
  let component: TestLowercaseComponent;
  let fixture: ComponentFixture<TestLowercaseComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

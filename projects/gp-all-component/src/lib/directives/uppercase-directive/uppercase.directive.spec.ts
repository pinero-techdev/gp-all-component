import { FormsModule, NgControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UppercaseDirective } from './uppercase.directive';
@Component({
  template: `
    <input type="text" gp-uppercase />
  `,
})
class TestUppercaseComponent {}

fdescribe('UppercaseDirective', () => {
  let component: TestUppercaseComponent;
  let fixture: ComponentFixture<TestUppercaseComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

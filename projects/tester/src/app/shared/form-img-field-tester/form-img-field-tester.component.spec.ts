import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImgFieldTesterComponent } from './form-img-field-tester.component';

describe('FormImgFieldTesterComponent', () => {
  let component: FormImgFieldTesterComponent;
  let fixture: ComponentFixture<FormImgFieldTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormImgFieldTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormImgFieldTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

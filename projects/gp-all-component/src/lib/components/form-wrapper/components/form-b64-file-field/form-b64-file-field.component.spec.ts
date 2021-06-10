import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormB64FileFieldComponent } from './form-b64-file-field.component';

describe('FormFileFieldComponent', () => {
  let component: FormB64FileFieldComponent;
  let fixture: ComponentFixture<FormB64FileFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormB64FileFieldComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormB64FileFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

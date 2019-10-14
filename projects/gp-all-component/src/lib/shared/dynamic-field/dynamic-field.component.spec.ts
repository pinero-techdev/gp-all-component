import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFieldComponent } from './dynamic-field.component';
import { FormWrapperModule } from '../../components/form-wrapper/form-wrapper.module';

describe('DynamicFieldComponent', () => {
  let component: DynamicFieldComponent;
  let fixture: ComponentFixture<DynamicFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFieldComponent],
      imports: [FormWrapperModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

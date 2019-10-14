import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/primeng';
import { take } from 'rxjs/operators';

import { MultiSelectComponent } from './multi-select.component';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiSelectComponent],
      imports: [MultiSelectModule, FormsModule, ReactiveFormsModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value', () => {
    const value = 'test';

    component.writeValue(value);
    expect(component.value).toEqual(value);
  });

  describe('on register on change', () => {
    it('it should set default value', () => {
      const defaultValue = component.defaultLabel;

      component.registerOnChange(() => null);

      expect(component.multi.valuesAsString).toEqual(defaultValue);
    });

    it('it should set selected value', () => {
      const selected = 'test';
      const value = [1];

      component.selectionLabel = selected;
      component.multi.value = value;

      component.registerOnChange(() => null);

      component.multi.updateLabel();

      expect(component.multi.valuesAsString).toEqual(value.length.toString() + ' ' + selected);
    });
  });

  describe('emit passed value', () => {
    it('should fail if passed value is the same as the new one', () => {
      const newValue = 'new-test';

      const $onChangeSpy = spyOn(component.onChange, 'emit').and.callThrough();

      component.onChange.pipe(take(1)).subscribe((value) => expect(value).toBeUndefined());

      component.writeValue(newValue);
      component.value = newValue;

      expect($onChangeSpy).not.toHaveBeenCalled();
    });

    it('should pass if passed value is not the same as the new one', () => {
      const newValue = 'new-test';
      const oldValue = 'old-test';

      component.onChange.pipe(take(1)).subscribe((value) => expect(value).toEqual(newValue));

      component.writeValue(oldValue);
      component.value = newValue;
    });
  });
});

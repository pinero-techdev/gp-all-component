import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormSliderFieldComponent } from './form-slider-field.component';
import { SliderModule } from 'primeng/slider';

describe('FormSliderFieldComponent', () => {
  let component: FormSliderFieldComponent;
  let fixture: ComponentFixture<FormSliderFieldComponent>;
  let $sliderRange: HTMLDivElement;
  let $sliderLabel: HTMLDivElement;
  let $sliderInput: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSliderFieldComponent],
      imports: [SliderModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSliderFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When enable showing an input', () => {
    beforeEach(() => {
      component.showInput = true;
      fixture.detectChanges();
    });

    it('should render an input', () => {
      $sliderInput = fixture.nativeElement.querySelector('input');
      expect($sliderInput).toBeTruthy();
    });
  });

  describe('When disable showing an input', () => {
    beforeEach(() => {
      component.showInput = false;
      fixture.detectChanges();
    });

    it('should not render an input', () => {
      $sliderInput = fixture.nativeElement.querySelector('input');
      expect($sliderInput).toBeNull();
    });
  });

  describe('When setting a label', () => {
    beforeEach(() => {
      component.label = 'Test label';
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should render a label', () => {
      $sliderLabel = fixture.nativeElement.querySelector('.label');
      expect($sliderLabel).toBeTruthy();
    });
  });

  describe('When not setting a label', () => {
    beforeEach(() => {
      component.label = null;
    });

    it('should not render a label', () => {
      $sliderLabel = fixture.nativeElement.querySelector('.label');
      expect($sliderLabel).toBeNull();
    });
  });

  describe('When setting a range of values', () => {
    beforeEach(() => {
      component.rangeValues = '20,80';
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should render a range', () => {
      $sliderRange = fixture.nativeElement.querySelector('.ui-slider-range');
      expect($sliderRange).not.toHaveClass('ui-slider-range-min');
    });
  });

  describe('When not setting a range of values', () => {
    beforeEach(() => {
      component.rangeValues = null;
    });

    it('should not render a range', () => {
      $sliderRange = fixture.nativeElement.querySelector('.ui-slider-range');
      expect($sliderRange).toHaveClass('ui-slider-range-min');
    });
  });

  describe('When setting a min boundary', () => {
    beforeEach(() => {
      component.min = 30;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should have a min boundary', () => {
      expect(component.val).toEqual(component.min);
    });
  });
});

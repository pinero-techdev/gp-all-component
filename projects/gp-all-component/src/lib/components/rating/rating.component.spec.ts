import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;
  let starNumber: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    starNumber = 3;
    component.value = starNumber;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('value should be equal as value OnInit', () => {
    expect(component.value).toEqual(component.value);
  });

  describe('on getRatingClass', () => {
    it('should return On classes when positions is smaller than value', () => {
      const expectedOnClasses = `${component.iconOn} ${component.styleClassOn}`;
      const ratingClassString = component.getRatingClass(2);

      expect(ratingClassString).toEqual(expectedOnClasses);
    });

    it('should return Off classes when positons is greater than value', () => {
      const expectedOffClasses = `${component.iconOff} ${component.styleClassOff}`;
      const ratingClassString = component.getRatingClass(4);

      expect(ratingClassString).toEqual(expectedOffClasses);
    });
  });
});

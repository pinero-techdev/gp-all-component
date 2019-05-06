import { FocusDirective } from './focus.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('FocusDirective', () => {
  let component: FocusDirective;
  let fixture: ComponentFixture<FocusDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FocusDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

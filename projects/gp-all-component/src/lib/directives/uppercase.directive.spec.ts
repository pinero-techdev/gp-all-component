import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UppercaseDirective } from './uppercase.directive';

describe('UppercaseDirective', () => {
  let component: UppercaseDirective;
  let fixture: ComponentFixture<UppercaseDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UppercaseDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UppercaseDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

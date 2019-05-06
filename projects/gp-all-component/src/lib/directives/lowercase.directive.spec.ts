import { LowercaseDirective } from './lowercase.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('LowercaseDirective', () => {
  let component: LowercaseDirective;
  let fixture: ComponentFixture<LowercaseDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LowercaseDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LowercaseDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarTesterComponent } from './calendar-tester.component';

describe('CalendarTesterComponent', () => {
  let component: CalendarTesterComponent;
  let fixture: ComponentFixture<CalendarTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

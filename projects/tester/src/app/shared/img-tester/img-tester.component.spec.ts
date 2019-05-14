import { ImgTesterComponent } from './img-tester.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('ImgTesterComponent', () => {
  let component: ImgTesterComponent;
  let fixture: ComponentFixture<ImgTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImgTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

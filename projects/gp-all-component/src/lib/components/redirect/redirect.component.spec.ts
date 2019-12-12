import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RedirectComponent } from './redirect.component';

describe('RedirectComponent', () => {
  let component: RedirectComponent;
  let fixture: ComponentFixture<RedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RedirectComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on subscribe to params', () => {
    it('should subscribe to new', () => {
      const $windowSpy = spyOn(window, 'open').and.callThrough();
      TestBed.get(ActivatedRoute).params = of({ new: true, url: 'test' });
      component.ngOnInit();
      expect($windowSpy).toHaveBeenCalled();
    });

    it('should not subscribe to new', () => {
      const $locationSpy = spyOn(component, 'changeLocation');
      TestBed.get(ActivatedRoute).params = of({ new: false, url: 'test' });
      component.ngOnInit();
      expect($locationSpy).toHaveBeenCalled();
    });
  });
});

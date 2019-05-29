import { MultiLanguageService } from 'gp-all-component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiLanguageTesterComponent } from './multi-language-tester.component';

describe('MultiLanguageTesterComponent', () => {
  let component: MultiLanguageTesterComponent;
  let fixture: ComponentFixture<MultiLanguageTesterComponent>;
  let elementRef: HTMLElement;
  let service: MultiLanguageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiLanguageTesterComponent],
      imports: [],
      providers: [MultiLanguageService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLanguageTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementRef = fixture.nativeElement;
    service = fixture.debugElement.injector.get(MultiLanguageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

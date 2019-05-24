import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MainMenuProviderService } from './../../services/api/main-menu/main-menu-provider.service';
import { MainMenuProviderServiceMock } from '../../services/api/main-menu/main-menu.mock';
import { MainMenuService } from '../../services/api/main-menu/main-menu.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMenuComponent } from './main-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainMenuComponent],
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: MainMenuService,
          useClass: MainMenuService,
        },
        {
          provide: MainMenuProviderService,
          useClass: MainMenuProviderServiceMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the menu', () => {
    spyOn(component, 'initMenu').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.initMenu).toHaveBeenCalled();
  });
});

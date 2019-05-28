import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MainMenuProviderService } from './../../services/api/main-menu/main-menu-provider.service';
import { MainMenuProviderServiceMock } from '../../services/api/main-menu/main-menu.mock';
import { MainMenuService } from '../../services/api/main-menu/main-menu.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMenuComponent } from './main-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';

@Component({ template: '' })
class DummyComponent {}

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;
  let mainMenuService: MainMenuService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainMenuComponent, DummyComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: DummyComponent },
          { path: 'non-home', component: DummyComponent },
        ]),
      ],
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
    mainMenuService = TestBed.get(MainMenuService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on init menu', () => {
    it('should subscribe to obtenMenu and router events', () => {
      const mainMenuSpy = spyOn(mainMenuService, 'obtenMenu').and.callThrough();
      const homeNav = new NavigationEnd(1, 'home', 'home');
      const router = TestBed.get(Router);

      component.ngOnInit();

      router.events.next(homeNav);

      expect(mainMenuSpy).toHaveBeenCalled();
      expect(component.isExpanded).toBeFalsy();
    });
  });

  describe('on toggle menu, isOpen status:', () => {
    it('should be true', () => {
      component.onToggleMenu(true);
      expect(component.isOpen).toBeTruthy();
    });

    it('should be false', () => {
      component.isOpen = true;
      component.onToggleMenu('false');
      expect(component.isOpen).toBeFalsy();
    });
  });

  it('should close menu', () => {
    const menu = { texto: 'TEST' };

    component.onCloseMenu(menu);

    component.closeMenu.subscribe((isOpen) => expect(isOpen).toEqual(component.isOpen));

    component.sendBreadcrumb.subscribe((menuResponse) =>
      expect(menuResponse).toEqual({ label: menu.texto, isActive: true })
    );

    expect(component.isExpanded).toBeFalsy();
  });

  describe('on menu change', () => {
    it('should getActionSubmenu', () => {
      const goBackSpy = spyOn(component, 'getGoBackOptionMenu').and.callThrough();

      component.sendBreadcrumb.subscribe((data) =>
        expect(data).toEqual({
          label: 'label',
          floatMenu: component.floatMenu,
          isActive: true,
        })
      );

      component.initMenu();
      component.menuChange({ ...component.defaultMenu[3], texto: 'label' });

      expect(goBackSpy).toHaveBeenCalled();
    });

    it('should getActionGoBack', () => {
      const goBackSpy = spyOn(component, 'getActionGoBack').and.callThrough();

      component.sendBreadcrumb.subscribe((data) =>
        expect(data).toEqual({
          label: 'label',
          parentList: component.floatMenu,
          isActive: false,
        })
      );

      component.initMenu();
      component.menuChange({ parentList: component.defaultMenu[3].submenus, texto: 'label' });

      expect(goBackSpy).toHaveBeenCalled();
    });
  });

  it('should filter enabled items', () => {
    component.initMenu();

    const enabledItems = component.filterEnabledItems();

    expect(enabledItems.length).toBeGreaterThan(0);
  });

  it('should toggle overview', () => {
    component.isExpanded = true;
    component.disableTooltip = false;
    component.isOpen = true;
    component.viewLoaded = true;

    fixture.detectChanges();

    component.toggleOverview();

    expect(component.isExpanded).toBeFalsy();
    expect(component.disableTooltip).toBeTruthy();
  });
});

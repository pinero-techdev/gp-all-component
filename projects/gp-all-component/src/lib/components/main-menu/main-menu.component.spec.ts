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
    it('should subscribe to getMenu and router events', () => {
      const mainMenuSpy = spyOn(mainMenuService, 'getMenu').and.callThrough();
      const homeNav = new NavigationEnd(1, 'home', 'home');
      const router = TestBed.get(Router);

      component.ngOnInit();

      router.events.next(homeNav);

      expect(mainMenuSpy).toHaveBeenCalled();
      expect(component.isExpanded).toBeFalsy();
    });
  });

  it('should close menu', () => {
    const menu = { text: 'TEST' };

    component.onCloseMenu(menu);

    component.closeMenu.subscribe((isOpen) => expect(isOpen).toEqual(component.isOpen));

    component.sendBreadcrumb.subscribe((menuResponse) =>
      expect(menuResponse).toEqual({ label: menu.text, isActive: true })
    );

    expect(component.isExpanded).toBeFalsy();
  });

  describe('on menu change', () => {
    it('should getActionSubmenu', () => {
      const goBackSpy = spyOn(component, 'getGoBackOptionMenu').and.callThrough();

      component.sendBreadcrumb.subscribe((data) =>
        expect(data).toEqual({
          label: 'label',
          menu: component.menu,
          isActive: true,
        })
      );

      component.initMenu();
      component.menuChange({ ...component.menu[3], text: 'label' });

      expect(goBackSpy).toHaveBeenCalled();
    });

    it('should getActionGoBack', () => {
      const goBackSpy = spyOn(component, 'getActionGoBack').and.callThrough();

      component.sendBreadcrumb.subscribe((data) =>
        expect(data).toEqual({
          label: 'label',
          parentList: component.menu,
          isActive: false,
        })
      );

      component.initMenu();
      component.menuChange({ parentList: component.menu[3].submenus, text: 'label' });

      expect(goBackSpy).toHaveBeenCalled();
    });
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

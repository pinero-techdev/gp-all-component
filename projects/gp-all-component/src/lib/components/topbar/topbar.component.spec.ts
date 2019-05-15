import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { GlobalService } from './../../services/core/global.service';
import { MenuModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './../../services/api/login/login.service';
import { LoginServiceMock } from './../../services/api/login/login.service.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestingMockEvents } from './../../shared/testing/@mock/utils/testing-mock-events.class';
import { throwError, of } from 'rxjs';
import { Router, Routes } from '@angular/router';
import { UserInfo } from './../../resources/data/user-info.model';
import { CommonRs } from './../../services/core/common.service';

class TestComponent {}

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let elementRef: HTMLElement;
  let $buttonToggle;
  let service: LoginService;
  let router: Router;
  const testRoutes: Routes = [
    {
      path: 'login',
      component: TestComponent,
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopbarComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterTestingModule,
        MenuModule,
        RouterTestingModule.withRoutes(testRoutes),
      ],
      providers: [{ provide: LoginService, useClass: LoginServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    elementRef = fixture.debugElement.nativeElement;
    $buttonToggle = elementRef.querySelector('ul li a');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.itemsUserMenu[0].command).toBeDefined();
  });

  describe('TopbarComponent: Logged out', () => {
    beforeEach(() => {
      GlobalService.setLogged(false);
      fixture.detectChanges();
    });

    it('should not logged', () => {
      const $menuButton = elementRef.querySelector('#menu-button[hidden]');
      expect(component.logged).toBeFalsy();
      expect($menuButton).not.toBeNull();
    });
  });

  describe('TopBarComponent: Menu navigation', () => {
    beforeEach(() => {
      elementRef = fixture.debugElement.nativeElement;
      GlobalService.setLogged(true);
      fixture.detectChanges();
      $buttonToggle = elementRef.querySelector('ul li a');
      service = TestBed.get(LoginService);
      router = TestBed.get(Router);
      spyOn(component, 'toggleUserMenu').and.callThrough();
    });

    it('should show logged menu', () => {
      const $menuButton = elementRef.querySelector('#menu-button[hidden]');
      const userInfo = new UserInfo();
      userInfo.fullName = 'Patterson';

      GlobalService.setSession(userInfo);

      expect(component.logged).toBeTruthy();
      expect(GlobalService.getLOGGED()).toBeTruthy();
      expect($menuButton).toBeNull();
      expect(component.fullName).toEqual(userInfo.fullName);
    });

    it('toggleusername has called when logged button clicked', () => {
      TestingMockEvents.triggerClickOn($buttonToggle);

      expect(component.toggleUserMenu).toHaveBeenCalled();
      expect(component.userMenuVisible).toBeTruthy();
    });

    it('user logs out through menu item button success', () => {
      spyOn(component, 'redirect')
        .withArgs('logout')
        .and.callThrough();

      TestingMockEvents.triggerClickOn($buttonToggle);
      const $itemLink = elementRef.querySelector('.ui-menuitem-link');
      expect($itemLink).toBeDefined();

      TestingMockEvents.triggerClickOn($itemLink);
      expect(component.redirect).toHaveBeenCalledWith('logout');
    });

    it('user logs out through item button successfully', () => {
      const response = new CommonRs();
      const testRoute = 'login';
      const $itemLink = elementRef.querySelector('.ui-menuitem-link');
      response.ok = true;

      spyOn(service, 'logout').and.returnValue(of(response));
      spyOn(router, 'navigate').and.callThrough();

      TestingMockEvents.triggerClickOn($buttonToggle);
      TestingMockEvents.triggerClickOn($itemLink);

      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledWith([testRoute]);
    });

    it('user logs out through item button fails and should navigate to login', () => {
      spyOn(service, 'logout').and.returnValue(throwError(new Error('error')));
      spyOn(router, 'navigate').and.callThrough();

      TestingMockEvents.triggerClickOn($buttonToggle);
      const testRoute = 'login';
      const $itemLink = elementRef.querySelector('.ui-menuitem-link');
      expect($itemLink).toBeDefined();

      TestingMockEvents.triggerClickOn($itemLink);
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledWith([testRoute]);
    });
  });
});

import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ErrorInformation } from '@lib/resources/data/error-information/error-information.model';
import { FormsModule } from '@angular/forms';
import { GlobalService } from './../../services/core/global.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { LoginService, SessionInfoRs } from './../../services/api/login/login.service';
import { LoginServiceMock } from '@lib/services/api/login/login.service.mock';
import { MainMenuComponent } from './../main-menu/main-menu.component';
import { MainMenuService } from './../../services/api/main-menu/main-menu.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './../../shared/shared.module';
import { TestingMockEvents } from './../../shared/testing/testing-mock-events.class';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

class TestComponent {}
const testRoutes: Routes = [
    {
        path: 'modifica-password/:user',
        component: TestComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];

describe('LoginComponent', () => {
    const applicationLoginUrl = 'app-tester';
    const applicationName = 'Testing Library';
    const password = '1234';
    const url = 'home';
    const username = 'test';
    let $password: HTMLInputElement;
    let $username: HTMLInputElement;
    let component: LoginComponent;
    let elementRef: HTMLElement;
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;
    let service: LoginService;

    function getFields() {
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
        $password = elementRef.querySelector('input[type="password"]');
        $username = elementRef.querySelector('input[type="text"]');
    }

    function checkErrorMessages() {
        const $errorMessages = elementRef.querySelectorAll('.login-panel-error > div');
        expect($errorMessages.length).toBeGreaterThan(0);
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent, MainMenuComponent],
            imports: [
                FormsModule,
                RouterTestingModule.withRoutes(testRoutes),
                HttpClientTestingModule,
                SharedModule,
            ],
            providers: [
                { provide: LoginService, useClass: LoginServiceMock },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({ usuario: username, password, urlToRedirect: url, url }),
                    },
                },
                GlobalService,
                MainMenuService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        service = TestBed.get(LoginService);
        GlobalService.setApplicationTitle(applicationName);
        GlobalService.setLoginServiceUrl(applicationLoginUrl);
        getFields();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect($username).toBeTruthy();
        expect($password).toBeTruthy();
    });

    it('should init login', () => {
        spyOn(component, 'login').and.callThrough();
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.login).toHaveBeenCalled();
    });

    it('should have a title', () => {
        const $title: HTMLElement = elementRef.querySelector('.login-panel-title');
        expect($title).toBeTruthy();
        expect($title.innerText).toEqual(applicationName.toUpperCase());
    });

    it('should navigate to forgot-password', () => {
        spyOn(router, 'navigate').and.callThrough();
        spyOn(component, 'goModificaPwd').and.callThrough();
        const testRoute = `modifica-password/${component.username}`;
        const $button = elementRef.querySelector('a.login-panel-change-password');
        expect($button).toBeTruthy();
        TestingMockEvents.triggerClickOn($button);
        fixture.detectChanges();
        expect(component.goModificaPwd).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith([testRoute]);
    });

    describe('when form is filled', () => {
        beforeEach(() => {
            component.username = username;
            component.password = password;
            component.url = null;
            getFields();
        });

        it('should show an error message when API service fails', () => {
            const response = new SessionInfoRs();
            response.ok = false;
            response.error = new ErrorInformation();
            response.error.errorMessage = 'Error';
            spyOn(service, 'login').and.returnValue(of(response));
            spyOn(component, 'showError').and.callThrough();
            component.login();
            fixture.detectChanges();
            checkErrorMessages();
            fixture.detectChanges();
            expect(service.login).toHaveBeenCalled();
            expect(component.showError).toHaveBeenCalled();
        });

        it('should try to login', () => {
            spyOn(component, 'login').and.callThrough();
            const $button = elementRef.querySelector('button');
            expect($button).toBeTruthy();
            expect($button.disabled).toBeFalsy();
            TestingMockEvents.triggerClickOn($button);
            fixture.detectChanges();
            expect(component.login).toHaveBeenCalled();
        });

        it('should try to login and redirect', () => {
            spyOn(router, 'navigate').and.callThrough();
            const testRoute = '/post-login';
            component.login(testRoute);
            fixture.detectChanges();
            expect(router.navigate).toHaveBeenCalledWith([testRoute]);
        });

        it('should try to login and redirect to home', () => {
            spyOn(router, 'navigate').and.callThrough();
            GlobalService.setPreLoginUrl(null);
            const testRoute = 'home';
            component.login();
            fixture.detectChanges();
            expect(router.navigate).toHaveBeenCalledWith([testRoute]);
        });

        it('should try to login and redirect to getPRE_LOGIN_URL', () => {
            spyOn(router, 'navigate').and.callThrough();
            const testRoute = '/post-login';
            GlobalService.setPreLoginUrl(testRoute);
            fixture.detectChanges();
            spyOn(GlobalService, 'getPRE_LOGIN_URL').and.callThrough();
            component.login();
            getFields();
        });

        it('should navigate to modifica-password', () => {
            spyOn(component, 'goModificaPwd').and.callThrough();
            const $button = elementRef.querySelector('a.login-panel-change-password');
            expect($button).toBeTruthy();
            TestingMockEvents.triggerClickOn($button);
            fixture.detectChanges();
            expect(component.goModificaPwd).toHaveBeenCalled();
        });
    });

    describe('when form is not fullfilled', () => {
        beforeEach(() => {
            component.username = '';
            component.password = '';
            getFields();
        });

        it('should not try to login and show an error message', () => {
            spyOn(service, 'login').and.callThrough();
            spyOn(component, 'login').and.callThrough();
            spyOn(component, 'showError').and.callThrough();

            const $button = elementRef.querySelector('button');
            expect($button).toBeTruthy();
            TestingMockEvents.triggerClickOn($button);
            fixture.detectChanges();

            checkErrorMessages();
            expect(component.login).toHaveBeenCalled();
            expect(component.showError).toHaveBeenCalled();
            expect(service.login).not.toHaveBeenCalled();
        });

        it('should not try to login with no password and show an error message', () => {
            spyOn(service, 'login').and.callThrough();
            component.username = username;
            getFields();

            const $button: HTMLButtonElement = elementRef.querySelector('button');
            TestingMockEvents.triggerClickOn($button);
            fixture.detectChanges();

            checkErrorMessages();
            expect(service.login).not.toHaveBeenCalled();
        });

        it('should not try to login with no username and show an error message', () => {
            spyOn(service, 'login').and.callThrough();
            component.password = password;
            getFields();

            const $button: HTMLButtonElement = elementRef.querySelector('button');
            TestingMockEvents.triggerClickOn($button);
            fixture.detectChanges();

            checkErrorMessages();
            expect($username.value).toEqual('');
            expect(service.login).not.toHaveBeenCalled();
        });
    });
});

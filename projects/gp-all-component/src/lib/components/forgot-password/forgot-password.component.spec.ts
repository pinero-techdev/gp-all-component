import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordRq } from '@lib/services/api/forgot-password/forgot-password.service';
import { TestingMockEvents } from '@lib/shared/testing/testing-mock-events.class';
import {
    ForgotPasswordServiceMock, //
} from '@lib/services/api/forgot-password/forgot-password.service.mock';
import { MessagesService } from '@lib/services/core/messages.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@lib/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ForgotPasswordService } from '@lib/services/api/forgot-password/forgot-password.service';
import { TestingVars } from '@lib/shared/testing/testing-mock-constants.class';
import { Router } from '@angular/router';

fdescribe('ForgotPasswordComponent', () => {
    let $password: HTMLInputElement;
    let $passwordOld: HTMLInputElement;
    let $passwordRep: HTMLInputElement;
    let $submit: HTMLButtonElement;
    let $cancel: HTMLButtonElement;
    let $username: HTMLInputElement;
    let component: ForgotPasswordComponent;
    let elementRef: HTMLElement;
    let fixture: ComponentFixture<ForgotPasswordComponent>;
    let messageService: MessagesService;
    let service: ForgotPasswordService;
    let router: Router;

    function getFields() {
        fixture.detectChanges();
        $username = elementRef.querySelector('input[type="text"][name="username"]');
        $password = elementRef.querySelector('input[type="password"][name="password"]');
        $passwordOld = elementRef.querySelector('input[type="password"][name="passwordOld"]');
        $passwordRep = elementRef.querySelector('input[type="password"][name="passwordRep"]');
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ForgotPasswordComponent],
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                SharedModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: ForgotPasswordService, useClass: ForgotPasswordServiceMock },
                MessagesService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordComponent);
        component = fixture.componentInstance;
        service = TestBed.get(ForgotPasswordService);
        messageService = TestBed.get(MessagesService);
        router = TestBed.get(Router);
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
        component.ngOnInit();
        getFields();
        $submit = elementRef.querySelector('button[type="submit"]');
        $cancel = elementRef.querySelector('button[type="button"]');
        spyOn(messageService, 'showInfoAlert').and.callThrough();
        spyOn(service, 'updatePassword').and.callThrough();
        spyOn(component, 'onEnterEvent').and.callThrough();
        spyOn(component, 'resetError').and.callThrough();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect($username).toBeTruthy();
        expect($password).toBeTruthy();
        expect($passwordOld).toBeTruthy();
        expect($passwordRep).toBeTruthy();
        expect($submit).toBeTruthy();
        expect($cancel).toBeTruthy();
        expect(service).toBeTruthy();
    });

    it('should call onEnterEvent method when the user press enter', () => {
        TestingMockEvents.triggerEnterKey($username);
        expect(component.onEnterEvent).toHaveBeenCalled();
        TestingMockEvents.triggerEnterKey($passwordOld);
        expect(component.onEnterEvent).toHaveBeenCalled();
        TestingMockEvents.triggerEnterKey($password);
        expect(component.onEnterEvent).toHaveBeenCalled();
        TestingMockEvents.triggerEnterKey($passwordRep);
        expect(component.onEnterEvent).toHaveBeenCalled();
    });

    describe('Given an empty form', () => {
        beforeEach(() => {
            component.username = '';
            component.password = '';
            component.passwordRep = '';
            component.passwordOld = '';
            getFields();
        });

        it('should show an error message', () => {
            $submit.click();
            fixture.detectChanges();
            expect(component.onEnterEvent).toHaveBeenCalled();
            expect(service.updatePassword).not.toHaveBeenCalled();
            expect(messageService.showInfoAlert).toHaveBeenCalled();
        });
    });

    describe('Given an incompleted form - no username', () => {
        beforeEach(() => {
            component.username = '';
            component.password = TestingVars.PASSWORD;
            component.passwordRep = TestingVars.PASSWORD;
            component.passwordOld = TestingVars.PASSWORD_OLD;
        });

        it('should show an error message', () => {
            $submit.click();
            fixture.detectChanges();
            expect(component.onEnterEvent).toHaveBeenCalled();
            expect(service.updatePassword).not.toHaveBeenCalled();
            expect(messageService.showInfoAlert).toHaveBeenCalled();
        });
    });

    describe('Given an incompleted form - no password', () => {
        beforeEach(() => {
            component.username = TestingVars.USERNAME;
            component.password = '';
            component.passwordRep = TestingVars.PASSWORD;
            component.passwordOld = TestingVars.PASSWORD_OLD;
        });

        it('should show an error message', () => {
            $submit.click();
            fixture.detectChanges();
            expect(component.onEnterEvent).toHaveBeenCalled();
            expect(service.updatePassword).not.toHaveBeenCalled();
            expect(messageService.showInfoAlert).toHaveBeenCalled();
        });
    });

    describe('Given an incompleted form - no password rep', () => {
        beforeEach(() => {
            component.username = TestingVars.USERNAME;
            component.password = TestingVars.PASSWORD;
            component.passwordRep = '';
            component.passwordOld = TestingVars.PASSWORD_OLD;
        });

        it('should show an error message', () => {
            $submit.click();
            fixture.detectChanges();
            expect(component.onEnterEvent).toHaveBeenCalled();
            expect(service.updatePassword).not.toHaveBeenCalled();
            expect(messageService.showInfoAlert).toHaveBeenCalled();
        });
    });

    describe('Given an incompleted form - no password old', () => {
        beforeEach(() => {
            component.username = TestingVars.USERNAME;
            component.password = TestingVars.PASSWORD;
            component.passwordRep = TestingVars.PASSWORD;
            component.passwordOld = '';
        });

        it('should show an error message', () => {
            $submit.click();
            fixture.detectChanges();
            expect(component.onEnterEvent).toHaveBeenCalled();
            expect(service.updatePassword).not.toHaveBeenCalled();
            expect(messageService.showInfoAlert).toHaveBeenCalled();
        });
    });

    describe('Given an incorrect filled form', () => {
        beforeEach(() => {
            component.username = TestingVars.USERNAME;
            component.password = TestingVars.PASSWORD;
            component.passwordRep = '-';
            component.passwordOld = TestingVars.PASSWORD_OLD;
        });

        it('should show an error message', () => {
            $submit.click();
            fixture.detectChanges();
            expect(component.onEnterEvent).toHaveBeenCalled();
            expect(service.updatePassword).not.toHaveBeenCalled();
            expect(messageService.showInfoAlert).toHaveBeenCalled();
        });
    });
    describe('Given a correct filled form', () => {
        beforeEach(() => {
            component.username = TestingVars.USERNAME;
            component.password = TestingVars.PASSWORD;
            component.passwordRep = TestingVars.PASSWORD;
            component.passwordOld = TestingVars.PASSWORD_OLD;
        });

        it('should call to API Service', () => {
            spyOn(router, 'navigate').and.callThrough();
            const request = new ForgotPasswordRq(
                TestingVars.USERNAME,
                TestingVars.PASSWORD_OLD,
                TestingVars.PASSWORD
            );
            $submit.click();
            fixture.detectChanges();
            expect(router.navigate).toHaveBeenCalledWith(['login']);
            expect(component.onEnterEvent).toHaveBeenCalled();
            expect(service.updatePassword).toHaveBeenCalledWith(request);
            expect(messageService.showInfoAlert).toHaveBeenCalledWith(
                '¡Contraseña modificada correctamente!'
            );
        });
    });
});

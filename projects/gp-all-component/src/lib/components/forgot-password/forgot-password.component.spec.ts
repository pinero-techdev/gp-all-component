import { ButtonModule } from './../button/button.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordRq } from './../../services/api/forgot-password/forgot-password.service';
import { TestingMockEvents } from './../../shared/testing/@mock/utils/testing-mock-events.class';
import {
  ForgotPasswordServiceMock, //
} from './../../services/api/forgot-password/forgot-password.service.mock';
import { MessagesService } from './../../services/core/messages.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ForgotPasswordService } from './../../services/api/forgot-password/forgot-password.service';
import { TestingVars } from './../../shared/testing/@mock/utils/testing-mock-constants.class';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

/* These constants are used to test the routing navigation */
const nextRoute = 'login';
const currentRoute = 'forgot-password';
const fullRoute = currentRoute + '/:username';
const paramValue = 'testUser';
const paramsRoute = { username: paramValue };

class TestComponent {}

const testRoutes: Routes = [
  {
    path: nextRoute,
    component: TestComponent,
  },
  {
    path: fullRoute,
    component: TestComponent,
  },
  {
    path: '**',
    redirectTo: currentRoute,
    pathMatch: 'full',
  },
];

const messages = {
  ERROR_PASSWORD: '¡Las contraseñas no coinciden!',
  ACTION_SUCCESSFULL: '¡Contraseña modificada correctamente!',
  REQUIRED_FIELDS: 'Todos los campos son obligatorios',
};

describe('ForgotPasswordComponent', () => {
  let $cancel: HTMLButtonElement;
  let $password: HTMLInputElement;
  let $passwordOld: HTMLInputElement;
  let $passwordRep: HTMLInputElement;
  let $submit: HTMLButtonElement;
  let $username: HTMLInputElement;
  let component: ForgotPasswordComponent;
  let elementRef: HTMLElement;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let messageService: MessagesService;
  let router: Router;
  let service: ForgotPasswordService;

  function getFields() {
    fixture.detectChanges();
    $username = elementRef.querySelector('input[type="text"][name="username"]');
    $password = elementRef.querySelector('input[type="password"][name="password"]');
    $passwordOld = elementRef.querySelector('input[type="password"][name="passwordOld"]');
    $passwordRep = elementRef.querySelector('input[type="password"][name="passwordRep"]');
  }

  function isErrorMessageShown() {
    expect(component.errorMessage).not.toBeNull();
    expect(component.errorMessage).not.toEqual('');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        SharedModule,
        RouterTestingModule.withRoutes(testRoutes),
        HttpClientTestingModule,
        ButtonModule,
      ],
      providers: [
        { provide: ForgotPasswordService, useClass: ForgotPasswordServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(paramsRoute),
          },
        },
        MessagesService,
        Location,
      ],
    });
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

    $submit = elementRef.querySelector('.ui-button:not(.ui-button-danger)');
    $cancel = elementRef.querySelector('.ui-button-danger');

    spyOn(messageService, 'showInfoAlert').and.callThrough();
    spyOn(service, 'updatePassword').and.callThrough();
    spyOn(component, 'onEnterEvent').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
  });

  it('should create', () => {
    expect($cancel).toBeTruthy();
    expect($password).toBeTruthy();
    expect($passwordOld).toBeTruthy();
    expect($passwordRep).toBeTruthy();
    expect($submit).toBeTruthy();
    expect($username).toBeTruthy();
    expect(component).toBeTruthy();
    expect(service).toBeTruthy();

    expect(component.username).toEqual(paramValue);
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

  it('should back to login when the user clicks on cancel button', () => {
    spyOn(component, 'onCancelEvent').and.callThrough();
    $cancel.click();
    expect(component.onCancelEvent).toHaveBeenCalled();
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
      expect(component.onEnterEvent).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(service.updatePassword).not.toHaveBeenCalled();
      isErrorMessageShown();
    });
  });

  describe('Given an incompleted form - no username', () => {
    beforeEach(() => {
      component.username = '';
      component.password = TestingVars.PASSWORD;
      component.passwordRep = TestingVars.PASSWORD;
      component.passwordOld = TestingVars.PASSWORD_OLD;
      fixture.detectChanges();
    });

    it('should show an error message', () => {
      $submit.click();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.onEnterEvent).toHaveBeenCalled();
      expect(service.updatePassword).not.toHaveBeenCalled();
      isErrorMessageShown();
    });
  });

  describe('Given an incompleted form - no password', () => {
    beforeEach(() => {
      component.username = TestingVars.USERNAME;
      component.password = '';
      component.passwordRep = TestingVars.PASSWORD;
      component.passwordOld = TestingVars.PASSWORD_OLD;
      fixture.detectChanges();
    });

    it('should show an error message', () => {
      $submit.click();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.onEnterEvent).toHaveBeenCalled();
      expect(service.updatePassword).not.toHaveBeenCalled();
      isErrorMessageShown();
    });
  });

  describe('Given an incompleted form - no password rep', () => {
    beforeEach(() => {
      component.username = TestingVars.USERNAME;
      component.password = TestingVars.PASSWORD;
      component.passwordRep = '';
      component.passwordOld = TestingVars.PASSWORD_OLD;
      fixture.detectChanges();
    });

    it('should show an error message', () => {
      $submit.click();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.onEnterEvent).toHaveBeenCalled();
      expect(service.updatePassword).not.toHaveBeenCalled();
      isErrorMessageShown();
    });
  });

  describe('Given an incompleted form - no password old', () => {
    beforeEach(() => {
      component.username = TestingVars.USERNAME;
      component.password = TestingVars.PASSWORD;
      component.passwordRep = TestingVars.PASSWORD;
      component.passwordOld = '';
      fixture.detectChanges();
    });

    it('should show an error message', () => {
      $submit.click();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.onEnterEvent).toHaveBeenCalled();
      expect(service.updatePassword).not.toHaveBeenCalled();
      isErrorMessageShown();
    });
  });

  describe('Given an incorrect filled form', () => {
    beforeEach(() => {
      component.username = TestingVars.USERNAME;
      component.password = TestingVars.PASSWORD;
      component.passwordRep = '-';
      component.passwordOld = TestingVars.PASSWORD_OLD;
      fixture.detectChanges();
    });

    it('should show an error message', () => {
      $submit.click();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.onEnterEvent).toHaveBeenCalled();
      expect(service.updatePassword).not.toHaveBeenCalled();
      isErrorMessageShown();
    });
  });

  describe('Given a correct filled form', () => {
    beforeEach(() => {
      component.username = TestingVars.USERNAME;
      component.password = TestingVars.PASSWORD;
      component.passwordRep = TestingVars.PASSWORD;
      component.passwordOld = TestingVars.PASSWORD_OLD;
      fixture.detectChanges();
    });

    it('should call to API Service and everything is ok', () => {
      const request = new ForgotPasswordRq(
        TestingVars.USERNAME,
        TestingVars.PASSWORD_OLD,
        TestingVars.PASSWORD
      );
      $submit.click();
      expect(router.navigate).toHaveBeenCalledWith([nextRoute]);
      expect(component.onEnterEvent).toHaveBeenCalled();
      expect(service.updatePassword).toHaveBeenCalledWith(request);
      expect(messageService.showInfoAlert).toHaveBeenCalledWith(messages.ACTION_SUCCESSFULL);
    });

    it('should call to API Service and fails', () => {
      const username = 'username:fails';
      component.username = username;
      fixture.detectChanges();
      const request = new ForgotPasswordRq(
        username,
        TestingVars.PASSWORD_OLD,
        TestingVars.PASSWORD
      );
      $submit.click();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.onEnterEvent).toHaveBeenCalled();
      expect(service.updatePassword).toHaveBeenCalledWith(request);
      expect(messageService.showInfoAlert).not.toHaveBeenCalled();
      expect(component.errorMessage).not.toBeNull();
    });

    it('should call to API Service and server throws an error', () => {
      const username = 'server:down';
      component.username = username;
      fixture.detectChanges();
      const request = new ForgotPasswordRq(
        username,
        TestingVars.PASSWORD_OLD,
        TestingVars.PASSWORD
      );
      $submit.click();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.onEnterEvent).toHaveBeenCalled();
      expect(service.updatePassword).toHaveBeenCalledWith(request);
      expect(messageService.showInfoAlert).not.toHaveBeenCalled();
      expect(component.errorMessage).not.toBeNull();
    });
  });
});

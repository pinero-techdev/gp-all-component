import { GlobalService } from './../../core/global.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService, LoginRq, SessionInfoRs } from './login.service';
import { SessionStorageService } from '../../session-storage/session-storage.service';

describe('LoginService', () => {
  let httpClientSpy: { post: jasmine.Spy };
  let httpClient: HttpClient;
  let service: LoginService;
  let sessionStorageService: SessionStorageService;

  const applicationName = 'Testing Library';
  const applicationLoginUrl = 'app-tester';
  const username = 'test';
  const password = '1234';
  const userInfo = {
    aplicacion: 'BPG',
    bd: 'bp',
    cnxUid: '09F309E50001',
    fullName: 'Todo Patterson',
    mail: 'jpedrosa@todopatterson.com',
    mainRole: null,
    userId: 'PATTERSON',
  };
  const httpLoginResponse = new SessionInfoRs();
  const loginRequest = new LoginRq(username, password, applicationName);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GlobalService, LoginService],
    });

    httpLoginResponse.ok = true;
    httpLoginResponse.sessionId = 'eyJ0eXAiOiJKV1Qi';
    httpLoginResponse.userInfo = userInfo;
  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    sessionStorageService = TestBed.get(SessionStorageService);
  });

  describe('when login', () => {
    beforeEach(() => {
      service = new LoginService(httpClientSpy as any);
      GlobalService.setLoginServiceUrl(applicationLoginUrl);
    });

    it('should set a new session with the user info', () => {
      httpClientSpy.post.and.callFake(() => of(httpLoginResponse));

      spyOn(GlobalService, 'getLOGIN_SERVICE_URL').and.callThrough();
      spyOn(GlobalService, 'setSession').and.callThrough();
      spyOn(GlobalService, 'setSessionId').and.callThrough();
      spyOn(GlobalService, 'setLogged').and.callThrough();

      service.login(loginRequest).subscribe((data: any) => {
        expect(GlobalService.setSession).toHaveBeenCalledWith(httpLoginResponse.userInfo);
        expect(GlobalService.setSessionId).toHaveBeenCalledWith(httpLoginResponse.sessionId);
        expect(GlobalService.setLogged).toHaveBeenCalledWith(true);
        expect(data).toEqual(httpLoginResponse);
      });

      expect(GlobalService.getLOGIN_SERVICE_URL).toHaveBeenCalled();
    });
  });

  describe('when logout', () => {
    beforeEach(() => {
      httpClient = TestBed.get(HttpClient);
      service = TestBed.get(LoginService);
      GlobalService.setLoginServiceUrl(applicationLoginUrl);
    });

    it('should clean session and execute the logout procedure', () => {
      spyOn(httpClient, 'post').and.callThrough();
      spyOn(service, 'cleanSessionInfo').and.callThrough();
      spyOn(GlobalService, 'getSESSION_ID').and.callThrough();
      spyOn(GlobalService, 'getLOGIN_SERVICE_URL').and.callThrough();

      service.logout();

      expect(GlobalService.getLOGIN_SERVICE_URL).toHaveBeenCalled();
      expect(GlobalService.getSESSION_ID).toHaveBeenCalled();
      expect(GlobalService.getLOGGED()).toEqual(false);
      expect(GlobalService.getSESSION_ID()).toBeFalsy();
      expect(service.cleanSessionInfo).toHaveBeenCalled();
      expect(httpClient.post).toHaveBeenCalled();
    });
  });

  describe('when session is active', () => {
    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
      service = new LoginService(httpClientSpy as any);
      GlobalService.setSessionId(httpLoginResponse.sessionId);
      GlobalService.setSession(userInfo);
      GlobalService.setLoginServiceUrl(applicationLoginUrl);
    });

    it('should return the session object', () => {
      httpClientSpy.post.and.callFake(() => of(httpLoginResponse));

      service.sessionInfo().subscribe((session) => {
        expect(session).toEqual(httpLoginResponse);
        expect(GlobalService.getLOGGED()).toEqual(true);
        expect(sessionStorageService.getItem('userInfo')).toEqual(userInfo);
        expect(sessionStorageService.getItem('sessionId')).toEqual(httpLoginResponse.sessionId);
      });
    });
  });

  describe('when there is not session active', () => {
    beforeEach(() => {
      httpClient = TestBed.get(HttpClient);
      service = TestBed.get(LoginService);
      sessionStorageService.removeItem('userInfo');
      sessionStorageService.removeItem('sessionId');
      GlobalService.setLogged(false);
      GlobalService.setSessionId(null);
      GlobalService.setSession(null);
      GlobalService.setLoginServiceUrl(applicationLoginUrl);
    });

    it('should return an empty session object', () => {
      spyOn(httpClient, 'post').and.callThrough();
      const expectedResponse = new SessionInfoRs();
      expectedResponse.ok = false;
      service.sessionInfo().subscribe((session) => {
        expect(session).toEqual(expectedResponse);
        expect(GlobalService.getLOGGED()).not.toEqual(true);
        expect(sessionStorageService.getItem('userInfo')).toEqual(null);
        expect(sessionStorageService.getItem('sessionId')).toEqual(null);
      });
      expect(httpClient.post).not.toHaveBeenCalled();
    });
  });
});

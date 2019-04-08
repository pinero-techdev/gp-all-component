import { GlobalService } from './../../core/global.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService, LoginRq, SessionInfoRs } from './login.service';

describe('LoginService', () => {
    let httpClient: HttpClient;
    let service: LoginService;
    const applicationName = 'Testing Library';
    // const applicationLoginUrl = 'app-tester';
    const username = 'test';
    const password = '1234';
    // const httpLoginResponse = {
    //     ok: true,
    //     sessionId: 'eyJ0eXAiOiJKV1Qi',
    //     error: null,
    //     userInfo: {
    //         aplicacion: 'BPG',
    //         bd: 'bp',
    //         cnxUid: '09F309E50001',
    //         fullName: 'Todo Patterson',
    //         mail: 'jpedrosa@todopatterson.com',
    //         mainRole: null,
    //         userId: 'PATTERSON',
    //     },
    // };
    const loginRequest = new LoginRq(username, password, applicationName);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GlobalService, LoginService],
        }).compileComponents();
    }));

    beforeEach(() => {
        httpClient = TestBed.get(HttpClient);
        service = TestBed.get(LoginService);
    });

    it('should set global variables after login', () => {
        spyOn(httpClient, 'post').and.callFake(() => Observable.create(new SessionInfoRs()));
        spyOn(GlobalService, 'getLOGIN_SERVICE_URL').and.callThrough();
        spyOn(GlobalService, 'setSession').and.callThrough();
        spyOn(GlobalService, 'setSessionId').and.callThrough();
        spyOn(GlobalService, 'setLogged').and.callThrough();
        //
        service.login(loginRequest);
        //
        expect(GlobalService.getLOGIN_SERVICE_URL).toHaveBeenCalled();
        expect(GlobalService.setSession).toHaveBeenCalled();
        expect(GlobalService.setSessionId).toHaveBeenCalled();
        expect(GlobalService.setLogged).toHaveBeenCalled();
        expect(httpClient.post).toHaveBeenCalled();
    });
});

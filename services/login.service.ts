/**
 * Servicio de login
 */
import { Injectable } from '@angular/core';
import { LoginRq } from '../resources/data/loginRq';
import { UserInfo } from '../resources/data/userInfo';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CommonRs } from './common.service';
import { SessionInfoRs } from '../resources/data/sessionInfoRs';
import { RequestOptions } from '../resources/data/RequestOptions';

@Injectable()
export class LoginService {
  
  constructor(private http: HttpClient) {
  }

  /**
   * Comprueba que el usuario tenga una sesión activa
   * @returns Json con la sesión del usuario (si tiene sesión activa
   */
  sessionInfo(): Observable<SessionInfoRs> {
    let sessionInfoRq: any = {};
    if (!GlobalService.SESSION_ID) {
      if (sessionStorage.getItem('userInfo') != null) {
        GlobalService.setSession(JSON.parse(sessionStorage.getItem('userInfo')));
      }
      if (sessionStorage.getItem('sessionId') != null) {
        GlobalService.setSessionId(sessionStorage.getItem('sessionId'));
      }
    }
    if (GlobalService.SESSION_ID) {
      sessionInfoRq.sessionId = GlobalService.SESSION_ID;
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: GlobalService.SESSION_ID
      });
      let options = new RequestOptions(headers);
      let url = `${GlobalService.LOGIN_SERVICE_URL}/sessionInfo`;
      return this.http.post<SessionInfoRs>(url, sessionInfoRq, options).map(sessionInfoRs => {
          if (sessionInfoRs.ok) {
            GlobalService.setSession(sessionInfoRs.userInfo);
            GlobalService.setSessionId(sessionInfoRs.sessionId);
            GlobalService.setLogged(true);
            sessionStorage.setItem('userInfo', JSON.stringify(sessionInfoRs.userInfo));
            sessionStorage.setItem('sessionId', sessionInfoRs.sessionId);
          }
          return sessionInfoRs;
        }
      );
    } else {
      let rs = new SessionInfoRs();
      rs.ok = false;
      return Observable.of(rs);
    }
  }

  /**
   * Llamada para loguear al usuario
   * @param username
   * @param password
   * @returns Json con la sesión del usuario
   */
  login(request: LoginRq) {
    this.cleanSessionInfo(false);

    let body = JSON.stringify(request);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = new RequestOptions(headers);
    let url = `${GlobalService.LOGIN_SERVICE_URL}/login`;
    sessionStorage.setItem('language', 'ES');
    return this.http.post<SessionInfoRs>(url, body, options).map(loginResponse => {
      if (loginResponse.ok) {
        GlobalService.setSession(loginResponse.userInfo);
        GlobalService.setSessionId(loginResponse.sessionId);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('userInfo', JSON.stringify(loginResponse.userInfo));
        sessionStorage.setItem('sessionId', loginResponse.sessionId);
        GlobalService.setLogged(true);
      }
      return loginResponse;
    });
  }

  /**
   * Llamada al WS para hacer un logout del usuario
   * @returns Json con un CommonRS de respuesta
   */
  logout(): Observable<CommonRs> {
    let logoutRq: any = {};
    logoutRq.sessionId = GlobalService.SESSION_ID;
    this.cleanSessionInfo(true);

    // request de logout.
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = new RequestOptions(headers);
    let url = `${GlobalService.LOGIN_SERVICE_URL}/logout`;
    return this.http.post<CommonRs>(url, logoutRq, options);
  }

  cleanSessionInfo(cleanPreloginUrl: boolean = true) {
    // Limpieza informacion de sesion.
    sessionStorage.clear();
    // Limpieza de los datos de usuario del global service.
    GlobalService.setLogged(false);
    GlobalService.setSession(new UserInfo());
    GlobalService.setSessionId(null);

    if ( cleanPreloginUrl ) {
      GlobalService.setPreLoginUrl(null);
    }
  }
}

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Param} from '../../../resources/data/param.model';
import {RequestOptions} from '../../../resources/data/request-options.model';
import {UserInfo} from '../../../resources/data/user-info.model';
import {CommonRs} from '../../core/common.service';
import {GlobalService} from '../../core/global.service';

export class LoginRq {
    usuario: string;
    password: string;
    aplicacion: string;
    params: Param[];
    otherparams: string;

    constructor(usuario: string, password: string, aplicacion?: string, params?: Param[], otherparams?: string) {
        if (usuario) {
            this.usuario = usuario;
        }
        if (password) {
            this.password = password;
        }
        if (aplicacion) {
            this.aplicacion = aplicacion;
        }
        if (params) {
            this.params = params;
        }
        if (otherparams) {
            this.otherparams = otherparams;
        }
    }
}

export class LoginRs extends CommonRs {
    userInfo: UserInfo;
    sessionId: string;
}

export class SessionInfoRs extends CommonRs {
    userInfo: UserInfo;
    sessionId: string;
}

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {
    }

    /**
     * Comprueba que el usuario tenga una sesión activa
     * @returns Json con la sesión del usuario (si tiene sesión activa)
     */
    sessionInfo(): Observable<SessionInfoRs> {
        const sessionInfoRq: any = {};
        if (!GlobalService.getSESSION_ID()) {
            if (sessionStorage.getItem('userInfo') != null) {
                GlobalService.setSession(JSON.parse(sessionStorage.getItem('userInfo')));
            }
            if (sessionStorage.getItem('sessionId') != null) {
                GlobalService.setSessionId(sessionStorage.getItem('sessionId'));
            }
        }
        if (GlobalService.getSESSION_ID()) {
            sessionInfoRq.sessionId = GlobalService.getSESSION_ID();
            const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': GlobalService.getSESSION_ID()
            });
            const options = new RequestOptions(headers);
            const url = `${GlobalService.getLOGIN_SERVICE_URL()}/sessionInfo`;
            return this.http.post<SessionInfoRs>(url, sessionInfoRq, options).pipe(map((sessionInfoRs) => {
                    if (sessionInfoRs.ok) {
                        GlobalService.setSession(sessionInfoRs.userInfo);
                        GlobalService.setSessionId(sessionInfoRs.sessionId);
                        GlobalService.setLogged(true);
                        sessionStorage.setItem('userInfo', JSON.stringify(sessionInfoRs.userInfo));
                        sessionStorage.setItem('sessionId', sessionInfoRs.sessionId);
                    }
                    return sessionInfoRs;
                }
            ));
        } else {
            const rs = new SessionInfoRs();
            rs.ok = false;
            return of(rs);
        }
    }

    /**
     * Llamada para loguear al usuario
     * @param username
     * @param password
     * @returns Json con la sesión del usuario
     */
    login(request: LoginRq) {
        this.cleanSessionInfo();
        const body = JSON.stringify(request);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const options = new RequestOptions(headers);
        const url = `${GlobalService.getLOGIN_SERVICE_URL()}/login`;
        sessionStorage.setItem('language', 'ES');
        return this.http.post<SessionInfoRs>(url, body, options).pipe(map(loginResponse => {
            if (loginResponse.ok) {
                GlobalService.setSession(loginResponse.userInfo);
                GlobalService.setSessionId(loginResponse.sessionId);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('userInfo', JSON.stringify(loginResponse.userInfo));
                sessionStorage.setItem('sessionId', loginResponse.sessionId);
                GlobalService.setLogged(true);
            }
            return loginResponse;
        }));
    }

    /**
     * Llamada al WS para hacer un logout del usuario
     * @returns Json con un CommonRS de respuesta
     */
    logout(): Observable<CommonRs> {
        const logoutRq: any = {};
        logoutRq.sessionId = GlobalService.getSESSION_ID();
        this.cleanSessionInfo();

        // request de logout.
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const options = new RequestOptions(headers);
        const url = `${GlobalService.getLOGIN_SERVICE_URL()}/logout`;
        return this.http.post<CommonRs>(url, logoutRq, options);
    }

    cleanSessionInfo() {
        // Limpieza informacion de sesion.
        sessionStorage.clear();
        // Limpieza de los datos de usuario del global service.
        GlobalService.setLogged(false);
        GlobalService.setSession(new UserInfo());
        GlobalService.setSessionId(null);
    }
}

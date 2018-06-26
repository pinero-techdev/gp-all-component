/**
 * Servicio de login
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {LoginRq} from "../resources/data/loginRq";
import {UserInfo} from "../resources/data/userInfo";
import {GlobalService} from "./global.service";

@Injectable()
export class LoginService {

    constructor(private http: Http, private globalService: GlobalService) {
    }

    /**
     * Comprueba que el usuario tenga una sesión activa
     * @returns Json con la sesión del usuario (si tiene sesión activa
     */
    sessionInfo() {
        let sessionInfoRq: any = {};
        if (!this.globalService.sessionId) {
            if (sessionStorage.getItem('userInfo') != null) {
                this.globalService.session = JSON.parse(sessionStorage.getItem('userInfo'));
            }
            if (sessionStorage.getItem('sessionId') != null) {
                this.globalService.sessionId = sessionStorage.getItem('sessionId');
            }
        }
        sessionInfoRq.sessionId = this.globalService.getSessionId();
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let url = `${GlobalService.LOGIN_SERVICE_URL}/sessionInfo`;
        return this.http.post(url, sessionInfoRq, options).map((res: Response) => {
            let sessionInfoRs = res.json();

            if (sessionInfoRs.ok) {
                this.globalService.session = sessionInfoRs.userInfo;
                this.globalService.sessionId = sessionInfoRs.sessionId;
                sessionStorage.setItem('userInfo', JSON.stringify(sessionInfoRs.userInfo));
                sessionStorage.setItem('sessionId', sessionInfoRs.sessionId);
                this.globalService.logged = true;
            }

            return sessionInfoRs;
        });
    }

    /**
     * Llamada para loguear al usuario
     * @param username
     * @param password
     * @returns Json con la sesión del usuario
     */
    login(request: LoginRq) {
        this.cleanSessionInfo();

        let body = JSON.stringify(request);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let url = `${GlobalService.LOGIN_SERVICE_URL}/login`;
        sessionStorage.setItem("language", "ES");
        return this.http.post(url, body, options).map((res: Response) => {
            let loginResponse = res.json();

            if (loginResponse.ok) {
                this.globalService.session = loginResponse.userInfo;
                this.globalService.sessionId = loginResponse.sessionId;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('userInfo', JSON.stringify(loginResponse.userInfo));
                sessionStorage.setItem('sessionId', loginResponse.sessionId);
                this.globalService.logged = true;
            }

            return loginResponse;
        });
    }

    /**
     * Llamada al WS para hacer un logout del usuario
     * @returns Json con un CommonRS de respuesta
     */
    logout() {
        let logoutRq: any = {};
        logoutRq.sessionId = this.globalService.getSessionId();

        this.cleanSessionInfo();

        // request de logout.
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let url = `${GlobalService.LOGIN_SERVICE_URL}/logout`;
        return this.http.post(url, logoutRq, options).map((res: Response) => res.json());
    }

    cleanSessionInfo() {
        // Limpieza informacion de sesion.
        sessionStorage.clear();
        // Limpieza de los datos de usuario del global service.
        this.globalService.logged = false;
        this.globalService.session = new UserInfo();
        this.globalService.sessionId = null;
    }
}
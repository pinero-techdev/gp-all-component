/**
 * Servicio de login
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {GlobalService} from "./global.service";
import {LoginRq} from "../resources/data/loginRq";

@Injectable()
export class LoginService {

    constructor(private http:Http) {
    }

    /**
     * Comprueba que el usuario tenga una sesión activa
     * @returns Json con la sesión del usuario (si tiene sesión activa
     */
    sessionInfo() {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let url = `${GlobalService.LOGIN_SERVICE_URL}/sessionInfo`;
        return this.http.post(url, {}, options).map((res:Response) => res.json());
    }

    /**
     * Llamada para loguear al usuario
     * @param username
     * @param password
     * @returns Json con la sesión del usuario
     */
    login(request:LoginRq) {
        let body = JSON.stringify(request);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let url = `${GlobalService.LOGIN_SERVICE_URL}/login`;
        sessionStorage.setItem("language", "ES");
        console.log(body);
        return this.http.post(url, body, options).map((res:Response) => res.json());
    }

    /**
     * Llamada al WS para hacer un logout del usuario
     * @returns Json con un CommonRS de respuesta
     */
    logout() {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let url = `${GlobalService.LOGIN_SERVICE_URL}/logout`;
        return this.http.post(url, {}, options).map((res:Response) => res.json());
    }
}
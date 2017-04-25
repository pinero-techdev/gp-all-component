"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Servicio de login
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var global_service_1 = require("./global.service");
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
    }
    /**
     * Comprueba que el usuario tenga una sesión activa
     * @returns Json con la sesión del usuario (si tiene sesión activa
     */
    LoginService.prototype.sessionInfo = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = global_service_1.GlobalService.LOGIN_SERVICE_URL + "/sessionInfo";
        return this.http.post(url, {}, options).map(function (res) { return res.json(); });
    };
    /**
     * Llamada para loguear al usuario
     * @param username
     * @param password
     * @returns Json con la sesión del usuario
     */
    LoginService.prototype.login = function (request) {
        var body = JSON.stringify(request);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = global_service_1.GlobalService.LOGIN_SERVICE_URL + "/login";
        console.log(body);
        return this.http.post(url, body, options).map(function (res) { return res.json(); });
    };
    /**
     * Llamada al WS para hacer un logout del usuario
     * @returns Json con un CommonRS de respuesta
     */
    LoginService.prototype.logout = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = global_service_1.GlobalService.LOGIN_SERVICE_URL + "/logout";
        return this.http.post(url, {}, options).map(function (res) { return res.json(); });
    };
    LoginService = __decorate([
        core_1.Injectable()
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map
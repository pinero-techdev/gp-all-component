"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
/**
 * Definiciones comunes del acceso a servicios.
 */
var CommonRs = (function () {
    function CommonRs() {
    }
    return CommonRs;
}());
exports.CommonRs = CommonRs;
var CommonRq = (function () {
    function CommonRq() {
    }
    return CommonRq;
}());
exports.CommonRq = CommonRq;
var ErrorInformation = (function () {
    function ErrorInformation() {
    }
    return ErrorInformation;
}());
exports.ErrorInformation = ErrorInformation;
var FieldErrorInformation = (function () {
    function FieldErrorInformation() {
    }
    return FieldErrorInformation;
}());
exports.FieldErrorInformation = FieldErrorInformation;
var CommonService = (function () {
    function CommonService(http) {
        this.http = http;
    }
    CommonService.prototype.serviceRequest = function (url, body) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        var post = this.http.post(url, body, options);
        return post.map(function (res) { var response = res.json(); return response; });
    };
    /**
     * Adrian Gomez Macias creo una funcion para realizar peticiones GET que necesiten pasar un JSON
     */
    CommonService.prototype.serviceGetRq = function (url, rq) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        url = url + "?rq=" + rq;
        var get = this.http.get(url, options);
        return get.map(function (res) { var response = res.json(); return response; });
    };
    /**
     * Creo una funcion para realizar peticiones GET que no necesiten pasar ningun dato
     */
    CommonService.prototype.serviceGet = function (url) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        var get = this.http.get(url);
        return get.map(function (res) { var response = res.json(); return response; });
    };
    CommonService = __decorate([
        core_1.Injectable()
    ], CommonService);
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var GlobalService = (function () {
    function GlobalService() {
    }
    GlobalService.prototype.constuctor = function () {
        console.log("CREANDO GlobalService.");
    };
    GlobalService.setBaseUrl = function (newUrl) {
        this.baseUrl = newUrl;
    };
    Object.defineProperty(GlobalService, "BASE_URL", {
        get: function () { return GlobalService.baseUrl; },
        enumerable: true,
        configurable: true
    });
    GlobalService.setMenuServiceUrl = function (newUrl) {
        this.menuServiceUrl = newUrl;
    };
    Object.defineProperty(GlobalService, "MENU_SERVICE_URL", {
        get: function () { return GlobalService.menuServiceUrl; },
        enumerable: true,
        configurable: true
    });
    GlobalService.setLoginServiceUrl = function (newUrl) {
        this.loginServiceUrl = newUrl;
    };
    Object.defineProperty(GlobalService, "LOGIN_SERVICE_URL", {
        get: function () { return GlobalService.loginServiceUrl; },
        enumerable: true,
        configurable: true
    });
    GlobalService.setApp = function (newApp) {
        this.app = newApp;
    };
    Object.defineProperty(GlobalService, "APP", {
        get: function () { return GlobalService.app; },
        enumerable: true,
        configurable: true
    });
    GlobalService.prototype.globalStatus = function () {
        return "GlobalService( " + this.logged + ", " + JSON.stringify(this.session) + ", " + this.applicationTitle + ")";
    };
    GlobalService = __decorate([
        core_1.Injectable()
    ], GlobalService);
    return GlobalService;
}());
exports.GlobalService = GlobalService;
//# sourceMappingURL=global.service.js.map
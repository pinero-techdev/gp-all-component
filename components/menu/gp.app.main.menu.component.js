"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var menuRq_1 = require("../../resources/data/menuRq");
var global_service_1 = require("../../services/global.service");
var GpAppMainMenuComponent = (function () {
    function GpAppMainMenuComponent(_appMenuProviderService, _globalService, _applicationRef) {
        this._appMenuProviderService = _appMenuProviderService;
        this._globalService = _globalService;
        this._applicationRef = _applicationRef;
        this.menuItems = [];
    }
    GpAppMainMenuComponent.prototype.ngOnInit = function () {
        this.initMenu();
    };
    GpAppMainMenuComponent.prototype.initMenu = function () {
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        var userId = null;
        if (userInfo != undefined && userInfo != null) {
            userId = userInfo.userId;
        }
        var request = new menuRq_1.MenuRq(userId, global_service_1.GlobalService.APP);
        var aux = this._appMenuProviderService.obtenMenu(request);
        if (aux != undefined) {
            this.menuItems = aux;
        }
    };
    GpAppMainMenuComponent.prototype.refresh = function () {
        this._applicationRef.tick();
    };
    GpAppMainMenuComponent = __decorate([
        core_1.Component({
            selector: 'gp-app-main-menu',
            templateUrl: './gp.app.main.menu.component.html'
        })
    ], GpAppMainMenuComponent);
    return GpAppMainMenuComponent;
}());
exports.GpAppMainMenuComponent = GpAppMainMenuComponent;
//# sourceMappingURL=gp.app.main.menu.component.js.map
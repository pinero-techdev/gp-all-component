"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var loginRq_1 = require("../../resources/data/loginRq");
var loginRs_1 = require("../../resources/data/loginRs");
var gp_app_main_menu_component_1 = require("../menu/gp.app.main.menu.component");
var GpAppLoginComponent = (function () {
    function GpAppLoginComponent(router, _loginService, globalService, _gpAppMainMenu) {
        this.router = router;
        this._loginService = _loginService;
        this.globalService = globalService;
        this._gpAppMainMenu = _gpAppMainMenu;
        this.msgs = [];
        this.globalService.logged = false;
        sessionStorage.removeItem('userInfo');
    }
    GpAppLoginComponent.prototype.login = function () {
        var _this = this;
        var response = new loginRs_1.LoginRs();
        var request = new loginRq_1.LoginRq(this.usuario, this.password);
        this._loginService.login(request).subscribe(function (data) {
            response = data;
            if (response.ok) {
                _this.globalService.session = response.userInfo;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('userInfo', JSON.stringify(response.userInfo));
                _this._gpAppMainMenu.initMenu();
                _this._gpAppMainMenu.refresh();
                _this.globalService.logged = true;
                _this.router.navigate(['home']);
            }
            else {
                _this.router.navigate(['login']);
                if (response.error != null && response.error.errorMessage != null) {
                    _this.showError(response.error.errorMessage.toString());
                }
            }
        }, function (err) {
            console.error(err);
        }, function () {
            console.log('Login finalizado');
            console.log(response);
        });
    };
    GpAppLoginComponent.prototype.showError = function (message) {
        this.msgs = [];
        this.msgs.push({
            severity: 'error',
            summary: 'Se ha producido un error durante el proceso de login',
            detail: message
        });
    };
    GpAppLoginComponent = __decorate([
        core_1.Component({
            selector: 'gp-app-login.component',
            templateUrl: './gp.app.login.component.html',
            providers: [gp_app_main_menu_component_1.GpAppMainMenuComponent]
        })
    ], GpAppLoginComponent);
    return GpAppLoginComponent;
}());
exports.GpAppLoginComponent = GpAppLoginComponent;
//# sourceMappingURL=gp.app.login.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var userInfo_1 = require("../../resources/data/userInfo");
var common_service_1 = require("../../services/common.service");
var GpAppTopBarComponent = (function () {
    function GpAppTopBarComponent(_router, globalService, _loginService) {
        this._router = _router;
        this.globalService = globalService;
        this._loginService = _loginService;
        this.display = false;
        this.showMenu = false;
        this.userMenuVisible = false;
        this.showServiceMenu = new core_1.EventEmitter(true);
        this.classShowMenuButton = "Fright ShowOnMobile ripplelink Unselectable ShadowEffect";
    }
    GpAppTopBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemsUserMenu = [{
                label: 'Usuario',
                icon: 'ui-icon-folder',
                items: [
                    { label: 'Logout', icon: 'ui-icon-power-settings-new', command: function (click) { _this.toggleUserMenu(), _this.redirect('logout'); } }
                ]
            }];
    };
    /**
     * Metodo para redireccionar según la opción elegida en el desplegable del usuario
     * @param action
     */
    GpAppTopBarComponent.prototype.redirect = function (action) {
        var _this = this;
        switch (action) {
            case 'logout':
                var response_1 = new common_service_1.CommonRs();
                this._loginService.logout().subscribe(function (data) {
                    response_1 = data;
                    if (response_1.ok) {
                        _this.globalService.session = new userInfo_1.UserInfo();
                        localStorage.removeItem('userInfo');
                        _this._router.navigate(['login']);
                    }
                }, function (error) { return console.error(error); }, function () {
                    console.log("petición de logout finalizada con resultado: ");
                    console.log(response_1);
                    // CommonRs se crea con ok por defecto a falso
                    // Si ha habido algún problema con el logout, el usuario sigue logueado
                    _this.globalService.logged = !(response_1.ok);
                });
                break;
            default:
                console.log("redireccionar a:" + action);
        }
    };
    GpAppTopBarComponent.prototype.toggleUserMenu = function () {
        this.userMenuVisible = !this.userMenuVisible;
    };
    __decorate([
        core_1.ViewChild('menuUser')
    ], GpAppTopBarComponent.prototype, "menuUser");
    __decorate([
        core_1.ViewChild('userMobileButton')
    ], GpAppTopBarComponent.prototype, "userMobileButton");
    __decorate([
        core_1.Input()
    ], GpAppTopBarComponent.prototype, "homeUrl");
    __decorate([
        core_1.Input()
    ], GpAppTopBarComponent.prototype, "logoUrl");
    __decorate([
        core_1.Input()
    ], GpAppTopBarComponent.prototype, "title");
    __decorate([
        core_1.Output()
    ], GpAppTopBarComponent.prototype, "showServiceMenu");
    GpAppTopBarComponent = __decorate([
        core_1.Component({
            selector: 'gp-app-topbar',
            templateUrl: './gp.app.topbar.component.html'
        })
    ], GpAppTopBarComponent);
    return GpAppTopBarComponent;
}());
exports.GpAppTopBarComponent = GpAppTopBarComponent;
//# sourceMappingURL=gp.app.topbar.component.js.map
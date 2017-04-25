"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AuthGuard = (function () {
    function AuthGuard(_router, _globalService, _appMenuProviderService) {
        this._router = _router;
        this._globalService = _globalService;
        this._appMenuProviderService = _appMenuProviderService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        console.log(url);
        console.log(route.pathFromRoot);
        console.log("Guard, canActivate, globalService: " + this._globalService.globalStatus() + " " + sessionStorage.getItem('userInfo'));
        if ((this._globalService.logged || null != sessionStorage.getItem('userInfo'))) {
            return true;
        }
        else {
            // not logged in so redirect to login page
            this._router.navigate(['/login']);
            return false;
        }
    };
    AuthGuard = __decorate([
        core_1.Injectable()
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=authGuard.js.map
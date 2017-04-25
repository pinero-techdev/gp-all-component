"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var GpAppRedirectComponent = (function () {
    function GpAppRedirectComponent(_route) {
        this._route = _route;
    }
    GpAppRedirectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._route.params.subscribe(function (params) {
            _this.url = params['url'];
            _this.new = params['new'];
            if (_this.new) {
                window.open('http://' + _this.url);
            }
            else {
                window.location.href = 'http://' + _this.url;
            }
        });
    };
    GpAppRedirectComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    GpAppRedirectComponent = __decorate([
        core_1.Component({
            selector: 'gp-app-redirect',
            template: 'redirecting...'
        })
    ], GpAppRedirectComponent);
    return GpAppRedirectComponent;
}());
exports.GpAppRedirectComponent = GpAppRedirectComponent;
//# sourceMappingURL=gp.app.redirect.component.js.map
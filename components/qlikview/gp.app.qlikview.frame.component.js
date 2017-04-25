"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var directives_1 = require("@angular/core/src/metadata/directives");
var GpAppQlikviewFrameComponent = (function () {
    function GpAppQlikviewFrameComponent(_activatedRoute, _router, _globalService, _domSanitizer) {
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this._globalService = _globalService;
        this._domSanitizer = _domSanitizer;
        this.safeResourceUrl = null;
    }
    GpAppQlikviewFrameComponent.prototype.ngOnInit = function () {
        var doc = "BP_CALIDAD%2FDashboardCRM.qvw";
        this.safeResourceUrl = this._domSanitizer.bypassSecurityTrustResourceUrl("http://qlikview/QvAJAXZfc/opendoc.htm?document=" + doc + "&host=QVS%40qlikview&cnxuid=" + this._globalService.session.cnxUid);
    };
    GpAppQlikviewFrameComponent = __decorate([
        directives_1.Component({
            selector: 'gp-app-qlikview-frame',
            templateUrl: './gp.app.qlikview.frame.component.html',
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], GpAppQlikviewFrameComponent);
    return GpAppQlikviewFrameComponent;
}());
exports.GpAppQlikviewFrameComponent = GpAppQlikviewFrameComponent;
//# sourceMappingURL=gp.app.qlikview.frame.component.js.map
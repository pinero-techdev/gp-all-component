"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var gp_app_report_dialog_component_1 = require("./gp-app-report-dialog.component");
var GpAppReportFrameComponent = (function () {
    function GpAppReportFrameComponent(_route, _router, _reportService) {
        this._route = _route;
        this._router = _router;
        this._reportService = _reportService;
    }
    GpAppReportFrameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._route.params.subscribe(function (params) {
            console.log('Cambia url:' + params['listado']);
            _this.reportName = params['listado'];
            _this.viewChild.cambiaReport(_this.reportName);
        });
    };
    GpAppReportFrameComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    __decorate([
        core_1.ViewChild(gp_app_report_dialog_component_1.GpAppReportDialogComponent)
    ], GpAppReportFrameComponent.prototype, "viewChild");
    GpAppReportFrameComponent = __decorate([
        core_1.Component({
            templateUrl: './gp-app-report-frame.component.html'
        })
    ], GpAppReportFrameComponent);
    return GpAppReportFrameComponent;
}());
exports.GpAppReportFrameComponent = GpAppReportFrameComponent;
//# sourceMappingURL=gp-app-report-frame.component.js.map
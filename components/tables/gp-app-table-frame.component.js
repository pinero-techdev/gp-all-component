"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var gp_app_table_crud_component_1 = require("./gp-app-table-crud.component");
var GpAppTableFrameComponent = (function () {
    function GpAppTableFrameComponent(_route, _router) {
        this._route = _route;
        this._router = _router;
    }
    GpAppTableFrameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._route.params.subscribe(function (params) {
            console.log('Cambia url:' + params['tabla']);
            _this.tableName = params['tabla'];
            _this.viewChild.closeDialog();
            _this.viewChild.cambiaTabla(_this.tableName);
        });
    };
    GpAppTableFrameComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    __decorate([
        core_1.ViewChild(gp_app_table_crud_component_1.GpAppTableCrudComponent)
    ], GpAppTableFrameComponent.prototype, "viewChild");
    GpAppTableFrameComponent = __decorate([
        core_1.Component({
            templateUrl: './gp-app-table-frame.component.html'
        })
    ], GpAppTableFrameComponent);
    return GpAppTableFrameComponent;
}());
exports.GpAppTableFrameComponent = GpAppTableFrameComponent;
//# sourceMappingURL=gp-app-table-frame.component.js.map
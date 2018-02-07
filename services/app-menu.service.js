"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AppMenuService = (function () {
    function AppMenuService(_appMenuProvider) {
        this._appMenuProvider = _appMenuProvider;
        this.temp = _appMenuProvider.getEstructuraMenu();
    }
    AppMenuService.prototype.obtenMenu = function (rq) {
        var _this = this;
        //TODO optimizar programandolo de forma recursiva para cualquier numero de niveles
        if (rq.usuario != undefined && rq.usuario != null) {
            this._appMenuProvider.obtenOpcionesActivas(rq).subscribe(function (data) {
                if (data) {
                    if (data.menu.opciones != undefined) {
                        //lvl 1
                        for (var i = 0; i < _this.temp.length; i++) {
                            if (_this.tieneSubMenu(_this.temp[i])) {
                                //lvl 2
                                for (var j = 0; j < _this.temp[i].submenus.length; j++) {
                                    if (_this.tieneSubMenu(_this.temp[i].submenus[j])) {
                                        //lvl 3
                                        for (var k = 0; k < _this.temp[i].submenus[j].submenus.length; k++) {
                                            if (_this.tieneSubMenu(_this.temp[i].submenus[j].submenus[k])) {
                                                //lvl 4
                                                for (var l = 0; l < _this.temp[i].submenus[j].submenus[k].submenus.length; l++) {
                                                    if (_this.tieneSubMenu(_this.temp[i].submenus[j].submenus[k].submenus[l])) {
                                                        //lvl 5
                                                        for (var m = 0; m < _this.temp[i].submenus[j].submenus[k].submenus[l].submenus.length; m++) {
                                                            if (_this.tieneSubMenu(_this.temp[i].submenus[j].submenus[k].submenus[l])) {
                                                                //lvl 6
                                                                if (_this.esOpcionValida(_this.temp[i].submenus[j].submenus[k].submenus[l].submenus[m].id, data.menu.opciones)) {
                                                                    _this.temp[i].submenus[j].submenus[k].submenus[l].submenus[m].enabled = true;
                                                                    _this.temp[i].submenus[j].submenus[k].submenus[l].enabled = true;
                                                                    _this.temp[i].submenus[j].submenus[k].enabled = true;
                                                                    _this.temp[i].submenus[j].enabled = true;
                                                                    _this.temp[i].enabled = true;
                                                                }
                                                            }
                                                            else if (_this.esOpcionValida(_this.temp[i].submenus[j].submenus[k].submenus[l].submenus[m].id, data.menu.opciones)) {
                                                                _this.temp[i].submenus[j].submenus[k].submenus[l].submenus[m].enabled = true;
                                                                _this.temp[i].submenus[j].submenus[k].submenus[l].enabled = true;
                                                                _this.temp[i].submenus[j].submenus[k].enabled = true;
                                                                _this.temp[i].submenus[j].enabled = true;
                                                                _this.temp[i].enabled = true;
                                                            }
                                                        }
                                                    }
                                                    else if (_this.esOpcionValida(_this.temp[i].submenus[j].submenus[k].submenus[l].id, data.menu.opciones)) {
                                                        _this.temp[i].submenus[j].submenus[k].submenus[l].enabled = true;
                                                        _this.temp[i].submenus[j].submenus[k].enabled = true;
                                                        _this.temp[i].submenus[j].enabled = true;
                                                        _this.temp[i].enabled = true;
                                                    }
                                                }
                                            }
                                            else if (_this.esOpcionValida(_this.temp[i].submenus[j].submenus[k].id, data.menu.opciones)) {
                                                _this.temp[i].submenus[j].submenus[k].enabled = true;
                                                _this.temp[i].submenus[j].enabled = true;
                                                _this.temp[i].enabled = true;
                                            }
                                        }
                                    }
                                    else if (_this.esOpcionValida(_this.temp[i].submenus[j].id, data.menu.opciones)) {
                                        _this.temp[i].submenus[j].enabled = true;
                                        _this.temp[i].enabled = true;
                                    }
                                }
                            }
                            else if (_this.esOpcionValida(_this.temp[i].id, data.menu.opciones)) {
                                _this.temp[i].enabled = true;
                            }
                        }
                    }
                }
                else {
                    console.error("No se recuperó un menú");
                }
            }, function (error) { return console.error(error); }, function () {
                console.debug("finalizado obtenMenu");
                return _this.temp;
            });
            return this.temp; //Un cop funcioni el menu llevar això
        }
        else {
            return this.temp;
        }
    };
    AppMenuService.prototype.esOpcionValida = function (id, options) {
        return (options[id] != undefined);
    };
    AppMenuService.prototype.tieneSubMenu = function (elemento) {
        return (elemento.submenus != undefined && elemento.submenus != null);
    };
    AppMenuService = __decorate([
        core_1.Injectable()
    ], AppMenuService);
    return AppMenuService;
}());
exports.AppMenuService = AppMenuService;
//# sourceMappingURL=app-menu.service.js.map
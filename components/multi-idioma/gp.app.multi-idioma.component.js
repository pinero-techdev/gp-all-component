"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var multi_idioma_service_1 = require("../../services/multi-idioma.service");
exports.orderLanguage = ['ES', 'EN', 'FR', 'DE', 'IT', 'PT'];
var GpAppMultiIdiomaComponent = (function () {
    function GpAppMultiIdiomaComponent(_multiIdiomaService) {
        this._multiIdiomaService = _multiIdiomaService;
        this.orderByLangCod = true;
    }
    GpAppMultiIdiomaComponent.prototype.ngOnInit = function () {
        this.visualizarTablaTraducciones = false;
        this.visualizarEdicionHTML = false;
    };
    GpAppMultiIdiomaComponent.prototype.despliegaTraducciones = function () {
        this.getTraducciones();
    };
    GpAppMultiIdiomaComponent.prototype.getTraducciones = function () {
        var _this = this;
        var request = new multi_idioma_service_1.GetTraduccionesRq(this.pKey, this.esquema, this.tabla, this.campo);
        this._multiIdiomaService.getTraducciones(request).subscribe(
        // the first argument is a function which runs on success
        function (data) {
            if (data.ok) {
                var traducciones = data.traducciones;
                if (!_this.orderByLangCod) {
                    traducciones = _this.ordenarTraducciones(data.traducciones, exports.orderLanguage);
                }
                _this.elementosTraducciones = traducciones;
            }
            else if (data.error != null) {
                console.error(data.error.internalErrorMessage);
            }
        }, 
        // the second argument is a function which runs on error
        function (err) { return console.error(err); }, 
        // the third argument is a function which runs on completion
        function () {
            console.debug('Realizada la carga de las traducciones');
            _this.visualizarTablaTraducciones = true;
        });
    };
    GpAppMultiIdiomaComponent.prototype.ordenarTraducciones = function (traducciones, ordenIds) {
        var traduccionesOrdenadas = [];
        for (var _i = 0, ordenIds_1 = ordenIds; _i < ordenIds_1.length; _i++) {
            var codIdioma = ordenIds_1[_i];
            for (var _a = 0, traducciones_1 = traducciones; _a < traducciones_1.length; _a++) {
                var traduccion = traducciones_1[_a];
                if (traduccion.codigoIdioma == codIdioma) {
                    traduccionesOrdenadas.push(traduccion);
                    break;
                }
            }
        }
        return traduccionesOrdenadas;
    };
    GpAppMultiIdiomaComponent.prototype.guardarCambios = function () {
        for (var _i = 0, _a = this.elementosTraducciones; _i < _a.length; _i++) {
            var traduccionesInsertar = _a[_i];
            var request = new multi_idioma_service_1.UpdateTraduccionesRq(this.pKey, this.esquema, this.tabla, this.campo, traduccionesInsertar.codigoIdioma, traduccionesInsertar.idiomaPaisTraduccion);
            console.log(request);
            this._multiIdiomaService.actualizaTraducciones(request).subscribe(
            // the first argument is a function which runs on success
            function (data) {
                if (data.ok) {
                }
                else if (data.error != null) {
                    console.error(data.error.internalErrorMessage);
                }
            }, 
            // the second argument is a function which runs on error
            function (err) { return console.error(err); }, 
            // the third argument is a function which runs on completion
            function () { return console.debug('Realizada la inserccion/actualizacion de la traduccion'); });
        }
        this.cerrarEdicionTraduccion();
    };
    GpAppMultiIdiomaComponent.prototype.contieneHtml = function (traduccion) {
        return traduccion != null && traduccion.indexOf("</") != -1;
    };
    GpAppMultiIdiomaComponent.prototype.cerrarEdicionTraduccion = function () {
        for (var propiedad in this) {
            propiedad = null;
        }
        this.visualizarTablaTraducciones = false;
    };
    GpAppMultiIdiomaComponent.prototype.mostrarDialogoEdicionHTML = function (traduccion) {
        this.textoHTML = new multi_idioma_service_1.Traduccion(traduccion.codigoIdioma, traduccion.idiomaPais, traduccion.idiomaPaisTraduccion != null ? traduccion.idiomaPaisTraduccion : '');
        if (this.habilitarEdicionHTML) {
            this.visualizarTablaTraducciones = false;
            this.visualizarEdicionHTML = true;
            this.traduccionTextoHTML = this.textoHTML.idiomaPaisTraduccion;
            this.traduccionIdiomaHTML = this.textoHTML.idiomaPais;
        }
    };
    GpAppMultiIdiomaComponent.prototype.guardarCambiosHTML = function () {
        for (var item in this.elementosTraducciones) {
            if (this.elementosTraducciones[item].idiomaPais == this.traduccionIdiomaHTML) {
                this.elementosTraducciones[item].idiomaPaisTraduccion = this.traduccionTextoHTML;
                this.cerrarEdicionHTML();
            }
        }
    };
    GpAppMultiIdiomaComponent.prototype.cerrarEdicionHTML = function () {
        this.visualizarEdicionHTML = false;
        this.visualizarTablaTraducciones = true;
        this.textoHTML = null;
    };
    __decorate([
        core_1.Input()
    ], GpAppMultiIdiomaComponent.prototype, "tabla");
    __decorate([
        core_1.Input()
    ], GpAppMultiIdiomaComponent.prototype, "pKey");
    __decorate([
        core_1.Input()
    ], GpAppMultiIdiomaComponent.prototype, "esquema");
    __decorate([
        core_1.Input()
    ], GpAppMultiIdiomaComponent.prototype, "campo");
    __decorate([
        core_1.Input()
    ], GpAppMultiIdiomaComponent.prototype, "campoDescripcion");
    __decorate([
        core_1.Input()
    ], GpAppMultiIdiomaComponent.prototype, "habilitarEdicionHTML");
    __decorate([
        core_1.Input()
    ], GpAppMultiIdiomaComponent.prototype, "orderByLangCod");
    GpAppMultiIdiomaComponent = __decorate([
        core_1.Component({
            selector: 'gp-app-multi-idioma',
            templateUrl: './gp.app.multi-idioma.component.html',
            providers: [multi_idioma_service_1.MultiIdomaService]
        })
    ], GpAppMultiIdiomaComponent);
    return GpAppMultiIdiomaComponent;
}());
exports.GpAppMultiIdiomaComponent = GpAppMultiIdiomaComponent;
//# sourceMappingURL=gp.app.multi-idioma.component.js.map
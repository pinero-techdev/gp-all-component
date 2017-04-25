"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var global_service_1 = require("./global.service");
var common_service_1 = require("./common.service");
var Traduccion = (function () {
    function Traduccion(lenguageCode, idioma, traduccion) {
        this.codigoIdioma = lenguageCode;
        this.idiomaPais = idioma;
        this.idiomaPaisTraduccion = traduccion;
    }
    return Traduccion;
}());
exports.Traduccion = Traduccion;
var GetTraduccionesRq = (function () {
    function GetTraduccionesRq(primaryKey, schema, table, field) {
        this.pKey = primaryKey;
        this.esquema = schema;
        this.tabla = table;
        this.campo = field;
    }
    return GetTraduccionesRq;
}());
exports.GetTraduccionesRq = GetTraduccionesRq;
var GetTraduccionesRs = (function (_super) {
    __extends(GetTraduccionesRs, _super);
    function GetTraduccionesRs() {
        _super.apply(this, arguments);
    }
    return GetTraduccionesRs;
}(common_service_1.CommonRs));
exports.GetTraduccionesRs = GetTraduccionesRs;
var UpdateTraduccionesRq = (function () {
    function UpdateTraduccionesRq(primaryKey, schema, table, field, lenguage_code, translation_text) {
        this.pKey = primaryKey;
        this.esquema = schema;
        this.tabla = table;
        this.campo = field;
        this.lang_codi = lenguage_code;
        this.texto_traduc = translation_text;
    }
    return UpdateTraduccionesRq;
}());
exports.UpdateTraduccionesRq = UpdateTraduccionesRq;
var UpdateTraduccionesRs = (function (_super) {
    __extends(UpdateTraduccionesRs, _super);
    function UpdateTraduccionesRs() {
        _super.apply(this, arguments);
    }
    return UpdateTraduccionesRs;
}(common_service_1.CommonRs));
exports.UpdateTraduccionesRs = UpdateTraduccionesRs;
var MultiIdomaService = (function (_super) {
    __extends(MultiIdomaService, _super);
    function MultiIdomaService(_http) {
        _super.call(this, _http);
        this._http = _http;
    }
    MultiIdomaService.prototype.getTraducciones = function (request) {
        var rq = JSON.stringify(request);
        //TODO cambiar la cadena de conexion cuando se tenga el WS
        return this.serviceGetRq(global_service_1.GlobalService.BASE_URL + "/multiidioma-svc/getTranslations", rq);
    };
    MultiIdomaService.prototype.actualizaTraducciones = function (request) {
        //TODO cambiar la cadena de conexion cuando se tenga el WS
        var url = global_service_1.GlobalService.BASE_URL + "/multiidioma-svc/updateTranslations";
        var rq = JSON.stringify(request);
        return this.serviceRequest(url, rq);
    };
    MultiIdomaService = __decorate([
        core_1.Injectable()
    ], MultiIdomaService);
    return MultiIdomaService;
}(common_service_1.CommonService));
exports.MultiIdomaService = MultiIdomaService;
//# sourceMappingURL=multi-idioma.service.js.map
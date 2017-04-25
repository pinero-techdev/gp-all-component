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
var core_1 = require('@angular/core');
var common_service_1 = require("./common.service");
var table_service_1 = require("./table.service");
var GetDialogElementsRs = (function (_super) {
    __extends(GetDialogElementsRs, _super);
    function GetDialogElementsRs() {
        _super.apply(this, arguments);
        this.metadata = [];
    }
    return GetDialogElementsRs;
}(common_service_1.CommonRs));
exports.GetDialogElementsRs = GetDialogElementsRs;
var ReportService = (function (_super) {
    __extends(ReportService, _super);
    function ReportService(_http) {
        _super.call(this, _http);
        this._http = _http;
    }
    /**
     * Función que nos devuelve la URL montada, que nos permitirá ver el pdf
     * con los datos de contacto rellenos
     * @param hotel
     * @param reserva
     * @returns {string}
     */
    ReportService.prototype.getReportCal = function (report, extraArgs) {
        var userId = "HOTCAL/SOF@BP"; // Identificador de usuario
        var baseUrl = "http://frm10tic.grupo-pinero.com/reports/rwservlet"; // Servidor que nos proporciona el servicio
        var URL = baseUrl + "?server=repServicios&report=" + report + "&userid=" + userId;
        if (extraArgs != undefined && extraArgs != null) {
            URL += extraArgs;
        }
        URL += "&paramform=NO&destype=cache&mode=bitmap&desformat=PDF";
        return URL;
    };
    ReportService.prototype.getReportCRM = function (report, extraArgs) {
        var userId = "HOTCRM/SOF@BP"; // Identificador de usuario
        var baseUrl = "http://frm10tic.grupo-pinero.com/reports/rwservlet"; // Servidor que nos proporciona el servicio
        var URL = baseUrl + "?server=repServicios&report=" + report + "&userid=" + userId;
        if (extraArgs != undefined && extraArgs != null) {
            URL += extraArgs;
        }
        URL += "&paramform=NO&destype=cache&mode=bitmap&desformat=PDF";
        console.log(URL);
        return URL;
    };
    ReportService.prototype.getDialogElements = function (report) {
        var dialogElements = new GetDialogElementsRs();
        dialogElements.data = null;
        dialogElements.metadata = [];
        dialogElements.ok = true;
        switch (report) {
            case "CLDRW031":
                dialogElements.data = { "hotel": "", "fecha_desde": "", "fecha_hasta": "", "clasif": "", "dptoNomb": "", "averia": "" };
                var field = new table_service_1.FieldMetadata(5, "hotel", 'STRING', false, false, false, false, 15, null, new table_service_1.FieldDisplayInfo("Hotel", 1, "DROPDOWN", "", "", null, "AHoteles", "hotCodigo", null, ["hotCodigo", "hotNombre"], null, null, null));
                dialogElements.metadata.push(field);
                field = new table_service_1.FieldMetadata(5, "fecha_desde", "DATE", false, true, false, false, 15, null, new table_service_1.FieldDisplayInfo("Fecha desde", 2, "CALENDAR", "", "", null, null, null, null, null, null, null, null));
                dialogElements.metadata.push(field);
                field = new table_service_1.FieldMetadata(5, "fecha_hasta", "DATE", false, true, false, false, 15, null, new table_service_1.FieldDisplayInfo("Fecha hasta", 3, "CALENDAR", "", "", null, null, null, null, null, null, null, null));
                dialogElements.metadata.push(field);
                field = new table_service_1.FieldMetadata(5, "clasif", 'STRING', false, false, false, false, 15, null, new table_service_1.FieldDisplayInfo("Clasificación", 4, "DROPDOWN", "", "", null, "CdEcla", "eclaNomb", null, ["eclaDesc"], null, null, null));
                dialogElements.metadata.push(field);
                field = new table_service_1.FieldMetadata(5, "edptNomb", 'STRING', false, false, false, false, 15, null, new table_service_1.FieldDisplayInfo("Departamento", 5, "DROPDOWN", "", "", null, "CdEdpt", "edptNomb", null, ["edptDesc"], null, null, null));
                dialogElements.metadata.push(field);
                field = new table_service_1.FieldMetadata(5, "averia", 'STRING', false, false, false, false, 15, null, new table_service_1.FieldDisplayInfo("Avería", 6, "DROPDOWN_RELATED", "", "", null, "CdEtia", "etiaNomb", null, ["etiaDesc"], null, "edptNomb", null));
                dialogElements.metadata.push(field);
                dialogElements.title = 'Comparativo Hoteles';
                return dialogElements;
            default:
                dialogElements.title = 'Departamento y Solicitudes';
                return dialogElements;
        }
    };
    ReportService = __decorate([
        core_1.Injectable()
    ], ReportService);
    return ReportService;
}(common_service_1.CommonService));
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map
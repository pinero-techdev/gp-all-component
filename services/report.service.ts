import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CommonService, CommonRs} from "./common.service";
import {FieldMetadata, FieldDisplayInfo} from "./table.service";
import {SelectItem} from "primeng/primeng";

export class GetDialogElementsRs extends CommonRs{

    metadata: FieldMetadata [] = [];
    data: any;
    title: string;

}

@Injectable()
export class ReportService extends CommonService {

    constructor(private _http: Http) {
        super(_http);
    }

    /**
     * Función que nos devuelve la URL montada, que nos permitirá ver el pdf
     * con los datos de contacto rellenos
     * @param hotel
     * @param reserva
     * @returns {string}
     */
    getReportCal(report: string, extraArgs: string) {
        let userId = "HOTCAL/SOF@BP"; // Identificador de usuario
        let baseUrl = "http://frm10tic.grupo-pinero.com/reports/rwservlet"; // Servidor que nos proporciona el servicio
        let URL = baseUrl + "?server=repServicios&report=" + report + "&userid=" + userId;
        if (extraArgs != undefined && extraArgs != null) {
            URL += extraArgs;
        }
        URL += "&paramform=NO&destype=cache&mode=bitmap&desformat=PDF";
        return URL;
    }

    getReportCRM(report: string, extraArgs: string){
        let userId = "HOTCRM/SOF@BP"; // Identificador de usuario
        let baseUrl = "http://frm10tic.grupo-pinero.com/reports/rwservlet"; // Servidor que nos proporciona el servicio
        let URL = baseUrl + "?server=repServicios&report=" + report + "&userid=" + userId;
        if (extraArgs != undefined && extraArgs != null) {
            URL += extraArgs;
        }
        URL += "&paramform=NO&destype=cache&mode=bitmap&desformat=PDF";
        console.log(URL);
        return URL;
    }

    getDialogElements(report: string): GetDialogElementsRs {

        let dialogElements = new GetDialogElementsRs();
        dialogElements.data = null;
        dialogElements.metadata = [];
        dialogElements.ok = true;

        switch (report) {

            case "CLDRW031":
                dialogElements.data = {"hotel": "", "fecha_desde": "", "fecha_hasta": "", "clasif": "", "dptoNomb": "", "averia": "" };
                let field: FieldMetadata = new FieldMetadata(5, "hotel", 'STRING', false, false, false, false, 15, null, new FieldDisplayInfo("Hotel", 1, "DROPDOWN","", "", null, "AHoteles","hotCodigo", null, ["hotCodigo","hotNombre"], null, null, null ));
                dialogElements.metadata.push(field);
                field = new FieldMetadata(5, "fecha_desde", "DATE", false, true, false, false, 15, null, new FieldDisplayInfo("Fecha desde", 2, "CALENDAR", "", "", null, null, null, null, null, null, null, null ));
                dialogElements.metadata.push(field);
                field = new FieldMetadata(5, "fecha_hasta", "DATE", false, true, false, false, 15, null, new FieldDisplayInfo("Fecha hasta", 3, "CALENDAR", "", "", null, null, null, null, null, null, null, null ));
                dialogElements.metadata.push(field);
                field = new FieldMetadata(5, "clasif", 'STRING', false, false, false, false, 15, null, new FieldDisplayInfo("Clasificación", 4, "DROPDOWN", "", "", null, "CdEcla", "eclaNomb", null, ["eclaDesc"], null, null, null ));
                dialogElements.metadata.push(field);
                field = new FieldMetadata(5, "edptNomb", 'STRING', false, false, false, false, 15, null, new FieldDisplayInfo("Departamento", 5, "DROPDOWN", "", "", null, "CdEdpt", "edptNomb", null, ["edptDesc"], null, null, null ));
                dialogElements.metadata.push(field);
                field = new FieldMetadata(5, "averia", 'STRING', false, false, false, false, 15, null, new FieldDisplayInfo("Avería", 6, "DROPDOWN_RELATED", "", "", null, "CdEtia", "etiaNomb", null, ["etiaDesc"], null, "edptNomb", null ));
                dialogElements.metadata.push(field);
                dialogElements.title = 'Comparativo Hoteles';
                return dialogElements;
            default:
                dialogElements.title = 'Departamento y Solicitudes';
                return dialogElements;
        }

    }
}

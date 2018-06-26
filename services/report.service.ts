import {Injectable} from "@angular/core";
import {CommonService, CommonRs} from "./common.service";
import {FieldMetadata, FieldDisplayInfo} from "./table.service";
export class GetDialogElementsRs extends CommonRs {

    metadata: FieldMetadata [] = [];
    data: any;
    title: string;

}

@Injectable()
export class ReportService extends CommonService {
    getReport(report: string, userId: string, baseUrl: string, server: string, extraArgs: string) {
        let URL = baseUrl + "?server=" + server + "&report=" + report + "&userid=" + userId;
        if (extraArgs != undefined && extraArgs != null) {
            URL += extraArgs;
        }
        URL += "&paramform=NO&destype=cache&mode=bitmap&desformat=PDF";
        return URL;
    }

    //TODO REFACTORIZAR Y ELIMINAR
    getDialogElements(report: string): GetDialogElementsRs {

        let dialogElements = new GetDialogElementsRs();
        dialogElements.data = null;
        dialogElements.metadata = [];
        dialogElements.ok = true;

        switch (report) {

            case "CLDRW031":
                dialogElements.data = {
                    "hotel": "",
                    "fecha_desde": "",
                    "fecha_hasta": "",
                    "clasif": "",
                    "dptoNomb": "",
                    "averia": ""
                };
                let field: FieldMetadata = new FieldMetadata(5, "hotel", 'STRING', false, false, false, false, 15, null, new FieldDisplayInfo("Hotel", 1, "DROPDOWN", "", "", null, "AHoteles", "hotCodigo", null, null, null, ["hotCodigo", "hotNombre"], null, null, null));
                dialogElements.metadata.push(field);
                field = new FieldMetadata(5, "fecha_desde", "DATE", false, true, false, false, 15, null, new FieldDisplayInfo("Fecha desde", 2, "CALENDAR", "", "", null, null, null, null, null, null, null, null, null, null));
                dialogElements.metadata.push(field);
                field = new FieldMetadata(5, "fecha_hasta", "DATE", false, true, false, false, 15, null, new FieldDisplayInfo("Fecha hasta", 3, "CALENDAR", "", "", null, null, null, null, null, null, null, null, null, null));
                dialogElements.metadata.push(field);
                field = new FieldMetadata(5, "clasif", 'STRING', false, false, false, false, 15, null, new FieldDisplayInfo("Clasificación", 4, "DROPDOWN", "", "", null, "CdEcla", "eclaNomb", null, null, null, ["eclaDesc"], null, null, null));
                dialogElements.metadata.push(field);
                field = new FieldMetadata(5, "edptNomb", 'STRING', false, false, false, false, 15, null, new FieldDisplayInfo("Departamento", 5, "DROPDOWN", "", "", null, "CdEdpt", "edptNomb", null, null, null, ["edptDesc"], null, null, null));
                dialogElements.metadata.push(field);
                field = new FieldMetadata(5, "averia", 'STRING', false, false, false, false, 15, null, new FieldDisplayInfo("Avería", 6, "DROPDOWN_RELATED", "", "", null, "CdEtia", "etiaNomb", null, null, null, ["etiaDesc"], null, "edptNomb", null));
                dialogElements.metadata.push(field);
                dialogElements.title = 'Comparativo Hoteles';
                return dialogElements;
            default:
                dialogElements.title = 'Departamento y Solicitudes';
                return dialogElements;
        }

    }
}

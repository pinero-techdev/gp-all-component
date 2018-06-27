import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {GlobalService} from "./global.service";
import {CommonService, CommonRs} from "./common.service";
import {Traduccion} from "gp-all-component/resources/data/traduccion";

export class GetTraduccionesRq {
    pKey: string;
    esquema: string;
    tabla: string;
    campo: string;

    constructor(primaryKey: string, schema: string, table: string, field: string) {
        this.pKey = primaryKey;
        this.esquema = schema;
        this.tabla = table;
        this.campo = field;
    }
}

export class GetTraduccionesRs extends CommonRs {
    traducciones: Traduccion[];
}

export class UpdateTraduccionesRq {
    pKey: string;
    esquema: string;
    tabla: string;
    campo: string;
    lang_codi: string;
    texto_traduc: string;

    constructor(primaryKey: string, schema: string, table: string, field: string, lenguage_code: string, translation_text: string) {
        this.pKey = primaryKey;
        this.esquema = schema;
        this.tabla = table;
        this.campo = field;
        this.lang_codi = lenguage_code;
        this.texto_traduc = translation_text;
    }
}

export class UpdateTraduccionesRs extends CommonRs {

}

@Injectable()
export class MultiIdomaService extends CommonService {
    getTraducciones(request: GetTraduccionesRq): Observable<GetTraduccionesRs> {
        let urlServicio = `${GlobalService.BASE_URL}/multiidioma-svc/getTranslations`;
        let rq = JSON.stringify(request);

        return this.serviceRequest<GetTraduccionesRs>(
            urlServicio, rq)
    }

    actualizaTraducciones(request: UpdateTraduccionesRq): Observable<UpdateTraduccionesRs> {
        let url = `${GlobalService.BASE_URL}/multiidioma-svc/updateTranslations`;
        let rq = JSON.stringify(request);

        return this.serviceRequest<UpdateTraduccionesRs>(url, rq);
    }
}

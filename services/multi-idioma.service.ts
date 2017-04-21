import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {GlobalService} from "./global.service";
import {CommonService, CommonRs} from "./common.service";
import {Http} from "@angular/http";

export class Traduccion {
  codigoIdioma: string;
  idiomaPais: string;
  idiomaPaisTraduccion: string;

  constructor(lenguageCode,idioma, traduccion){
    this.codigoIdioma = lenguageCode;
    this.idiomaPais = idioma;
    this.idiomaPaisTraduccion = traduccion;
  }
}
  export class GetTraduccionesRq {
    pKey: string;
    esquema: string;
    tabla: string;
    campo: string;

    constructor(primaryKey: string, schema: string, table: string, field: string){
      this.pKey = primaryKey;
      this.esquema = schema;
      this.tabla = table;
      this.campo = field;
  }
}

  export class GetTraduccionesRs extends CommonRs {
    traducciones:Traduccion[];
  }

  export class UpdateTraduccionesRq {
    pKey: string;
    esquema: string;
    tabla: string;
    campo: string;
	  lang_codi: string;
	  texto_traduc: string;

    constructor(primaryKey: string, schema: string, table: string, field: string, lenguage_code: string, translation_text: string){
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

  constructor(private _http: Http) {
    super(_http);
  }


  getTraducciones(request: GetTraduccionesRq): Observable<GetTraduccionesRs> {
    let rq = JSON.stringify(request);
    //TODO cambiar la cadena de conexion cuando se tenga el WS
    return this.serviceGetRq<GetTraduccionesRs>(
      `${GlobalService.BASE_URL}/multiidioma-svc/getTranslations`, rq)
  }

  actualizaTraducciones(request: UpdateTraduccionesRq): Observable<UpdateTraduccionesRs> {
    //TODO cambiar la cadena de conexion cuando se tenga el WS
    let url = `${GlobalService.BASE_URL}/multiidioma-svc/updateTranslations`;
    let rq = JSON.stringify(request);

    return this.serviceRequest<UpdateTraduccionesRs>(url, rq);
  }



}

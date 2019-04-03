import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Traduccion} from '../../../resources/data/traduccion.model';
import {CommonRs, CommonService} from '../../core/common.service';
import {GlobalService} from '../../core/global.service';

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

@Injectable()
export class MultiIdomaService extends CommonService {
    getTraducciones(request: GetTraduccionesRq): Observable<GetTraduccionesRs> {
    const urlServicio = `${GlobalService.getBASE_URL()}/multiidioma-svc/getTranslations`;
    const rq = JSON.stringify(request);

    return this.post<GetTraduccionesRs>(
      urlServicio, rq);
  }

  actualizaTraducciones(request: UpdateTraduccionesRq): Observable<CommonRs> {
    const url = `${GlobalService.getBASE_URL()}/multiidioma-svc/updateTranslations`;
    const rq = JSON.stringify(request);

    return this.post<CommonRs>(url, rq);
  }
}

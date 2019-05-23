import { CommonService } from './../../core/common.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Translation } from '../../../resources/data/translation.model';
import { CommonRs } from '../../core/common.service';
import { GlobalService } from '../../core/global.service';

export class GetTranslationsRq {
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

export class GetTranslationsRs extends CommonRs {
  traducciones: Translation[];
}

/* tslint:disable:variable-name */
export class UpdateTranslationsRq {
  pKey: string;
  esquema: string;
  tabla: string;
  campo: string;
  lang_codi: string;
  texto_traduc: string;

  constructor(
    primaryKey: string,
    schema: string,
    table: string,
    field: string,
    langCode: string,
    translationText: string
  ) {
    this.pKey = primaryKey;
    this.esquema = schema;
    this.tabla = table;
    this.campo = field;
    this.lang_codi = langCode;
    this.texto_traduc = translationText;
  }
}
/* tslint:enable:variable-name */

@Injectable({ providedIn: 'root' })
export class MultiLanguageService extends CommonService {
  getTranslations(request: GetTranslationsRq): Observable<GetTranslationsRs> {
    const urlServicio = `${GlobalService.getBASE_URL()}/multiidioma-svc/getTranslations`;
    const rq = JSON.stringify(request);
    return this.post<GetTranslationsRs>(urlServicio, rq);
  }

  updateTranslations(request: UpdateTranslationsRq): Observable<CommonRs> {
    const url = `${GlobalService.getBASE_URL()}/multiidioma-svc/updateTranslations`;
    const rq = JSON.stringify(request);
    return this.post<CommonRs>(url, rq);
  }
}

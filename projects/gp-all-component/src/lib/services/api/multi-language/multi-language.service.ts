import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Translation } from '../../../resources/data/translation.model';
import { CommonRs, CommonService } from '../../core/common.service';
import { GlobalService } from '../../core/global.service';

export class GetTranslationsRq {
  pKey: string;
  schema: string;
  table: string;
  field: string;

  constructor(primaryKey: string, schema: string, table: string, field: string) {
    this.pKey = primaryKey;
    this.schema = schema;
    this.table = table;
    this.field = field;
  }
}

export class GetTranslationsRs extends CommonRs {
  translations: Translation[];
}
/* tslint:disable:variable-name */
export class UpdateTranslationsRq {
  pKey: string;
  schema: string;
  table: string;
  field: string;
  langCode: string;
  translationText: string;

  constructor(
    primaryKey: string,
    schema: string,
    table: string,
    field: string,
    langCode: string,
    translationText: string
  ) {
    this.pKey = primaryKey;
    this.schema = schema;
    this.table = table;
    this.field = field;
    this.langCode = langCode;
    this.translationText = translationText;
  }
}
/* tslint:enable:variable-name */

@Injectable()
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

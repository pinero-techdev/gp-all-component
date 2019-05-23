import { Observable } from 'rxjs/Observable';
import { CommonRs } from './../../core/common.service';
import {
  ErrorInformation, //
} from './../../../resources/data/error-information/error-information.model';

import { of, throwError } from 'rxjs';
import { Translation } from './../../../resources/data/translation.model';
import {
  GetTranslationsRs,
  GetTranslationsRq,
  UpdateTranslationsRq, //
} from './../../../services/api/multi-language/multi-language.service';

export class MultiLanguageServiceMock {
  translations: Translation[] = [
    new Translation('DE', 'ALEMAN', null),
    new Translation('ES', 'ESPA\u00d1OL', null),
    new Translation('FR', 'FRANCES', null),
    new Translation('EN', 'INGLES', null),
    new Translation('IT', 'ITALIANO', null),
    new Translation('PT', 'PORTUGUES', null),
    new Translation('RU', 'RUSO', null),
  ];

  public getTranslations(request: GetTranslationsRq) {
    const response = new GetTranslationsRs();
    if (request.pKey && request.esquema && request.tabla && request.campo) {
      response.ok = true;
      response.traducciones = this.translations;
    } else {
      response.ok = false;
      response.error = new ErrorInformation();
      response.error.errorMessage = 'An error has occurred.';
      response.error.internalErrorMessage = 'An error has occurred.';
    }
    return of(response);
  }

  public updateTranslations(request: UpdateTranslationsRq): Observable<CommonRs> {
    const response = new CommonRs();
    response.ok = true;
    if (request) {
      if (request.pKey === 'ERROR') {
        response.ok = false;
        response.error = new ErrorInformation();
        response.error.internalErrorMessage = 'Error API SERVICE';
      } else if (request.pKey === 'ERROR500') {
        return throwError('Error 500!');
      }
    }
    return of(response);
  }
}

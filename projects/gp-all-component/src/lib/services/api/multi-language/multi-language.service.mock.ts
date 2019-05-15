import {
  ErrorInformation, //
} from './../../../resources/data/error-information/error-information.model';

import { of } from 'rxjs';
import { Translation } from './../../../resources/data/translation.model';
import {
  GetTranslationsRs,
  GetTranslationsRq, //
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
      response.translations = this.translations;
    } else {
      response.ok = false;
      response.error = new ErrorInformation();
      response.error.errorMessage = 'An error has occurred.';
      response.error.internalErrorMessage = 'An error has occurred.';
    }
    return of(response);
  }
}

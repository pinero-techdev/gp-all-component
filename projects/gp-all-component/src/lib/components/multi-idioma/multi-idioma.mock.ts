import { CommonRs } from './../../services/core/common.service';
import { ErrorInformation } from './../../resources/data/error-information/error-information.model';
import {
    GetTraduccionesRq,
    GetTraduccionesRs,
    UpdateTraduccionesRq,
} from './../../services/api/multi-idioma/multi-idioma.service';
import { of, Observable } from 'rxjs';
import { Traduccion } from '../../resources/data/traduccion.model';

export class MultiIdiomaServiceMock {
    translations: Traduccion[] = [
        new Traduccion('DE', 'ALEMAN', null),
        new Traduccion('ES', 'ESPA\u00d1OL', null),
        new Traduccion('FR', 'FRANCES', null),
        new Traduccion('EN', 'INGLES', null),
        new Traduccion('IT', 'ITALIANO', null),
        new Traduccion('PT', 'PORTUGUES', null),
        new Traduccion('RU', 'RUSO', null),
    ];

    public getTraducciones(request: GetTraduccionesRq): Observable<GetTraduccionesRs> {
        const response = new GetTraduccionesRs();
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

    public actualizaTraducciones(request: UpdateTraduccionesRq): Observable<CommonRs> {
        const response = new CommonRs();
        if (request.pKey && request.esquema && request.tabla && request.campo) {
            response.ok = true;
        } else {
            response.ok = false;
            response.error = new ErrorInformation();
            response.error.errorMessage = 'An error has occurred.';
            response.error.internalErrorMessage = 'An error has occurred.';
        }

        return of(response);
    }
}

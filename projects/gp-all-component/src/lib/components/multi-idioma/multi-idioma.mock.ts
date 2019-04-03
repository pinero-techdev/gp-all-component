import { GetTraduccionesRs } from '../../services/api/multi-idioma/multi-idioma.service';
import { of } from 'rxjs';
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
    
    translationsResponse: GetTraduccionesRs = new GetTraduccionesRs();

    constructor() {
        this.translationsResponse.traducciones = this.translations;
    }

    public getTraducciones() {
        return of(this.translationsResponse);
    }
}

import { GetTraduccionesRq, GetTraduccionesRs } from './../../services/api/multi-idioma/multi-idioma.service';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs';

export class MultiIdiomaServiceMock {
    payload = {
        campo: 'EDPT_DESC',
        esquema: 'HOTCAL',
        pKey: 'null',
        tabla: 'CD_EDPT',
    };

    response = {
        ok: true,
        error: null,
        traducciones: [
            {
                codigoIdioma: 'DE',
                idiomaPais: 'ALEMAN',
                idiomaPaisTraduccion: null,
            },
            {
                codigoIdioma: 'ES',
                idiomaPais: 'ESPA\u00d1OL',
                idiomaPaisTraduccion: null,
            },
            {
                codigoIdioma: 'FR',
                idiomaPais: 'FRANCES',
                idiomaPaisTraduccion: null,
            },
            {
                codigoIdioma: 'EN',
                idiomaPais: 'INGLES',
                idiomaPaisTraduccion: null,
            },
            {
                codigoIdioma: 'IT',
                idiomaPais: 'ITALIANO',
                idiomaPaisTraduccion: null,
            },
            {
                codigoIdioma: 'PT',
                idiomaPais: 'PORTUGUES',
                idiomaPaisTraduccion: null,
            },
            {
                codigoIdioma: 'RU',
                idiomaPais: 'RUSO',
                idiomaPaisTraduccion: null,
            },
        ],
    };

    public getTraducciones(request: GetTraduccionesRq): Observable<GetTraduccionesRs> {
        const r = new GetTraduccionesRs();
        console.info('MOCK', r)
        return of(r);
    }
}
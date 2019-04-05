import { MenuRq } from '../../services/api/main-menu/main-menu.service';
import { Observable, of } from 'rxjs';

export class MainMenuServiceMock {
    menu = {
        opciones: [
            {
                id: 'BPGCP01A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'BPGCP02A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR000',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR000A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR001A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR001A2',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR004A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR004A2',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR019A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR020A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR012A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR005A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR023',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR023A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR033',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR033A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR034A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR035A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR037A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR038A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR040A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR041A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR042A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR043A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CLDFR000A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CLDRW031',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CLDRW032',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CLDFR026A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CLDFR027A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CLDFR028A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CLDFR029A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CLDFR029B',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CLDFR035A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'BPGFR001A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'BPGFR002A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'FROFR000A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'FROFR001',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'FROFR001B',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'FROFR002',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'INHFR001A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR215A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR105A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR050A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR051A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR052A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'CRMFR053A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR001A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR007A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR034A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR035A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR060A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR061A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR062A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR201A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR202A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR203A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR204A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR206A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR208A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR209A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR210A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR211A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'SERFR217A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
            {
                id: 'WCOFR003A',
                propiedades: ['insertar', 'borrar', 'modificar', 'consultar', 'exportar'],
            },
        ],
        roles: [
            {
                rolCodigo: 'BPGADMIN',
                rolDesc: 'ADMINISTRADOR BPG',
                rolEmpCodigo: 'KIP',
            },
            {
                rolCodigo: 'BPGDESA360',
                rolDesc: 'DESARROLLOS 360 BPG',
                rolEmpCodigo: 'KIP',
            },
            {
                rolCodigo: 'BPGDOCFICHA',
                rolDesc: 'Aut. para ver/mod documentaci\u00f3n ficha',
                rolEmpCodigo: 'KIP',
            },
            {
                rolCodigo: 'BPGFICHACLI360',
                rolDesc: 'FICHA CLIENTE 360',
                rolEmpCodigo: 'KIP',
            },
        ],
    };

    obtenMenu(rq: MenuRq): Observable<any> {
        return of(this.menu);
    }
}

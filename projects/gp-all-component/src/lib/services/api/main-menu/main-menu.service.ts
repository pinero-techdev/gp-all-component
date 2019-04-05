import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Param } from '../../../resources/data/param.model';
import { MainMenuProviderService } from './main-menu-provider.service';
import { CommonRq } from '../../core/common.service';
import { GlobalService } from '../../core/global.service';

export class MenuRq extends CommonRq {
    sessionId: string;
    params: Param[];

    constructor(sessionId: string, params?: Param[]) {
        super();
        this.sessionId = sessionId;
        this.params = params;
    }
}

@Injectable()
export class MainMenuService {
    temp: any[];

    constructor(private menuProvider: MainMenuProviderService) {}

    obtenMenu(rq: MenuRq): Observable<any> {
        return Observable.create((observer) => {
            this.temp = this.menuProvider.getEstructuraMenu();
            this.menuProvider.obtenOpcionesActivas(rq).subscribe(
                (data) => {
                    if (data.ok) {
                        if (!(data.menu.opciones === null || data.menu.opciones === undefined)) {
                            this.cargarOpciones(this.temp, data.menu.opciones);
                        }
                        GlobalService.setRoles(data.roles);
                    } else {
                        console.error('No se recuperó un menú');
                    }
                },
                (error) => console.error(error),
                () => {
                    observer.next(this.temp);
                }
            );
        });
    }

    cargarOpciones(elementos: any[], options: any[]): boolean {
        let tieneOpciones = false;
        elementos.forEach((e) => {
            if (e.submenus) {
                e.enabled = this.cargarOpciones(e.submenus, options);
            } else {
                const aux = options.filter((v) => {
                    return v.id === e.id;
                });

                if (aux && aux.length > 0) {
                    e.enabled = true;
                }
            }
            if (!tieneOpciones && e.enabled) {
                tieneOpciones = true;
            }
        });
        return tieneOpciones;
    }
}

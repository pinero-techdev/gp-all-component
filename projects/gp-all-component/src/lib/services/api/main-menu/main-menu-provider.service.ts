import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuRq } from './main-menu.service';
import { CommonService } from '../../core/common.service';

@Injectable()
export class MainMenuProviderService extends CommonService {
    getEstructuraMenu(): any[] {
        return null;
    }

    obtenOpcionesActivas(rq: MenuRq): Observable<any> {
        return null;
    }

    isOpcionMenuActivo(menu: any[], accion: string, nroParams: number): boolean {
        if (menu && accion && nroParams) {
            for (const opcMenu of menu) {
                if (!opcMenu) {
                    return false;
                }
                if (opcMenu.submenus) {
                    const opcion = this.isOpcionMenuActivo(opcMenu.submenus, accion, nroParams);
                    if (opcion) {
                        return true;
                    }
                } else {
                    const opcMenuParams: string[] = opcMenu.action.split('/');
                    const accionParams: string[] = accion.split('/');
                    if (
                        opcMenuParams.length === accionParams.length ||
                        opcMenuParams.length + nroParams === accionParams.length
                    ) {
                        let index = 0;
                        let exit = false;
                        while (index < opcMenuParams.length && !exit) {
                            exit =
                                opcMenuParams[index].toLowerCase() !==
                                accionParams[index].toLowerCase();
                            index++;
                        }
                        if (!exit) {
                            return opcMenu.enabled;
                        }
                    }
                }
            }
        }
        return false;
    }

    tieneOpcionesMenuActivas(menu: any[], idsOpcionesMenu: string[]): boolean {
        if (menu && idsOpcionesMenu) {
            for (const idOpcMenu of idsOpcionesMenu) {
                if (!idOpcMenu) {
                    return false;
                }
                for (const opcMenu of menu) {
                    if (!opcMenu) {
                        return false;
                    }

                    if (opcMenu.submenus) {
                        if (this.tieneOpcionesMenuActivas(opcMenu.submenus, idsOpcionesMenu)) {
                            return true;
                        }
                    } else if (opcMenu.id === idOpcMenu && opcMenu.enabled) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

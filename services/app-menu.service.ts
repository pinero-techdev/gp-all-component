import {Injectable} from "@angular/core";
import {AppMenuProviderService} from "./app-menu-provider.service";
import {MenuRq} from "../resources/data/menuRq";
import {Observable} from "rxjs/Rx";
import {GlobalService} from "./global.service";

@Injectable()
export class AppMenuService {
    temp: any[];

    constructor( private _appMenuProvider : AppMenuProviderService, private _globalService: GlobalService ) {
    }

    obtenMenu(rq: MenuRq): Observable<any> {
        return Observable.create(observer=>{
            this.temp = this._appMenuProvider.getEstructuraMenu();
            this._appMenuProvider.obtenOpcionesActivas(rq).subscribe(
                data => {
                    if (data.ok) {
                        if (data.menu.opciones != undefined) {
                            this.cargarOpciones(this.temp, data.menu.opciones);
                        }
                        this._globalService.roles = data.roles;
                    } else {
                        console.error("No se recuperó un menú");
                    }
                },
                error => console.error(error),
                () => {
                    console.debug("finalizado obtenMenu");
                    observer.next(this.temp);
                }
            );
        });
    }

    cargarOpciones(elementos: any[], options: any[]):boolean {
        let tieneOpciones = false;
        elementos.forEach(e=>{
            if (e.submenus) {
                e.enabled = this.cargarOpciones(e.submenus, options);
            } else {
                e.enabled = options[e.id] !== undefined;
            }
            if (!tieneOpciones && e.enabled)
                tieneOpciones = true;
        });
        return tieneOpciones;
    }

}

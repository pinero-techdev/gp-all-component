import {Injectable} from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { MenuRq } from "../resources/data/menuRq";

@Injectable()
export class AppMenuProviderService {

    getEstructuraMenu() : any[] { return null; }
    obtenOpcionesActivas(rq: MenuRq) : Observable<any> { return null; }
    isOpcionMenuActivo(menu: any[], accion: string): boolean {
        for( let opcMenu of menu) {
            if (opcMenu.action && opcMenu.action == accion) {
                return opcMenu.enabled;
            } else if ( opcMenu.submenus) {
                let opcion = this.isOpcionMenuActivo( opcMenu.submenus, accion );
                if (opcion) {
                    return true;
                }
            }
        }
        return false;
    }

}

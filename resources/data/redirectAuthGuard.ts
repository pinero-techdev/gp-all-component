import {Injectable} from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {GlobalService} from "../../services/global.service";
import {MenuRq} from "./menuRq";
import {AppMenuService} from "../../services/app-menu.service";
import {AppMenuProviderService} from "../../services/app-menu-provider.service";
import {Observable} from "rxjs/Rx";

/**
 * Guard para acciones que no vienen en el menu, sino que se crean al crear ventanas o al redirigir dentro de alguna
 * de las acciones que si vienen en el menu.
 */
@Injectable()
export class RedirectAuthGuard implements CanActivate {

    constructor(private _router: Router,
                private _globalService: GlobalService,
                private _menu: AppMenuService,
                private _menuAppMenuProviderService: AppMenuProviderService) {
    }

    /**
     * Para poder utilizarlo, en el routes de la aplicación se tendrá que declarar la ruta de la siguiente manera:
     * {
     *   path: 'URL_DE_LA_ACCION',
     *   component: NOMBRE_DEL_COMPONENTE, canActivate: [RedirectAuthGuard], data: { menuOptionIds: ['CODIGO_OPCION','OTRO_CODIGO_OCPION']}
     *  }
     *  Donde los IDs de las opciones de menu desde donde se realiza la redirección a la url a la que se pretende ir
     * @param route
     * @param state
     * @return {any}
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        let userId = null;
        if ( userInfo != undefined && userInfo != null ){
            userId = userInfo.userId;
        }

        let url: string = state.url;
        // IDs of the menu options from where the redirection was done
        let menuOptions = route.data['menuOptionIds'];
        console.log(url);
        console.log(route.pathFromRoot);
        console.log("RedirectGuard, canActivate, globalService: " + this._globalService.globalStatus() + " " + sessionStorage.getItem('userInfo'));

        if ((this._globalService.logged || null != sessionStorage.getItem('userInfo'))) {

            if (  menuOptions && menuOptions.length > 0 ) {
                let request: MenuRq = new MenuRq(userId, GlobalService.APP);
                return this._menu.obtenMenu(request)
                    .map(
                        menu => {

                            if ( menu ) {
                                // Check if one of the menu options that can be used to redirect is active
                                let accesoPermitido = this._menuAppMenuProviderService.tieneOpcionesMenuActivas(menu, menuOptions);

                                if ( !accesoPermitido ) {
                                    console.error( "El usuario " + userId + " no tiene los permisos necesarios para acceder a " + url );
                                }
                                return accesoPermitido;

                            } else {
                                console.error("El usuario " + userId + " no tiene menú asociado en la aplicación " + GlobalService.APP);
                                return Observable.of(false);

                            }
                        }
                    );
            } else {
                console.error("No se han informado de opciones menu desde las que se pueda llamar a la url: " + url);
                return Observable.of(false);
            }

        } else {

            console.error( "El usuario " + userId + " no se encuentra logado" );
            // not logged in so redirect to login page
            this._router.navigate(['/login']);
            return Observable.of(false);
        }
    }
}

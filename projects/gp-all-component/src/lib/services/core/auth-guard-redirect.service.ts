import { MainMenuService, MenuRq } from './../api/main-menu/main-menu.service';
import { MainMenuProviderService } from './../api/main-menu/main-menu-provider.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalService } from './global.service';

/**
 * Guard para acciones que no vienen en el menu, sino que se crean al
 * crear ventanas o al redirigir dentro de alguna
 * de las acciones que si vienen en el menu.
 */
@Injectable()
export class AuthGuardRedirect implements CanActivate {
    /* tslint:disable:variable-name */
    constructor(
        private _router: Router,
        private _menu: MainMenuService,
        private _menuAppMenuProviderService: MainMenuProviderService
    ) {}
    /* tslint:enable:variable-name */

    /**
     * Para poder utilizarlo, en el routes de la aplicación se tendrá que
     * declarar la ruta de la siguiente manera:
     * {
     *   path: 'URL_DE_LA_ACCION',
     *   component: NOMBRE_DEL_COMPONENTE,
     *   canActivate: [AuthGuardRedirect],
     *   data: { menuOptionIds: ['CODIGO_OPCION','OTRO_CODIGO_OCPION']}
     *  }
     *  Donde los IDs de las opciones de menu desde donde se realiza la
     *  redirección a la url a la que se pretende ir
     * @param route ''
     * @param state ''
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        let userId = null;
        if (userInfo !== undefined && userInfo !== null) {
            userId = userInfo.userId;
        }
        const url: string = state.url;
        /* IDs of the menu options from where the redirection was done */
        const menuOptionIds = 'menuOptionIds';
        const menuOptions = route.data[menuOptionIds];
        if (GlobalService.getLOGGED() || null != sessionStorage.getItem('userInfo')) {
            if (menuOptions && menuOptions.length > 0) {
                const request: MenuRq = new MenuRq(
                    GlobalService.getSESSION_ID(),
                    GlobalService.getPARAMS()
                );
                return this._menu.obtenMenu(request).pipe(
                    map((menu) => {
                        if (menu) {
                            /**
                             * Check if one of the menu options
                             * that can be used to redirect is active
                             */

                            // prettier-ignore
                            const accesoPermitido = this._menuAppMenuProviderService.
                            tieneOpcionesMenuActivas(
                                menu,
                                menuOptions
                            );
                            if (!accesoPermitido) {
                                console.error(
                                    'El usuario ' +
                                        userId +
                                        ' no tiene los permisos necesarios para acceder a ' +
                                        url
                                );
                            }
                            return accesoPermitido;
                        } else {
                            console.error(
                                'El usuario ' +
                                    userId +
                                    ' no tiene menú asociado en la aplicación ' +
                                    GlobalService.getAPP()
                            );
                            return of(false);
                        }
                    })
                );
            } else {
                console.error(
                    'No se han informado de opciones menu desde las que' +
                        'se pueda llamar a la url: ' +
                        url
                );
                return of(false);
            }
        } else {
            console.error('El usuario  no se encuentra logado');
            // not logged in so redirect to login page
            this._router.navigate(['/login']);
            return of(false);
        }
    }
}

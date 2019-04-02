import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {MenuProviderService} from './menu-provider.service';
import {GlobalService} from './global.service';
import {MenuRq, MenuService} from './menu.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router,
                private _menu: MenuService,
                private _menuAppMenuProviderService: MenuProviderService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        let userId = null;
        if (userInfo !== undefined && userInfo != null) {
            userId = userInfo.userId;
        }

        const url: string = state.url.split('?')[0];
        if ((GlobalService.getLOGGED() || null != sessionStorage.getItem('userInfo'))) {
            // 'home' is the default page when user is logged
            if (url === '/home' || url === '/' || url.indexOf('/terminal') !== -1) {
                return of(true);
            } else {
                const request: MenuRq = new MenuRq(GlobalService.getSESSION_ID(), GlobalService.getPARAMS());
                return this._menu.obtenMenu(request)
                    .pipe(map(
                        menu => {
                            if (menu) {
                                // Check if option menu is active
                                const accesoPermitido = this._menuAppMenuProviderService.isOpcionMenuActivo(menu,
                                    url.substring(1), // Obtain action from url
                                    Object.getOwnPropertyNames(route.params).length);
                                if (!accesoPermitido) {
                                    console.error('El usuario ' + userId + ' no tiene los permisos necesarios para acceder a ' + url);
                                }
                                return accesoPermitido;
                            } else {
                                console.error('El usuario ' + userId + ' no tiene menú asociado en la aplicación ' +
                                  GlobalService.getAPP());
                                return of(false);
                            }
                        }
                    ));
            }
        } else {
            console.error('El usuario no se encuentra logado');
            // not logged in so redirect to login page.
            GlobalService.setPreLoginUrl(url);
            this._router.navigate(['/login']);
            return of(false);
        }
    }
}

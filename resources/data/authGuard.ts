import {Injectable} from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {GlobalService} from "../../services/global.service";
import {MenuRq} from "./menuRq";
import {AppMenuService} from "../../services/app-menu.service";
import {AppMenuProviderService} from "../../services/app-menu-provider.service";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router,
                private _globalService: GlobalService,
                private _menu: AppMenuService,
                private _menuAppMenuProviderService: AppMenuProviderService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        let userId = null;
        if ( userInfo != undefined && userInfo != null ){
            userId = userInfo.userId;
        }

        let url: string = state.url;
        console.log(url);
        console.log(route.pathFromRoot);
        console.log("Guard, canActivate, globalService: " + this._globalService.globalStatus() + " " + sessionStorage.getItem('userInfo'));
        if ((this._globalService.logged || null != sessionStorage.getItem('userInfo'))) {
            // 'home' is the default page when user is logged
            if (url == '/home' || url == '/') {
                return Observable.of(true);
            } else {
                let request: MenuRq = new MenuRq(userId, GlobalService.APP);
                return this._menu.obtenMenu(request)
                    .map(
                        menu => {

                            if ( menu ) {
                                // Check if option menu is active
                                let accesoPermitido =  this._menuAppMenuProviderService.isOpcionMenuActivo(menu,
                                                url.substring(1), // Obtain action from url
                                                Object.getOwnPropertyNames(route.params).length);
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
            }

        } else {

            console.error( "El usuario no se encuentra logado" );
            // not logged in so redirect to login page
            this._router.navigate(['/login']);
            return Observable.of(false);
        }
    }
}

import {Injectable} from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {GlobalService} from "../../services/global.service";
import {AppMenuProviderService} from "../../services/app-menu-provider.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router,
                private _globalService: GlobalService, private _appMenuProviderService: AppMenuProviderService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        console.log(url);
        console.log(route.pathFromRoot);
        console.log("Guard, canActivate, globalService: " + this._globalService.globalStatus() + " " + sessionStorage.getItem('userInfo'));
        if ((this._globalService.logged || null != sessionStorage.getItem('userInfo'))) {
            return true;
        } else {
            // not logged in so redirect to login page
            this._router.navigate(['/login']);
            return false;
        }
    }
}

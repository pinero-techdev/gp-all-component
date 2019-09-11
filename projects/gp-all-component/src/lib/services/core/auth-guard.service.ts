import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
    //
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLogged = this.isLogged();
    const isPublic = this.isPublic(route);
    const loginUrl = 'login';
    const appUrl = '';
    const isLogin = this.nextIsEqualTo(route, loginUrl);
    let isAllowed = true;

    if (isLogged && isLogin) {
      isAllowed = false;
      this.router.navigateByUrl(appUrl).then();
    } else if (!isLogged && !isPublic) {
      isAllowed = false;
      this.router.navigateByUrl(loginUrl).then();
    }

    return isAllowed;
  }

  /**
   * Compare the next url to visit with a url passed by param
   * @param route
   * @param stateUrl
   */
  private nextIsEqualTo(route: ActivatedRouteSnapshot, stateUrl: string): boolean {
    return route.routeConfig.path === stateUrl;
  }

  /**
   * Returns if the next url to visit is public
   * @param route
   */
  private isPublic(route: ActivatedRouteSnapshot): boolean {
    return route.data && route.data.hasOwnProperty('public') ? route.data.public : false;
  }

  /**
   * Returns if the user is logged
   */
  private isLogged(): boolean {
    return !!GlobalService.getSESSION_ID();
  }
}

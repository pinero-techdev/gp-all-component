import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { MainMenuProviderService } from '../api/main-menu/main-menu-provider.service';
import { MainMenuService } from '../api/main-menu/main-menu.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private loginUrl = 'login';
  private homeUrl = 'home';
  private appUrl = '';

  constructor(
    private router: Router,
    private menuProvider: MainMenuProviderService,
    private menuService: MainMenuService
  ) {
    //
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLogged = this.isLogged();
    const isPublic = this.isPublic(route);
    const isLogin = this.nextIsEqualTo(route, this.loginUrl);
    let isAllowed = true;

    if (isLogged && (isLogin || !this.hasPermissions(route))) {
      // User is logged and next url to visit is Login or
      // the user has NOT permissions => not allowed
      isAllowed = false;
      this.router.navigateByUrl(this.appUrl).then();
    } else if (!isLogged && !isPublic) {
      // User is NOT logged and next url to visit is private => not allowed
      isAllowed = false;
      this.router.navigateByUrl(this.loginUrl).then();
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

  /**
   * Some users are allow to visit some urls and others users are not.
   * So, menu provider decides if the user can visit it or not.
   * @param route
   */
  private hasPermissions(route: ActivatedRouteSnapshot): boolean {
    let isAllowed = true;
    const url = route.routeConfig.path;
    if (url !== this.appUrl && url !== this.homeUrl) {
      const params = Object.keys(route.params).length;
      const menu = this.menuService.temp;
      isAllowed = this.menuProvider.optionIsActive(menu, url, params);
    }
    return isAllowed;
  }
}

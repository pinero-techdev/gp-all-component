import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { MainMenuProviderService } from '../api/main-menu/main-menu-provider.service';
import { MainMenuService, MenuRq } from '../api/main-menu/main-menu.service';
import { Observable } from 'rxjs';
import { LoginService } from '../api/login/login.service';
import { GlobalService } from './global.service';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private loginUrl = 'login';
  private homeUrl = 'home';
  private appUrl = '';

  constructor(
    private router: Router,
    private menuProvider: MainMenuProviderService,
    private menuService: MainMenuService,
    private loginService: LoginService
  ) {
    //
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url = state.url.substring(1);
    return Observable.create((observer) => {
      this.loginService
        .sessionInfo()
        .pipe(first())
        .subscribe(
          (data) => {
            const isLogged = data.ok;
            let isAllowed = false;
            const isPublic = this.isPublic(route);
            let hasPermission = false;
            if (url !== this.appUrl && url !== this.homeUrl) {
              const params = Object.keys(route.params).length;
              if (isLogged) {
                const rq = new MenuRq(data.sessionId, GlobalService.getPARAMS());
                this.menuService
                  .getMenu(rq)
                  .pipe(first())
                  .subscribe(
                    (menu) => {
                      hasPermission = this.menuProvider.optionIsActive(menu, url, params);
                      isAllowed = this.isAllowed(route, isLogged, isPublic, hasPermission, url);
                      observer.next(isAllowed);
                    },
                    () => {
                      isAllowed = this.isAllowed(route, isLogged, isPublic, false, url);
                      observer.next(isAllowed);
                    }
                  );
              } else {
                isAllowed = this.isAllowed(route, isLogged, isPublic, false, url);
                observer.next(isAllowed);
              }
            } else {
              isAllowed = this.isAllowed(route, isLogged, isPublic, true, url);
              observer.next(isAllowed);
            }
          },
          () => {
            observer.next(false);
          }
        );
    });
  }

  /**
   * Returns if the next url to visit is public
   * @param route
   */
  private isPublic(route: ActivatedRouteSnapshot): boolean {
    return route.data && route.data.hasOwnProperty('public') ? route.data.public : false;
  }

  private isAllowed(
    route: ActivatedRouteSnapshot,
    isLogged: boolean,
    isPublic: boolean,
    hasPermission: boolean,
    url: string
  ): boolean {
    let isAllowed = false;
    if (isLogged && hasPermission) {
      // User is logged and has permission to visit next url --> allowed
      isAllowed = true;
    } else if (!isLogged && isPublic) {
      // User is not logged but next url to visit is public --> allowed
      isAllowed = true;
    } else if (!isLogged && !isPublic) {
      // User is not logged, has not permission to visit next url that is not public --> go to login
      this.router.navigateByUrl(this.loginUrl).then();
    }
    if (!isAllowed) {
      // If not allowed save url, to jump when logged
      GlobalService.setPreLoginUrl(url);
      GlobalService.setPreLoginParams(route.queryParams);
    }
    return isAllowed;
  }
}

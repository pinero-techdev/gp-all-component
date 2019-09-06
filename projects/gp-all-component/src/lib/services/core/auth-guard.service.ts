import { LocaleES } from './../../resources/localization/es-ES.lang';
import { LoginService, SessionInfoRs } from './../api/login/login.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  Params,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { MainMenuProviderService } from '../api/main-menu/main-menu-provider.service';
import { GlobalService } from './global.service';
import { MenuRq, MainMenuService } from '../api/main-menu/main-menu.service';
import { SessionStorageService } from '../session-storage/session-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private loginService: LoginService,
    private menu: MainMenuService,
    private menuAppMenuProviderService: MainMenuProviderService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const userInfo = this.sessionStorageService.getItem('userInfo');
    const isPublic = route.data && route.data.hasOwnProperty('public') ? route.data.public : false;
    let userId = null;
    if (userInfo && userInfo.hasOwnProperty('userId')) {
      userId = userInfo.userId;
    }
    const url: string = state.url.split('?')[0];
    if (isPublic) {
      if (this.canGetLogin(url)) {
        return of(true);
      } else {
        this.router.navigate(['home']);
      }
    } else if (this.hasPermissions(isPublic)) {
      /** The view is private and the user has permissions
       *  then the user can access to the app
       */
      if (url.indexOf('/terminal') !== -1) {
        return of(true);
      } else {
        const request: MenuRq = new MenuRq(
          GlobalService.getSESSION_ID(),
          GlobalService.getPARAMS()
        );
        return this.menu.getMenu(request).pipe(
          map((menu) => {
            if (menu) {
              // Check if option menu is active
              const isAllowed = this.menuAppMenuProviderService.optionIsActive(
                menu,
                url.substring(1), // Obtain action from url
                Object.getOwnPropertyNames(route.params).length
              );
              if (!isAllowed) {
                console.error(LocaleES.ACCESS_URL_FORBIDDEN(userId, url));
              }
              return isAllowed;
            } else {
              console.error(
                LocaleES.USER_HAS_NOT_ASSOCIATED_A_MENU(userId, GlobalService.getAPP())
              );
              return of(false);
            }
          })
        );
      }
    } else {
      console.error(LocaleES.USER_IS_NOT_LOGGED);
      // not logged in so redirect to login page.
      GlobalService.setPreLoginUrl(url);
      this.router.navigateByUrl('/login');
      return of(false);
      // return this.checkSession(route.queryParams).pipe(first());
    }
  }

  private checkSession(queryParams: Params): Observable<boolean> {
    return this.loginService.sessionInfo().pipe(
      switchMap((data) => this.checkSessionResponse(data, queryParams)),
      catchError((err) => this.handlerError(err))
    );
  }

  private hasPermissions(isPublic: boolean) {
    return !isPublic && !!GlobalService.getSESSION_ID();
  }

  private checkSessionResponse(data: SessionInfoRs, queryParams: Params): Observable<boolean> {
    if (data && data.ok) {
      GlobalService.setSession(data.userInfo);
      GlobalService.setLogged(true);
      this.sessionStorageService.setItem('userInfo', data.userInfo);
      return of(true);
    } else {
      this.navigateTo(queryParams);
      return of(false);
    }
  }

  private handlerError(err) {
    console.error(err);
    return of(false);
  }

  private navigateTo(queryParams, state = '/login') {
    this.router.navigate([state], queryParams);
  }

  private canGetLogin(url: string) {
    const isLogin = url.includes('/login');
    const isLogged = !!GlobalService.getSESSION_ID();

    return !isLogin || (isLogin && !isLogged);
  }
}

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { LocaleES } from '../../resources/localization/es-ES.lang';
import { MainMenuProviderService } from '../api/main-menu/main-menu-provider.service';
import { MainMenuService, MenuRq } from '../api/main-menu/main-menu.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStorageService } from '../session-storage/session-storage.service';

/**
 * Service Guard for adding actions non-defined; they are used by modals or
 * are the consecuency of an action redirection that is defined in the menu.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuardRedirect implements CanActivate {
  constructor(
    private router: Router,
    private menu: MainMenuService,
    private menuAppMenuProviderService: MainMenuProviderService,
    private sessionStorageService: SessionStorageService
  ) {}

  /**
   * You can use the service as a guard deciding if a route can be activated.
   * If the service guard return true, navigation will continue.
   * If the guard returns false, navigation will be cancelled.
   * @param route current ActivatedRoute
   * @param state currrent state
   *
   * So, for using it add it to your route:
   *  {
   *   path: 'URL_DE_LA_ACCION',
   *   component: NOMBRE_DEL_COMPONENTE,
   *   canActivate: [AuthGuardRedirect],
   *   data: { menuOptionIds: ['CODIGO_OPCION','OTRO_CODIGO_OCPION']}
   *  }
   *
   * 'MenuOptionsIds' are the menu options' id where you can access from the menu.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const userInfo = this.sessionStorageService.getItem('userInfo');
    const userId = userInfo && userInfo.hasOwnProperty('userId') ? userInfo.userId : null;
    const url: string = state.url;
    /* IDs of the menu options from where the redirection was done */
    const menuOptionIds = 'menuOptionIds';
    const menuOptions = route.data[menuOptionIds];
    if (GlobalService.getLOGGED() || null !== this.sessionStorageService.getItem('userInfo')) {
      if (menuOptions && menuOptions.length > 0) {
        const request: MenuRq = new MenuRq(
          GlobalService.getSESSION_ID(),
          GlobalService.getPARAMS()
        );
        return this.menu.getMenu(request).pipe(
          map((menu) => {
            if (menu) {
              /**
               * Check if one of the menu options
               * that can be used to redirect is active
               */
              const isAllowed = this.menuAppMenuProviderService.hasActiveOptions(menu, menuOptions);
              if (!isAllowed) {
                console.error(LocaleES.USERNAME_IS_NOT_ALLOWED_TO_ACCESS(userId, url));
              }
              return isAllowed;
            } else {
              console.error(
                LocaleES.USERNAME_HAS_NOT_A_REGISTERED_MENU(userId, GlobalService.getAPP())
              );
              return of(false);
            }
          })
        );
      } else {
        console.error(LocaleES.THERE_IS_NOT_ANY_MENU_OPTION(url));
        return of(false);
      }
    } else {
      console.error(LocaleES.USERNAME_IS_NOT_REGISTERED);
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}

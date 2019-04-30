import { isNull, isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainMenuProviderService } from '../api/main-menu/main-menu-provider.service';
import { GlobalService } from './global.service';
import { MenuRq, MainMenuService } from '../api/main-menu/main-menu.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private menu: MainMenuService,
    private menuAppMenuProviderService: MainMenuProviderService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    let userId = null;
    if (!isNullOrUndefined(userInfo)) {
      userId = userInfo.userId;
    }

    const url: string = state.url;
    if (GlobalService.getLOGGED() || !isNull(sessionStorage.getItem('userInfo'))) {
      if (url === '/home' || url === '/' || url.indexOf('/terminal') !== -1) {
        return of(true);
      } else {
        const request: MenuRq = new MenuRq(
          GlobalService.getSESSION_ID(),
          GlobalService.getPARAMS()
        );
        return this.menu.obtenMenu(request).pipe(
          map((menu) => {
            if (menu) {
              // Check if option menu is active
              // prettier-ignore
              const accesoPermitido = this.menuAppMenuProviderService.
                            isOpcionMenuActivo(
                                menu,
                                url.substring(1), // Obtain action from url
                                Object.getOwnPropertyNames(route.params).length
                            );
              if (!accesoPermitido) {
                console.error(
                  'El username ' +
                    userId +
                    ' no tiene los permisos necesarios para acceder a ' +
                    url
                );
              }
              return accesoPermitido;
            } else {
              console.error(
                'El username ' +
                  userId +
                  ' no tiene menú asociado en la aplicación ' +
                  GlobalService.getAPP()
              );
              return of(false);
            }
          })
        );
      }
    } else {
      console.error('El username no se encuentra logado');
      // not logged in so redirect to login page.
      GlobalService.setPreLoginUrl(url);
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}

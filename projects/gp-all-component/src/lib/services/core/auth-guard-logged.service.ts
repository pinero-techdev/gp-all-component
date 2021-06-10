import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../api/login/login.service';
import { GlobalService } from './global.service';
import { first } from 'rxjs/operators';
import { VersionCheckService } from './version-check.service';
import { MessagesService } from './messages.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardLogged implements CanActivate {
  private loginUrl = 'login';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private versionCheckService: VersionCheckService,
    private messagesService: MessagesService
  ) {
    //
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (
      this.versionCheckService.getVersion() &&
      this.versionCheckService.getVersion().version !== GlobalService.getVERSION()
    ) {
      this.messagesService.showErrorMessage(
        'Hay una nueva versión de ' +
          GlobalService.getAPPLICATION_TITLE() +
          ', refresque su navegador con CTRL + F5 para activarla.',
        'root'
      );
    }

    const url = route.url[0].path;
    return Observable.create((observer) => {
      this.loginService
        .sessionInfo()
        .pipe(first())
        .subscribe(
          (data) => {
            if (!data.ok) {
              // If not logged save url, to jump when logged
              GlobalService.setPreLoginUrl(url);
              GlobalService.setPreLoginParams(route.queryParams);
              this.router.navigateByUrl(this.loginUrl).then();
            }
            observer.next(data.ok);
          },
          () => {
            observer.next(false);
          }
        );
    });
  }
}

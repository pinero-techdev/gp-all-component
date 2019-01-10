import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Message } from 'primeng/primeng';

import { Subscription } from 'rxjs';

import { isNullOrUndefined } from 'util';

import { LoginRq } from '../../resources/data/loginRq';
import { GlobalService } from '../../services/global.service';
import { LoginService } from '../../services/login.service';
import { GpAppMainMenuComponent } from '../menu/gp.app.main.menu.component';

@Component({
  selector: 'gp-app-login.component',
  templateUrl: './gp.app.login.component.html',
  providers: [GpAppMainMenuComponent]
})
export class GpAppLoginComponent implements OnInit, OnDestroy {
  usuario: string;
  password: string;
  url: string;
  msgs: Message[] = [];
  btnModificaPwdVisible = false;
  working: boolean = false;

  passwordErrors: string[] = [
    'Su clave ha caducado, tiene que cambiar la clave de acceso.',
    'Es el último día para cambiar su clave ¿Desea cambiarla ahora?',
    'Su clave ha caducado hace 1 día, tiene que cambiar la clave de acceso.',
    'Su clave caduca hoy, ¿Desea cambiarla ahora?',
    'Falta un día para que su clave caduque, ¿Desea cambiarla ahora?',
    'Faltan dos días para que su clave caduque, ¿Desea cambiarla ahora?'
  ];

  sub: Subscription;

  constructor(
    private router: Router,
    private _loginService: LoginService,
    private _gpAppMainMenu: GpAppMainMenuComponent,
    private _route: ActivatedRoute
  ) {
    GlobalService.setLogged(false);
  }

  ngOnInit() {
    this.subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  applicationTitle() {
    return GlobalService.APPLICATION_TITLE;
  }

  login(urlToRedirect?: string, otherParams?: string) {
    this.working = true;
    let request: LoginRq = new LoginRq(this.usuario, this.password, GlobalService.APLICACION_LOGIN, GlobalService.PARAMS_LOGIN, otherParams);
    this._loginService
      .login(request)
      .finally(() => {
        this.working = false;
      })
      .subscribe(
        data => {
          if (data.ok) {
            GlobalService.setSession(data.userInfo);
            GlobalService.setLogged(true);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('userInfo', JSON.stringify(data.userInfo));
            if (!isNullOrUndefined(this.url)) {
              GlobalService.setPreLoginUrl(this.url);
            }
            if (urlToRedirect) {
              this.router.navigate([urlToRedirect]);
            } else if (!isNullOrUndefined(GlobalService.PRE_LOGIN_URL) && GlobalService.PRE_LOGIN_URL != '') {
              this.router.navigate([GlobalService.PRE_LOGIN_URL]);
            } else {
              this.router.navigate(['home']);
            }
          } else {
            this.router.navigate(['login']);
            if (data.error != null && data.error.errorMessage != null) {
              this.showError(data.error.errorMessage.toString());
              if (this.passwordErrors.indexOf(data.error.errorMessage.toString()) != -1) {
                this.btnModificaPwdVisible = true;
              }
            }
          }
        },
        err => {
          console.error(err);
        },
        () => {
          console.log('Login finalizado');
        }
      );
  }

  showError(message: string) {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: 'Se ha producido un error durante el proceso de login',
      detail: message
    });
  }

  goModificaPwd() {
    this.router.navigate(['modifica-password/' + this.usuario]);
  }

  subscribe() {
    let otherParams = null;
    let urlToRedirect = null;
    this.sub = this._route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
      this.password = params['password'];
      otherParams = params['otherparams'];
      urlToRedirect = params['urlToRedirect'];
      this.url = params['url'];
    });

    if ((this.usuario && this.password) || otherParams) {
      this.login(urlToRedirect, otherParams);
    }
  }
}

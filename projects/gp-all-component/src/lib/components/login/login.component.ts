import { finalize } from 'rxjs/operators';
import { GlobalService } from '../../services/core/common/global.service';
import { LoginService, LoginRq } from './../../services/api/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'gp-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    usuario: string;
    password: string;
    url: string;
    msgs: Message[] = [];
    working = false;

    passwordErrors: string[] = [
        'Su clave ha caducado, tiene que cambiar la clave de acceso.',
        'Es el último día para cambiar su clave ¿Desea cambiarla ahora?',
        'Su clave ha caducado hace 1 día, tiene que cambiar la clave de acceso.',
        'Su clave caduca hoy, ¿Desea cambiarla ahora?',
        'Falta un día para que su clave caduque, ¿Desea cambiarla ahora?',
        'Faltan dos días para que su clave caduque, ¿Desea cambiarla ahora?',
    ];

    sub: Subscription;

    constructor(
        private router: Router,
        private loginService: LoginService,
        private route: ActivatedRoute
    ) {
        GlobalService.setLogged(false);
    }

    ngOnInit() {
        this.subscribe();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getApplicationTitle() {
        return GlobalService.getAPPLICATION_TITLE();
    }

    login(urlToRedirect?: string, otherParams?: string) {
        this.working = true;
        const request: LoginRq = new LoginRq(
            this.usuario,
            this.password,
            GlobalService.getAPLICACION_LOGIN(),
            GlobalService.getPARAMS_LOGIN(),
            otherParams
        );
        this.loginService
            .login(request)
            .pipe(
                finalize(() => {
                    this.working = false;
                })
            )
            .subscribe(
                (data) => {
                    if (data.ok) {
                        GlobalService.setSession(data.userInfo);
                        GlobalService.setLogged(true);
                        // store user details and jwt token in local storage to keep
                        // user logged in between page refreshes
                        sessionStorage.setItem('userInfo', JSON.stringify(data.userInfo));
                        if (this.url) {
                            GlobalService.setPreLoginUrl(this.url);
                        }
                        if (urlToRedirect) {
                            this.router.navigate([urlToRedirect]);
                        } else if (
                            GlobalService.getPRE_LOGIN_URL() &&
                            GlobalService.getPRE_LOGIN_URL() !== ''
                        ) {
                            this.router.navigate([GlobalService.getPRE_LOGIN_URL()]);
                        } else {
                            this.router.navigate(['home']);
                        }
                    } else {
                        this.router.navigate(['login']);
                        if (data.error != null && data.error.errorMessage != null) {
                            this.showError(data.error.errorMessage.toString());
                        }
                    }
                },
                (err) => {
                    console.error(err);
                },
                () => {
                    console.info('Login finalizado');
                }
            );
    }

    showError(message: string) {
        this.msgs = [];
        this.msgs.push({
            severity: 'error',
            summary: 'Se ha producido un error: ',
            detail: message,
        });
    }

    resetError() {
        this.msgs = [];
    }

    goModificaPwd() {
        this.router.navigate(['modifica-password/' + this.usuario]);
    }

    subscribe() {
        let otherParams = null;
        let urlToRedirect = null;
        this.sub = this.route.queryParams.subscribe((params) => {
            this.usuario = params.usuario;
            this.password = params.password;
            otherParams = params.otherparams;
            urlToRedirect = params.urlToRedirect;
            this.url = params.url;
        });

        if ((this.usuario && this.password) || otherParams) {
            this.login(urlToRedirect, otherParams);
        }
    }
}

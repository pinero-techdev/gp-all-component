import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Message} from "primeng/primeng";
import {LoginRq} from "../../resources/data/loginRq";
import {GlobalService} from "../../services/global.service";
import {LoginService} from "../../services/login.service";
import {GpAppMainMenuComponent} from "../menu/gp.app.main.menu.component";

@Component({
    selector: 'gp-app-login.component',
    templateUrl: './gp.app.login.component.html',
    providers: [GpAppMainMenuComponent]
})
export class GpAppLoginComponent {
    usuario:string;
    password:string;
    msgs:Message[] = [];
    btnModificaPwdVisible:boolean = false;
    working:boolean = false;

    passwordErrors:string[] = [
        "Su clave ha caducado, tiene que cambiar la clave de acceso.",
        "Es el último día para cambiar su clave ¿Desea cambiarla ahora?",
        "Su clave ha caducado hace 1 día, tiene que cambiar la clave de acceso.",
        "Su clave caduca hoy, ¿Desea cambiarla ahora?",
        "Falta un día para que su clave caduque, ¿Desea cambiarla ahora?",
        "Faltan dos días para que su clave caduque, ¿Desea cambiarla ahora?"];

    constructor(private router:Router, private _loginService:LoginService, public globalService:GlobalService,
                private _gpAppMainMenu:GpAppMainMenuComponent) {
        this.globalService.logged = false;
    }

    login() {
        this.working = true;
        let request:LoginRq = new LoginRq(this.usuario, this.password,GlobalService.getAplicacionLogin(),GlobalService.getParamsLogin() );
        this._loginService.login(request).finally(() => {
            this.working = false;
        }).subscribe(
            data => {
                if (data.ok) {
                    if( this.globalService.preLoginUrl != null && this.globalService.preLoginUrl != "" )
                    {
                        let newUrl = this.globalService.preLoginUrl;
                        this.globalService.preLoginUrl = '';
                        this.router.navigate([newUrl]);
                    }
                    else
                    {
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

    showError(message:string) {
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
}
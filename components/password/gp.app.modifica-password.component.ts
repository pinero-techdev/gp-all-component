import {Component, OnInit} from '@angular/core';
import {Mensajes} from '../../resources/data/mensajes';
import {Message} from 'primeng/primeng';
import {ModificaPasswordRq, PasswordService} from '../../services/password.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

@Component({
    selector: 'gp-app-modifica-password.component',
    templateUrl: './gp.app.modifica-password.component.html',
    providers: [PasswordService]
})
export class GpAppModificaPasswordComponent extends Mensajes implements OnInit {
    usuario: string;
    passwordOld: string;
    passwordNew: string;
    passwordNew2: string;

    msgs: Message[] = [];
    alerts: Message[] = [];

    private sub: Subscription;

    constructor(private _router: Router, private _route: ActivatedRoute, private _passwordService: PasswordService) {
        super();
    }

    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
            this.usuario = params['usuario'];
        });
    }

    modifica() {
        if (this.passwordNew == this.passwordNew2) {
            let request = new ModificaPasswordRq(this.usuario, this.passwordOld, this.passwordNew);
            this._passwordService.modifica(request).subscribe(
                data => {
                    if (data.ok) {
                        this.showInfoAlert('¡Contraseña modificada correctamente!');
                        this._router.navigate(['login']);
                    } else {
                        this.showError(data.error.internalErrorMessage);
                    }
                },
                err => {
                    console.error(err);
                }
            );
        } else {
            this.showError('¡Las contraseñas no coinciden!')
        }
    }

    showError(message: string) {
        this.msgs = [];
        this.msgs.push({
            severity: 'error',
            summary: 'Se ha producido un error',
            detail: message
        });
    }
}
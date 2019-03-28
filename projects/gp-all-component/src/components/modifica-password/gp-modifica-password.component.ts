import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from 'primeng/primeng';
import {Subscription} from 'rxjs';
import {MensajesComponent} from '../../resources/data/mensajes.component';
import {ModificaPasswordRq, PasswordService} from '../../services/password.service';

@Component({
    selector: 'gp-modifica-password.component',
    templateUrl: './gp-modifica-password.component.html',
    providers: [PasswordService]
})
export class GpModificaPasswordComponent extends MensajesComponent implements OnInit {
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
        if (this.passwordNew === this.passwordNew2) {
            const request = new ModificaPasswordRq(this.usuario, this.passwordOld, this.passwordNew);
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
            this.showError('¡Las contraseñas no coinciden!');
        }
    }

    back() {
        this._router.navigate(['login']);
    }

    showError(message: string) {
        this.msgs = [];
        this.msgs.push({
            severity: 'error',
            summary: 'Se ha producido un error: ',
            detail: message
        });
    }

    resetError() {
        this.msgs = [];
    }
}

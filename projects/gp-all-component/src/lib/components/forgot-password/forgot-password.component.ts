import { MessagesService } from './../../services/core/messages.service';
import {
    ForgotPasswordRq,
    ForgotPasswordService,
} from '@lib/services/api/forgot-password/forgot-password.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'gp-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    password: string;
    passwordOld: string;
    passwordRep: string;
    username: string;

    msgs: Message[] = [];
    alerts: Message[] = [];

    private sub: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private forgotService: ForgotPasswordService,
        private messagesService: MessagesService
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe((params) => {
            this.username = params.usuario;
        });
    }

    onEnterEvent() {
        if (this.password === this.passwordRep) {
            const request = new ForgotPasswordRq(this.username, this.passwordOld, this.password);
            this.forgotService.updatePassword(request).subscribe(
                (data) => {
                    if (data.ok) {
                        this.messagesService.showInfoAlert('¡Contraseña modificada correctamente!');
                        this.router.navigate(['login']);
                    } else {
                        this.showError(data.error.internalErrorMessage);
                    }
                },
                (err) => {
                    console.error(err);
                }
            );
        } else {
            this.showError('¡Las contraseñas no coinciden!');
        }
    }

    back() {
        this.router.navigate(['login']);
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
}

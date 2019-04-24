import { MessagesService } from './../../services/core/messages.service';
import {
  ForgotPasswordRq,
  ForgotPasswordService,
} from '@lib/services/api/forgot-password/forgot-password.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'primeng/api';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'gp-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  password: string;
  passwordOld: string;
  passwordRep: string;
  username: string;
  errors: Message;

  private isDestroyed: Subject<boolean> = new Subject<boolean>();
  private nextRoute = 'login';

  constructor(
    private forgotService: ForgotPasswordService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  set errorMessage(value: string) {
    this.handlerError(value);
  }

  get errorMessage(): string {
    return this.errors ? this.errors.detail : null;
  }

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.isDestroyed),
        map((p) => p.username)
      )
      .subscribe((value: string) => (this.username = value));
  }

  ngOnDestroy() {
    this.isDestroyed.next(true);
    this.isDestroyed.unsubscribe();
  }

  onCancelEvent() {
    this.router.navigate([this.nextRoute]);
  }

  onEnterEvent() {
    if (this.username && this.passwordOld && this.password && this.password === this.passwordRep) {
      const request = new ForgotPasswordRq(this.username, this.passwordOld, this.password);
      this.forgotService
        .updatePassword(request)
        .pipe(takeUntil(this.isDestroyed))
        .subscribe(
          (data) => {
            if (data.ok) {
              this.messagesService.showInfoAlert('¡Contraseña modificada correctamente!');
              this.router.navigate([this.nextRoute]);
            } else {
              this.errorMessage = data.error.internalErrorMessage;
            }
          },
          (err) => {
            console.error(err);
            this.errorMessage = err;
          }
        );
    } else {
      if (this.password !== this.passwordRep) {
        this.errorMessage = '¡Las contraseñas no coinciden!';
      } else {
        this.errorMessage = 'Todos los campos son obligatorios';
      }
    }
  }

  private handlerError(errorMessage: string) {
    this.errors = {
      severity: 'error',
      summary: 'Se ha producido un error: ',
      detail: errorMessage,
    };
  }
}

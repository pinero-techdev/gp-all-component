import { LocaleES } from './../../resources/localization/es-ES.lang';
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
  /** New password */
  password: string;
  /** Current password */
  passwordOld: string;
  /** New password repeated */
  passwordRep: string;
  /** Username */
  username: string;
  /** If something wrong occurs an error message is shown in the HTML */
  errors: Message;

  private isDestroyed: Subject<boolean> = new Subject<boolean>();
  /** Next route which is took after change the password. */
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
    /** If the route contains an username as param, the input field is filled with the value */
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

  /** When the user click on cancel event */
  onCancelEvent() {
    this.router.navigate([this.nextRoute]);
  }

  /** When the user submit the form */
  onEnterEvent() {
    if (this.username && this.passwordOld && this.password && this.password === this.passwordRep) {
      const request = new ForgotPasswordRq(this.username, this.passwordOld, this.password);
      this.forgotService
        .updatePassword(request)
        .pipe(takeUntil(this.isDestroyed))
        .subscribe(
          (data) => {
            if (data.ok) {
              this.messagesService.showInfoAlert(LocaleES.PASSWORD_CORRECTLY_MODIFIED);
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
        this.errorMessage = LocaleES.PASSWORD_FIELDS_DO_NOT_MATCH;
      } else {
        this.errorMessage = LocaleES.FIELDS_ARE_MANDATORY;
      }
    }
  }

  /** Handling errors: show an error message */
  private handlerError(errorMessage: string) {
    this.errors = {
      severity: 'error',
      summary: LocaleES.AN_ERROR_HAS_OCURRED + ':',
      detail: errorMessage,
    };
  }
}

import { LocaleES } from '@lib/resources/localization/es-ES.lang';
import { finalize, takeUntil } from 'rxjs/operators';
import { GlobalService } from './../../services/core/global.service';
import { LoginService, LoginRq } from './../../services/api/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'gp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  msgs: Message[] = [];
  password: string;
  title: string = null;
  url: string;
  username: string;
  working = false;

  readonly locale = LocaleES;

  private isDestroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {
    GlobalService.setLogged(false);
    this.title = GlobalService.getAPPLICATION_TITLE();
  }

  ngOnInit() {
    this.initLogin();
  }

  ngOnDestroy() {
    this.isDestroyed.next(true);
    this.isDestroyed.unsubscribe();
  }

  login(urlToRedirect?: string, otherParams?: string) {
    if (this.password && this.username) {
      this.working = true;
      const request: LoginRq = new LoginRq(
        this.username,
        this.password,
        GlobalService.getAPLICACION_LOGIN(),
        GlobalService.getPARAMS_LOGIN(),
        otherParams
      );
      this.loginService
        .login(request)
        .pipe(
          takeUntil(this.isDestroyed),
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
              let errorMessage = LocaleES.AN_ERROR_HAS_OCURRED;
              if (data.error !== null && data.error.errorMessage !== null) {
                errorMessage = data.error.errorMessage.toString();
              }
              this.showError(errorMessage);
            }
          },
          (err) => {
            console.error(err);
            this.showError(LocaleES.AN_ERROR_HAS_OCURRED);
          }
        );
    } else {
      this.showError(LocaleES.USERNAME_PASS_SHOULD_CORRECT_VALUE);
    }
  }

  showError(message: string) {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: LocaleES.AN_ERROR_HAS_OCURRED,
      detail: message,
    });
  }

  resetError() {
    this.msgs = [];
  }

  goModificaPwd() {
    this.router.navigate(['forgot-password/' + this.username]);
  }

  private initLogin() {
    let otherParams = null;
    let urlToRedirect = null;

    this.route.queryParams.pipe(takeUntil(this.isDestroyed)).subscribe((params) => {
      this.username = params.username;
      this.password = params.password;
      otherParams = params.otherparams;
      urlToRedirect = params.urlToRedirect;
      this.url = params.url;
    });

    if ((this.username && this.password) || otherParams) {
      this.login(urlToRedirect, otherParams);
    }
  }
}

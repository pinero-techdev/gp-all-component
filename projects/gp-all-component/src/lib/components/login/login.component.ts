import { LocaleES } from './../../resources/localization/es-ES.lang';
import { finalize, takeUntil } from 'rxjs/operators';
import { GlobalService } from './../../services/core/global.service';
import { LoginService, LoginRq, LoginRs } from './../../services/api/login/login.service';
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
  /** Validation error messages */
  msgs: Message[] = [];
  /* Password text input value */
  password: string;
  /* Application's name */
  title: string = null;
  /* PreLoginUrl */
  url: string;
  /* Username text input value */
  username: string;
  /* Loading */
  working = false;

  /** Localization strings */
  readonly locale = LocaleES;

  /** Unsubscribe the subscriptions before the component is destroyed */
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

  /**
   * When form is submitted, get the input fields values and try to login
   * @param urlToRedirect After login state
   * @param otherParams string
   */
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
          (data) => this.setLogin(data, urlToRedirect),
          (err) => this.showError(LocaleES.AN_ERROR_HAS_OCURRED, err)
        );
    } else {
      this.showError(LocaleES.USERNAME_PASS_SHOULD_CORRECT_VALUE);
    }
  }

  /**
   * Handling error state
   * @param message Error message
   * @param error Error information by the service only for the console
   */
  showError(message: string, error: any = null) {
    if (error) {
      console.error(error);
    }

    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: LocaleES.AN_ERROR_HAS_OCURRED,
      detail: message,
    });
  }

  /** Clear errors */
  resetError() {
    this.msgs = [];
  }

  /** Navigate to forgot password view */
  goModificaPwd() {
    this.router.navigate(['forgot-password/' + this.username]);
  }

  /** If everything is ok, set login data (user recently logged, prelogin url ...)
   * and navigate to home or urlToRedirect,
   * if something goes wrong show an error message.
   */
  private setLogin(data: LoginRs, urlToRedirect: string = null) {
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
      } else if (GlobalService.getPRE_LOGIN_URL()) {
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
  }

  /** On init state, a router listener is set for getting the possible query params by url. */
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

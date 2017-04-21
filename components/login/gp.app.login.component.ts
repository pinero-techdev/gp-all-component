import {Component} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {LoginRq} from "../../resources/data/loginRq";
import {GlobalService} from "../../services/global.service";
import {LoginRs} from "../../resources/data/loginRs";
import {Message} from "primeng/primeng";
import {GpAppMainMenuComponent} from "../menu/gp.app.main.menu.component";

@Component({
  selector: 'gp-app-login.component',
  templateUrl: './gp.app.login.component.html',
  providers: [GpAppMainMenuComponent]
})
export class GpAppLoginComponent {
  usuario: String;
  password: String;
  msgs: Message[] = [];

  constructor(private router: Router, private _loginService: LoginService, public globalService: GlobalService,
              private _gpAppMainMenu: GpAppMainMenuComponent) {
    this.globalService.logged = false;
    sessionStorage.removeItem('userInfo');
  }

  login() {
    let response = new LoginRs();
    let request: LoginRq = new LoginRq(this.usuario, this.password);
    this._loginService.login(request).subscribe(
      data => {
        response = data;
        if (response.ok) {
          this.globalService.session = response.userInfo;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('userInfo', JSON.stringify(response.userInfo));
          this._gpAppMainMenu.initMenu();
          this._gpAppMainMenu.refresh();
          this.globalService.logged = true;
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
          if (response.error != null && response.error.errorMessage != null) {
            this.showError(response.error.errorMessage.toString());
          }
        }
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Login finalizado');
        console.log(response)
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
}

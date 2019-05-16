import { LoginService } from './../../../gp-all-component/src/lib/services/api/login/login.service';
import { GlobalService } from '../../../gp-all-component/src/lib/services/core/global.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private loginService: LoginService, private router: Router) {
    GlobalService.setBaseUrl('/bpguest-svc');
    GlobalService.setLoginServiceUrl(
      'https://svcext.grupo-pinero.com/gp/identity-service/login-svc'
    );
    GlobalService.setMenuServiceUrl('https://svcext.grupo-pinero.com/gp/identity-service/menu-svc');
    GlobalService.setApp('BPG');
    GlobalService.setAplicacionLogin('BPG');
    GlobalService.setLogged(false);
    GlobalService.setApplicationTitle('BSuite');

    // GlobalService.setBaseUrl('/fenix-api');
    // GlobalService.setLoginServiceUrl(
    //   ' https://apps.wapt.cen.intranet/gp/identity-service/login-svc'
    // );
    // GlobalService.setMenuServiceUrl(' https://apps.wapt.cen.intranet/gp/identity-service/menu-svc');
    // GlobalService.setApp('INS');
    // GlobalService.setAplicacionLogin('INS');
  }
}

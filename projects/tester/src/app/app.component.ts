import { GlobalService } from '../../../gp-all-component/src/lib/services/core/global.service';
import { UserInfo } from '../../../gp-all-component/src/lib/resources/data/user-info.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    GlobalService.setBaseUrl('/bpguest-svc');
    GlobalService.setLoginServiceUrl(
      'https://svcext.grupo-pinero.com/gp/identity-service/login-svc'
    );
    GlobalService.setMenuServiceUrl('https://svcext.grupo-pinero.com/gp/identity-service/menu-svc');
    GlobalService.setApp('BPG');
    GlobalService.setAplicacionLogin('BPG');
    GlobalService.setLogged(false);
    GlobalService.setSession(new UserInfo());
    GlobalService.setApplicationTitle('BSuite');
  }
}

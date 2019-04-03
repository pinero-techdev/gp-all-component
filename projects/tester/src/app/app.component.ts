import { LoginService } from '../../../gp-all-component/src/lib/services/api/login/login.service';
import { GlobalService } from '../../../gp-all-component/src/lib/services/core/global.service';
import { UserInfo } from '../../../gp-all-component/src/lib/resources/data/user-info.model';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent {
    title = 'tester';

    constructor(private router: Router, private _loginService: LoginService) {
        GlobalService.setBaseUrl('/bpguest-svc');
        GlobalService.setLoginServiceUrl(
            'https://svcext.grupo-pinero.com/gp/identity-service/login-svc'
        );
        GlobalService.setMenuServiceUrl(
            'https://svcext.grupo-pinero.com/gp/identity-service/menu-svc'
        );
        GlobalService.setApp('BPG');
        GlobalService.setAplicacionLogin('BPG');
        GlobalService.setLogged(false);
        GlobalService.setSession(new UserInfo());
        GlobalService.setApplicationTitle('BSuite');
        if (window.location.hash.indexOf('login') === -1) {
            this.checkSession();
        }
    }

    checkSession() {
        this._loginService.sessionInfo().subscribe(
            (data) => {
                if (!data || !data.ok) {
                    // this.router.navigate(['login']);
                    console.info('NAVIGATE TO LOGIN');
                } else {
                    GlobalService.setSession(data.userInfo);
                    GlobalService.setLogged(true);
                    sessionStorage.setItem('userInfo', JSON.stringify(data.userInfo));
                }
            },
            (err) => console.error(err)
        );
    }
}

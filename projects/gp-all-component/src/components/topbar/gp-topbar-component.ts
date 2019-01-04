import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {CommonRs} from '../../services/common.service';
import {GlobalService} from '../../services/global.service';
import {LoginService} from '../../services/login.service';

@Component({
    selector: 'gp-topbar',
    templateUrl: './gp-topbar.component.html',
    styleUrls: ['./gp-topbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class GpTopbarComponent implements OnInit {
    /**
     * Elementos del html necesarios para saber si se ha clickado encima de ellos
     */
    @ViewChild('menuUser') menuUser: ElementRef;
    @ViewChild('userMobileButton') userMobileButton: ElementRef;

    public itemsUserMenu: MenuItem[];

    @Input() homeUrl: string;
    @Input() logoUrl: string;
    @Input() title: string;
    @Output() showServiceMenu: EventEmitter<boolean> = new EventEmitter<boolean>(true);
    display = false;
    showMenu = false;
    userMenuVisible = false;
    classShowMenuButton = 'Fright ShowOnMobile ripplelink Unselectable ShadowEffect';

    constructor(private _router: Router,
                private _loginService: LoginService) {
    }

    ngOnInit() {
        this.itemsUserMenu = [
            {
                label: 'Logout', icon: 'ui-icon-power-settings-new',
                command: (click) => {
                    this.toggleUserMenu(), this.redirect('logout');
                }
            }
        ];
    }

    /**
     * Metodo para redireccionar según la opción elegida en el desplegable del usuario
     * @param action
     */
    redirect(action: String) {
        switch (action) {
            case 'logout':
                let response = new CommonRs();
                this._loginService.logout().subscribe(
                    data => {
                        response = data;
                        if (response.ok) {
                            this._router.navigate(['login']);
                        }
                    },
                    error => {
                        console.error(error);
                        this._router.navigate(['login']);
                    },
                    () => {
                        // Si ha habido algún problema con el logout, el usuario sigue logueado
                        GlobalService.setLogged(!(response.ok));
                    }
                );
                break;
            default:
        }
    }

    toggleUserMenu() {
        this.userMenuVisible = !this.userMenuVisible;
    }

    get logged() {
        return GlobalService.getLOGGED();
    }

    get fullName() {
        if (GlobalService.getSESSION()) {
            return GlobalService.getSESSION().fullName;
        } else {
            return null;
        }
    }
}

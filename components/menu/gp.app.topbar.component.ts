import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {UserInfo} from "../../resources/data/userInfo";
import {CommonRs} from "../../services/common.service";
import {GlobalService} from "../../services/global.service";
import {LoginService} from "../../services/login.service";

@Component({
    selector: 'gp-app-topbar',
    templateUrl: './gp.app.topbar.component.html',
    styleUrls: ['./gp.app.topbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class GpAppTopBarComponent implements OnInit {
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
    display: boolean = false;
    showMenu: boolean = false;
    userMenuVisible: boolean = false;
    classShowMenuButton: String = "Fright ShowOnMobile ripplelink Unselectable ShadowEffect";

    constructor(private _router: Router,
                public globalService: GlobalService,
                private _loginService: LoginService) {
    }

    ngOnInit() {
        this.itemsUserMenu = [
            {
                label: 'Logout', icon: 'ui-icon-power-settings-new',
                command: (click) => {
                    this.toggleUserMenu(), this.redirect('logout')
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
                        console.error(error)
                        this._router.navigate(['login']);
                    },
                    () => {
                        console.log("petición de logout finalizada con resultado: ");
                        // CommonRs se crea con ok por defecto a falso
                        // Si ha habido algún problema con el logout, el usuario sigue logueado
                        GlobalService.setLogged(!(response.ok));
                    }
                );
                break;
            default:
                console.log("redireccionar a:" + action);
        }
    }

    toggleUserMenu() {
        this.userMenuVisible = !this.userMenuVisible;
    }

    get logged() {
        return GlobalService.LOGGED;
    }

    get fullName() {
        if (GlobalService.SESSION) {
            return GlobalService.SESSION.fullName;
        } else {
            return null;
        }
    }
}

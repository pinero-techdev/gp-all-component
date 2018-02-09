import {Component, Input, Output, ElementRef, EventEmitter, ViewChild, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalService} from "../../services/global.service";
import {UserInfo} from "../../resources/data/userInfo";
import {LoginService} from "../../services/login.service";
import {MenuItem} from "primeng/components/common/api";
import {CommonRs} from "../../services/common.service";

@Component({
    selector: 'gp-app-topbar',
    templateUrl: './gp.app.topbar.component.html'
})
export class GpAppTopBarComponent implements OnInit {

    /**
     * Elementos del html necesarios para saber si se ha clickado encima de ellos
     */
    @ViewChild('menuUser') menuUser:ElementRef;
    @ViewChild('userMobileButton') userMobileButton:ElementRef;

    public itemsUserMenu:MenuItem[];

    @Input() homeUrl:String;
    @Input() logoUrl:String;
    @Input() title:String;
    @Output() showServiceMenu:EventEmitter<boolean> = new EventEmitter<boolean>(true);
    display:boolean = false;
    showMenu:boolean = false;
    userMenuVisible:boolean = false;
    classShowMenuButton:String = "Fright ShowOnMobile ripplelink Unselectable ShadowEffect";

    constructor(private _router:Router,
                public globalService:GlobalService,
                private _loginService:LoginService) {
    }

    ngOnInit() {
        this.itemsUserMenu = [{
            label: 'Usuario',
            icon: 'ui-icon-folder',
            items: [
                {
                    label: 'Logout', icon: 'ui-icon-power-settings-new', command: (click) => {
                    this.toggleUserMenu(), this.redirect('logout')
                }
                }
            ]
        }];
    }

    /**
     * Metodo para redireccionar según la opción elegida en el desplegable del usuario
     * @param action
     */
    redirect(action:String) {
        switch (action) {
            case 'logout':
                let response = new CommonRs();
                this._loginService.logout().subscribe(
                    data => {
                        response = data;
                        if (response.ok) {
                            this.globalService.session = new UserInfo();
                            localStorage.removeItem('userInfo');
                            this._router.navigate(['login']);
                        }
                    },
                    error => console.error(error),
                    () => {
                        console.log("petición de logout finalizada con resultado: ");
                        // CommonRs se crea con ok por defecto a falso
                        // Si ha habido algún problema con el logout, el usuario sigue logueado
                        this.globalService.logged = !(response.ok);
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
}

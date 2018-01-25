import {Component, OnInit, AfterViewInit, ApplicationRef, EventEmitter, Output} from '@angular/core';
import {MenuRq} from "../../resources/data/menuRq";
import {GlobalService} from "../../services/global.service";
import {AppMenuService} from "../../services/app-menu.service";
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'gp-app-main-menu',
    templateUrl: './gp.app.main.menu.component.html'
})
/**
 * Clase Menu que agrupa los servicios accesibles por el usuario
 */
export class GpAppMainMenuComponent implements OnInit, AfterViewInit {
    menuItems:Observable<any>;

    @Output()
    menuCharged = new EventEmitter<boolean>();

    constructor(private _appMenuProviderService:AppMenuService, private _applicationRef:ApplicationRef) {
    }

    ngOnInit() {
        this.initMenu();
    }

    /**
     * Esperamos a que esté cargado el menú, para indicar al componente padre
     * que ya puede inicar la carga del layout.js de Ultima
     */
    ngAfterViewInit() {
        this.menuCharged.emit(true);
    }

    initMenu() {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        let userId = null;
        if (userInfo != undefined && userInfo != null) {
            userId = userInfo.userId;
        }
        let request:MenuRq = new MenuRq(userId, GlobalService.APP);
        this.menuItems = this._appMenuProviderService.obtenMenu(request);
    }

    refresh() {
        this._applicationRef.tick();
    }
}
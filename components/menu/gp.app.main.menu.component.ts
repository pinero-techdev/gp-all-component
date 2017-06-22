import {Component, OnInit, ApplicationRef} from '@angular/core';
import {MenuItem} from "../../resources/data/menuItem";
import {MenuRq} from "../../resources/data/menuRq";
import { GlobalService } from "../../services/global.service";
import { AppMenuService } from "../../services/app-menu.service";
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'gp-app-main-menu',
    templateUrl: './gp.app.main.menu.component.html'
})
/**
 * Clase Menu que agrupa los servicios accesibles por el usuario
 */
export class GpAppMainMenuComponent implements OnInit {

    menuItems: Observable<any>;

    constructor(private _appMenuProviderService: AppMenuService, private _globalService: GlobalService, private _applicationRef : ApplicationRef ) {
    }

    ngOnInit() {
        this.initMenu();
    }

    initMenu() {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        let userId = null;
        if ( userInfo != undefined && userInfo != null ){
            userId = userInfo.userId;
        }
        let request: MenuRq = new MenuRq(userId, GlobalService.APP);
        this.menuItems = this._appMenuProviderService.obtenMenu( request );
    }

    refresh(){
        this._applicationRef.tick();
    }
}


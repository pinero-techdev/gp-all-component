import { GlobalService } from './../../services/core/global.service';
import { MainMenuService, MenuRq } from '../../services/api/main-menu/main-menu.service';
import {
    Component,
    OnInit,
    AfterViewInit,
    ApplicationRef,
    EventEmitter,
    Output,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'gp-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
/**
 * Clase Menu que agrupa los servicios accesibles por el usuario
 */
export class MainMenuComponent implements OnInit, AfterViewInit {
    menuItems: Observable<any>;
    @Output() menuCharged: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private mainMenuService: MainMenuService, private appRef: ApplicationRef) {}

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
        const sessionId = sessionStorage.getItem('sessionId');
        const request = new MenuRq(sessionId, GlobalService.getPARAMS());
        this.menuItems = this.mainMenuService.obtenMenu(request);
    }

    refresh() {
        this.appRef.tick();
    }
}

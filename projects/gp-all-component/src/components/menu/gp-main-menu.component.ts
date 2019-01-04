import {Component, OnInit, AfterViewInit, ApplicationRef, EventEmitter, Output} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {MenuService, MenuRq} from '../../services/menu.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'gp-main-menu',
  templateUrl: './gp-main-menu.component.html'
})
/**
 * Clase Menu que agrupa los servicios accesibles por el usuario
 */
export class GpMainMenuComponent implements OnInit, AfterViewInit {
  menuItems: Observable<any>;
  @Output() menuCharged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _appMenuProviderService: MenuService, private _applicationRef: ApplicationRef) {
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
    const sessionId = sessionStorage.getItem('sessionId');
    const request: MenuRq = new MenuRq(sessionId, GlobalService.getPARAMS());
    this.menuItems = this._appMenuProviderService.obtenMenu(request);
  }

  refresh() {
    this._applicationRef.tick();
  }
}

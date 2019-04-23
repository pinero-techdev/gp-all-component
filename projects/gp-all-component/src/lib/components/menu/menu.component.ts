/* tslint:disable */
import { GlobalService } from './../../services/core/global.service';
import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter, Output, ApplicationRef } from '@angular/core';

@Component({
  selector: 'gp-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  // public menuItems: Observable<any>;
  // @Output() menuCharged: EventEmitter<boolean> = new EventEmitter<boolean>();

  // constructor(
  //     private _appMenuProviderService: MenuService,
  //     private _applicationRef: ApplicationRef
  // ) {}

  ngOnInit() {
    //     this.initMenu();
  }

  // /**
  //  * Esperamos a que esté cargado el menú, para indicar al componente padre
  //  * que ya puede inicar la carga del layout.js de Ultima
  //  */
  // ngAfterViewInit() {
  //     this.menuCharged.emit(true);
  // }

  // initMenu() {
  //     const sessionId = sessionStorage.getItem('sessionId');
  //     const request: MenuRq = new MenuRq(sessionId, GlobalService.getPARAMS());
  //     // TODO: Add again when mock
  //     // this.menuItems = this._appMenuProviderService.obtenMenu(request);
  // }

  // refresh() {
  //     this._applicationRef.tick();
  // }
}

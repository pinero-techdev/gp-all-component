import { Injectable } from '@angular/core';
import { AppMenuProviderService } from './app-menu-provider.service';
import { MenuRq } from '../resources/data/menuRq';
import { Observable } from 'rxjs/Rx';
import { GlobalService } from './global.service';
import { DemoOpcionesMenuService } from './../../../src/app/shared/services/demo-opciones-menu.service';

@Injectable()
export class AppMenuService {
  temp: any[];
  opcionesMenu: any[];

  constructor(private _appMenuProvider: AppMenuProviderService, private _opcionesMenu: DemoOpcionesMenuService) {
    this.opcionesMenu = _opcionesMenu.getPermisos();
  }

  obtenMenu(rq: MenuRq): Observable<any> {
    return Observable.create(observer => {
      this.temp = this._appMenuProvider.getEstructuraMenu();
      this._appMenuProvider.obtenOpcionesActivas(rq).subscribe(
        data => {
          if (data.ok) {
            if (data.menu != null && data.menu.opciones != null && data.roles != null) {
              this.cargarOpciones(this.temp, data.menu.opciones);
            } else {
              data.menu = data.menu != null ? data.menu : {};
              data.menu.opciones = data.menu.opciones != null ? data.menu.opciones : [];
              data.menu.opciones = this.opcionesMenu;
              let arrayRoles: any = [];
              let rol = { rolCodigo: 'BPGADMIN', rolDesc: 'ADMINISTRADOR BPG', rolEmpCodigo: 'KIP' };
              arrayRoles.push(rol);
              data.roles = arrayRoles;
              this.cargarOpciones(this.temp, data.menu.opciones);
            }
            GlobalService.setRoles(data.roles);
          } else {
            console.error('No se recuperó un menú');
          }
        },
        error => console.error(error),
        () => {
          console.debug('finalizado obtenMenu');
          observer.next(this.temp);
        }
      );
    });
  }

  cargarOpciones(elementos: any[], options: any[]): boolean {
    let tieneOpciones = false;
    elementos.forEach(e => {
      if (e.submenus) {
        e.enabled = this.cargarOpciones(e.submenus, options);
      } else {
        e.enabled = options[e.id] !== undefined;
      }
      if (!tieneOpciones && e.enabled) tieneOpciones = true;
    });
    return tieneOpciones;
  }
}

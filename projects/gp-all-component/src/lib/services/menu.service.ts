import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Param} from '../resources/data/param.model';
import {MenuProviderService} from './menu-provider.service';
import {CommonRq} from './common.service';
import {GlobalService} from './global.service';

export class MenuRq extends CommonRq {
  sessionId: string;
  params: Param[];

  constructor(sessionId: string, params?: Param[]) {
    super();
    this.sessionId = sessionId;
    this.params = params;
  }
}

@Injectable()
export class MenuService {
  temp: any[];

  constructor(private _appMenuProvider: MenuProviderService) {
  }

  obtenMenu(rq: MenuRq): Observable<any> {
    return Observable.create(observer => {
      this.temp = this._appMenuProvider.getEstructuraMenu();
      this._appMenuProvider.obtenOpcionesActivas(rq).subscribe(
        data => {
          if (data.ok) {
            if (!(data.menu.opciones === null || data.menu.opciones === undefined)) {
              this.cargarOpciones(this.temp, data.menu.opciones);
            }
            GlobalService.setRoles(data.roles);
          } else {
            console.error('No se recuperó un menú');
          }
        },
        error => console.error(error),
        () => {
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
        const aux = options.filter(v => {
          return v.id === e.id;
        });

        if (aux && aux.length > 0) {
          e.enabled = true;
        }
      }
      if (!tieneOpciones && e.enabled) {
        tieneOpciones = true;
      }
    });
    return tieneOpciones;
  }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuRq } from './main-menu.service';
import { CommonService } from '../../core/common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MainMenuProviderService extends CommonService {
  constructor(http: HttpClient) {
    super(http);
  }

  /** Get the menu structure as the main menu component requires */
  getMenuStructure(): any[] {
    return null;
  }

  /** Get the permissions for any menu option, usually it's calling obtenMenu(). */
  getOptions(rq: MenuRq): Observable<any> {
    return null;
  }

  /** Once the options and permissions are returned, this method check which options are enabled */
  optionIsActive(menu: any[] = null, accion: string = null, nroParams: number = null): boolean {
    if (menu && accion && nroParams !== null) {
      for (const opcMenu of menu) {
        if (!opcMenu) {
          return false;
        }
        if (opcMenu.submenus) {
          const opcion = this.optionIsActive(opcMenu.submenus, accion, nroParams);
          if (opcion) {
            return true;
          }
        } else {
          const opcMenuParams: string[] = opcMenu.action.split('/');
          const accionParams: string[] = accion.split('/');
          if (
            opcMenuParams.length === accionParams.length ||
            opcMenuParams.length + nroParams === accionParams.length
          ) {
            let index = 0;
            let exit = false;
            while (index < opcMenuParams.length && !exit) {
              exit = opcMenuParams[index].toLowerCase() !== accionParams[index].toLowerCase();
              index++;
            }
            if (!exit) {
              return opcMenu.enabled;
            }
          }
        }
      }
    }
    return false;
  }

  hasActiveOptions(menu: any[], idsOpcionesMenu: string[]): boolean {
    if (menu && idsOpcionesMenu) {
      for (const idOpcMenu of idsOpcionesMenu) {
        if (!idOpcMenu) {
          return false;
        }
        for (const opcMenu of menu) {
          if (!opcMenu) {
            return false;
          }

          if (opcMenu.submenus) {
            if (this.hasActiveOptions(opcMenu.submenus, idsOpcionesMenu)) {
              return true;
            }
          } else if (opcMenu.id === idOpcMenu && opcMenu.enabled) {
            return true;
          }
        }
      }
    }
    return false;
  }
}

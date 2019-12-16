import { LocaleES } from '../../../resources/localization/es-ES.lang';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Param } from '../../../resources/data/param.model';
import { MainMenuProviderService } from './main-menu-provider.service';
import { CommonRq } from '../../core/common.service';
import { GlobalService } from '../../core/global.service';

export class MenuRq extends CommonRq {
  sessionId: string;
  params: Param[];

  constructor(sessionId: string, params?: Param[]) {
    super();
    this.sessionId = sessionId;
    this.params = params;
  }
}

@Injectable({ providedIn: 'root' })
export class MainMenuService {
  temp: any[] = [];

  constructor(private menuProvider: MainMenuProviderService) {}

  /**
   * Get menu options given by menu provider.
   * @param rq MenuRequest
   */
  getMenu(rq: MenuRq): Observable<any> {
    return Observable.create((observer) => {
      this.temp = this.menuProvider.getMenuStructure();
      if (this.temp) {
        if (this.menuProvider.getOptions) {
          this.menuProvider.getOptions(rq).subscribe(
            (data) => {
              if (data.ok) {
                if (data.menu.opciones && data.menu.opciones.length) {
                  this.getOptions(this.temp, data.menu.opciones);
                }
                if (data.roles && data.roles.length) {
                  GlobalService.setRoles(data.roles);
                }
              } else {
                console.error(LocaleES.ERROR_RETRIEVING_THE_MENU);
              }
              observer.next(this.temp);
            },
            (error) => console.error(error),
            () => {
              observer.next(this.temp);
            }
          );
        }
      } else {
        observer.next(this.temp);
      }
    });
  }

  /**
   * Get menu options
   * @param elements Elements Menu
   * @param options Options menu
   */
  getOptions(elements: any[], options: any[]): boolean {
    let hasOptions = false;
    elements.forEach((e) => {
      if (e.submenus) {
        e.enabled = this.getOptions(e.submenus, options);
      } else {
        const aux = options.filter((v) => {
          return v.id === e.id;
        });

        if (aux && aux.length > 0) {
          e.enabled = true;
        }
      }
      if (!hasOptions && e.enabled) {
        hasOptions = true;
      }
    });
    return hasOptions;
  }
}

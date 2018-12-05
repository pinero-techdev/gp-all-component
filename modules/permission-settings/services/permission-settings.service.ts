import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class PermissionSettingsService {
  static settings: any;
  constructor(private _http: HttpClient) {

  }

  load(token: string): Observable<any> {
    return this._http.post<any>("/roles-svc/getRolesModulos",{sessionId: token})
      .map((data) => {
        if(data.ok){
          return data.modulos;
        } else {
          console.error('No settings');
          return null;
        }
      });
  }

  isVisible(form: string, action: string): boolean {
    if(this.hasAction(form, action) &&
      Object.keys(PermissionSettingsService.settings[form].acciones[action]).indexOf("VIS") != -1) {
      return PermissionSettingsService.settings[form].acciones[action]["VIS"] != "false";
    }
    return true;
  }

  isEnabled(form: string, action: string): boolean {
    if(this.hasAction(form, action) &&
      Object.keys(PermissionSettingsService.settings[form].acciones[action]).indexOf("ENA") != -1) {
      return PermissionSettingsService.settings[form].acciones[action]["ENA"] != "false";
    }
    return true;
  }

  private hasAction(form: string, action: string) {
    return (PermissionSettingsService.settings &&
      PermissionSettingsService.settings[form] &&
      PermissionSettingsService.settings[form].acciones &&
      PermissionSettingsService.settings[form].acciones[action]);
  }
}

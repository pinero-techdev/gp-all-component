import { MainMenuProviderService } from '@lib/services/api/main-menu/main-menu-provider.service';
import { CommonRs } from '@lib/services/core/common.service';
import { MAIN_MENU_TEMP_MOCK, MAIN_MENU_MOCK } from '@lib/components/main-menu/main-menu.mock';
import { MenuRq } from '@lib/services/api/main-menu/main-menu.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MainMenuTesterService extends MainMenuProviderService {
    getEstructuraMenu(): any[] {
        return MAIN_MENU_TEMP_MOCK;
    }

    obtenOpcionesActivas(rq: MenuRq = null): Observable<CommonRs> {
        const response: any = new CommonRs();
        response.ok = true;
        response.menu = MAIN_MENU_MOCK;
        return Observable.of(response);
    }
}

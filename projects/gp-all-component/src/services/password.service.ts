import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CommonRs, CommonService} from './common.service';
import {GlobalService} from './global.service';

export class ModificaPasswordRq {
    usuario: string;
    passwordOld: string;
    passwordNew: string;

    constructor(usuario: string, passwordOld: string, passwordNew: string) {
        this.usuario = usuario;
        this.passwordOld = passwordOld;
        this.passwordNew = passwordNew;
    }
}

@Injectable()
export class PasswordService extends CommonService {
    modifica(request: ModificaPasswordRq): Observable<CommonRs> {
        const url = `${GlobalService.getBASE_URL()}/password-svc/modifica`;
        const rq = JSON.stringify(request);

        return this.post<CommonRs>(
            url, rq);
    }
}

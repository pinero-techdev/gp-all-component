import {Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {Observable} from 'rxjs/Rx';
import {CommonService, CommonRs} from './common.service';

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
        let urlServicio = `${GlobalService.BASE_URL}/password-svc/modifica`;
        let rq = JSON.stringify(request);

        return this.serviceRequest<CommonRs>(
            urlServicio, rq)
    }
}
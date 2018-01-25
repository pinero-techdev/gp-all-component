import {Injectable} from "@angular/core";
import {GlobalService} from "./global.service";
import {Observable} from "rxjs/Rx";
import {CommonService, CommonRs} from "gp-all-component/services/common.service";

export class ModificaPasswordRq {
    usuario:string;
    passwordOld:string;
    passwordNew:string;

    constructor(usuario:string, passwordOld:string, passwordNew:string) {
        this.usuario = usuario;
        this.passwordOld = passwordOld;
        this.passwordNew = passwordNew;
    }
}

export class ModificaPasswordRs extends CommonRs {

}

@Injectable()
export class PasswordService extends CommonService {

    modifica(request:ModificaPasswordRq):Observable<ModificaPasswordRs> {
        let urlServicio = `${GlobalService.BASE_URL}/password-svc/modifica`;
        let rq = JSON.stringify(request);

        return this.serviceRequest<ModificaPasswordRs>(
            urlServicio, rq)
    }
}
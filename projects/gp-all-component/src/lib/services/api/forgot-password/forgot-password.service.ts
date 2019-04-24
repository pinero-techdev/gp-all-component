import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonRs, CommonService } from '../../core/common.service';
import { GlobalService } from '../../core/global.service';

export class ForgotPasswordRq {
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
export class ForgotPasswordService extends CommonService {
  updatePassword(request: ForgotPasswordRq): Observable<CommonRs> {
    const url = `${GlobalService.getBASE_URL()}/password-svc/modifica`;
    const rq = JSON.stringify(request);

    return this.post<CommonRs>(url, rq);
  }
}

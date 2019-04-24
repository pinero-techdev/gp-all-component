import { Observable, of, throwError } from 'rxjs';
import { CommonRs } from './../../core/common.service';
import { ForgotPasswordRq } from '@lib/services/api/forgot-password/forgot-password.service';
import { ErrorInformation } from '@lib/resources/data/error-information/error-information.model';

export class ForgotPasswordServiceMock {
  updatePassword(request: ForgotPasswordRq): Observable<CommonRs> {
    const response = new CommonRs();
    response.ok = true;
    if (
      !request ||
      !request.usuario ||
      !request.passwordNew ||
      !request.passwordOld ||
      request.usuario === 'username:fails'
    ) {
      response.ok = false;
      response.error = new ErrorInformation();
      response.error.errorMessage = 'Has occurred an error';
      response.error.internalErrorMessage = 'Has occurred an error';
    }

    if (request && request.usuario === 'server:down') {
      return throwError(new Error('Server is down'));
    }
    return of(response);
  }
}

import { LoginRq, SessionInfoRs } from './login.service';
import { Observable, of } from 'rxjs';
import { ErrorInformation } from '@lib/resources/data/error-information/error-information.model';
import { CommonRs } from '@lib/services/core/common.service';
export class LoginServiceMock {
  login(request: LoginRq): Observable<SessionInfoRs> {
    const response = new SessionInfoRs();
    response.ok = true;
    if (!request || !request.usuario || !request.password) {
      response.ok = false;
      response.error = new ErrorInformation();
      response.error.errorMessage = 'An error has occurred!';
      response.error.internalErrorMessage = 'An error has occurred!';
    }
    return of(response);
  }

  logout(request: LoginRq): Observable<CommonRs> {
    const response = new CommonRs();
    response.ok = true;
    if (!request) {
      response.ok = false;
      response.error = new ErrorInformation();
      response.error.errorMessage = 'An error has occurred!';
      response.error.internalErrorMessage = 'An error has occurred!';
    }
    return of(response);
  }
}

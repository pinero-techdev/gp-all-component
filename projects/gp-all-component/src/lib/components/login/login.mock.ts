import { CommonRs } from './../../services/core/common.service';
import { LoginRq } from './../../services/api/login/login.service';
import { Observable, of } from 'rxjs';
import { ErrorInformation } from '@lib/resources/data/error-information/error-information.model';
export class LoginServiceMock {
    login(request: LoginRq): Observable<CommonRs> {
        const response = new CommonRs();
        response.ok = true;
        if (!request.usuario || !request.password) {
            response.ok = false;
            response.error = new ErrorInformation();
            response.error.errorMessage = 'An error has occurred!';
            response.error.internalErrorMessage = 'An error has occurred!';
        }
        return of(response);
    }
}

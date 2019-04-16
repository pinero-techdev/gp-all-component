import { Observable, of } from 'rxjs';
import { CommonRs } from './../../core/common.service';
import { ForgotPasswordRq } from '@lib/services/api/forgot-password/forgot-password.service';
import { ErrorInformation } from '@lib/resources/data/error-information/error-information.model';

export class ForgotPasswordServiceMock {
    updatePassword(request: ForgotPasswordRq): Observable<CommonRs> {
        const response = new CommonRs();
        response.ok = true;
        if (!request || !request.usuario || !request.passwordNew || !request.passwordOld) {
            response.ok = false;
            response.error = new ErrorInformation();
            response.error.errorMessage = 'Has occurred an error';
            response.error.internalErrorMessage = 'Has occurred an error';
        }
        return of(response);
    }
}

import {ErrorInformationField} from './error-information-field';

export class ErrorInformation {
    errorMessage: string;
    internalErrorMessage: string;
    fields: ErrorInformationField[];
    notLogged: boolean;
}

import {ErrorInformationField} from './error-information-field.model';

export class ErrorInformation {
    errorMessage: string;
    internalErrorMessage: string;
    fields: ErrorInformationField[];
    notLogged: boolean;
}

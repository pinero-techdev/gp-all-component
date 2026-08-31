import { Transferred } from './transferred.model';
import { Warning } from './warning.model';

// Contrato de respuesta anidado (common-api) para todas las llamadas a /table_svc/*.
export class Result {
  errorCode?: string;
  errorMessage?: string;
  errorType?: string;
  internalErrorMessage?: string;
  ok = true;
  transferreds?: Transferred[];
  warnings?: Warning[];
}

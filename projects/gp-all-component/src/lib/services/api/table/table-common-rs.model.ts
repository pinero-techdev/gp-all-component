// Contrato de respuesta anidado (common-api) para todas las llamadas a /table_svc/*.
export class Result {
  ok: boolean;
  errorCode?: string;
  errorMessage?: string;
  internalErrorMessage?: string;
}

export class CommonRs {
  result: Result;
}

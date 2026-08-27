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

export class CommonRs {
  result?: Result;
}

export class Transferred {
  errorMessage?: string;
  identificador?: string;
  transfered?: boolean;
}

export class Warning {
  additionalInformation?: AdditionalInformation;
  code?: string;
  message?: string;
}

export class AdditionalInformation {
  items?: KeyValue[];
}

export class KeyValue {
  name?: string;
  value?: string;
}

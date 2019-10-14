import { AssignedObject } from '../../shared/assigned-object/assigned-object.class';

export class TranslationInfo extends AssignedObject {
  keyFields: string[] = [];
  scheme: string;
  table: string;
  field: string;
  description: string;
  allowEdition: boolean;
  orderByLangCod: boolean;
}

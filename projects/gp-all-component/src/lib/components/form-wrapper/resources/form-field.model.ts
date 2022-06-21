
import { DataTableMetaDataField } from '../../../resources/data/data-table/meta-data/data-table-meta-data-field.model';
import { GpFormControl } from './form-control.model';
import { GpFormFieldType } from './form-field-type.enum';
import { Message } from 'primeng/api';

// TODO optimizar 17/12/2018
export class GpFormField {
  /* Tipo de control usado.*/
  formFieldType: GpFormFieldType;
  /* Indica si el campo es valido o no. */
  validField = true;
  /* MensajesComponent de error asociados del campo. */
  fieldMsgs: Message[] = null;

  constructor(public formControl: GpFormControl, public fieldMetadata: DataTableMetaDataField) {}
}

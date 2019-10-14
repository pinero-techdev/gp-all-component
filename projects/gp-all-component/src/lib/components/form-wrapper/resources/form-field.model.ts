import { Message } from 'primeng/components/common/api';
import { Field } from '../../../resources/data/data-table/meta-data/meta-data-field.model';
import { GpFormControl } from './form-control.model';
import { GpFormFieldType } from './form-field-type.enum';
import { AssignedObject } from '../../../shared/assigned-object/assigned-object.class';

export class GpFormField extends AssignedObject {
  // tslint:disable-next-line
  private _fieldMetadata: Field = new Field();
  // tslint:disable-next-line
  private _formControl: GpFormControl = new GpFormControl();
  /* Tipo de control usado.*/
  formFieldType: GpFormFieldType;
  /* Indica si el campo es valido o no. */
  validField = true;
  /* MensajesComponent de error asociados del campo. */
  fieldMsgs: Message[] = null;

  get fieldMetadata() {
    return this._fieldMetadata;
  }

  set fieldMetadata(value: Field) {
    this._fieldMetadata = new Field().assign(value, true);
  }

  get formControl() {
    return this._formControl;
  }

  set formControl(value: GpFormControl) {
    this._formControl = new GpFormControl().assign(value, true);
  }
}

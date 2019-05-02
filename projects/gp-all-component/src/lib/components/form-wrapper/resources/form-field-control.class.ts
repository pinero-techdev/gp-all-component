import { Message } from 'primeng/api';
import { isNullOrUndefined } from 'util';
import { Input } from '@angular/core';
import { GpFormControl } from './form-control.model';
import { GpFormField } from './form-field.model';
import { GpFormFieldControlInterface } from './form-field-control.interface';

export abstract class GpFormFieldControl extends GpFormControl
  implements GpFormFieldControlInterface {
  @Input() formField: GpFormField;

  currentValue: any;

  abstract getFormField(): GpFormField;

  /* Coge el valor del campo y lo pasa al registro indicado. */
  abstract copyValueFromControlToEditedRow(editedRow: any);

  /* Coge el valor de la fila y lo pasa al control. */
  abstract copyValueFromEditedRowToControl(editedRow: any);

  /* Valida el campo. */
  abstract validateField(editedRow: any);

  /* Añade un mensaje a la lista de mensajes del campo. */
  validateFieldAddMsgs(msg: string) {
    const formField = this.getFormField();
    if (formField) {
      formField.validField = false;
      if (isNullOrUndefined(formField.fieldMsgs)) {
        formField.fieldMsgs = [];
      }
      formField.fieldMsgs.push({ severity: 'error', detail: msg } as Message);
    }
  }

  /* Limpia la lista de mensajes de validación del campo y marca
   * el campo como valido. */
  clearValidations() {
    const formField = this.getFormField();
    if (formField) {
      formField.fieldMsgs = null;
      formField.validField = true;
    }
  }

  controlDisabled(): boolean {
    const formField = this.getFormField();
    return (
      !isNullOrUndefined(formField) &&
      (formField.formControl.lockFields ||
        formField.fieldMetadata.readOnly ||
        (formField.fieldMetadata.id && formField.formControl.edicionEdit))
    );
  }

  onFieldChange() {
    const field = this.getFormField();
    if (!field || !field.formControl) {
      return;
    }
    this.copyValueFromControlToEditedRow(field.formControl.editedRow);
  }
}

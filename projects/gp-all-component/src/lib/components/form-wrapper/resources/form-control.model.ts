import { AssignedObject } from '../../../shared/assigned-object/assigned-object.class';

export class GpFormControl extends AssignedObject {
  // Fila editada.
  editedRow: any = null;
  // Fila en edicion (seleccionada con selectOneRow).
  // Contiene el valor original del registro que esta en edicion.
  originalRow: any;
  // Operacion que estamos realizando.
  edicionEdit = false;
  edicionAdd = false;
  // Indica si se permite la edicion de los campos.
  lockFields = false;
}

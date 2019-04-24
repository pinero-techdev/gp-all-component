// TODO optimizar 17/12/2018
export class GpFormControl {
  // Fila editada.
  editedRow: any;
  // Fila en edicion (seleccionada con selectOneRow).
  // Contiene el valor original del registro que esta en edicion.
  originalRow: any;
  // Operacion que estamos realizando.
  edicionEdit = false;
  edicionAdd = false;
  // Indica si se permite la edicion de los campos.
  lockFields = false;
}

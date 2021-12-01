export class TableEditableCols {
  field: string; // Nombre del campo, ha de coincidir con el campo de la clase que ira en Table.rows
  header: string; // Cabecera de la columna
  type: string; // Tipo: permite añadir formato y pipes. Admitidos: string, number, date
  style: string; // Inyección de estilo extra de la columna
  pipe: string; // Pipe personalizado para los tipos number y date
  showInTable: boolean; // Se muestra en la tabla
  insertable: boolean; // Es insertable
  editable: boolean; // Es updatable
  editType: string; // Tipo de edición: input, calendar, dropdown, textArea
  filter: string; //
  defaultFilterValue: string; // Valor de filtro por defecto de la columna
  total: boolean; // Sumatorio de la columna al pie de la tabla
  expandable: boolean; // Deprecated
  colsColor: boolean; // Color para columnas que tienen diferentes colores en cada fila
  tooltip: string; // Información sobre la columna
}

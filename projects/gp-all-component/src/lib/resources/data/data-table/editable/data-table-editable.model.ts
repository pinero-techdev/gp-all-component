import { TableEditableCols } from './data-table-editable-cols.model';
import { TableEditableLovs } from './data-table-editable-lovs.model';

export class TableEditable {
  // Muestra el botón de añadir y mostrará los campos que tengan cols.insertable = true
  canAdd: boolean;

  // Muestra el botón de editar y los campos con cols.editable = true si hay fila seleccionada
  canEdit: boolean;

  // Muestra el botón de borrar si se ha seleccionado una fila
  canDelete: boolean;

  // Permite la edición de los campos dentro de la tabla
  canEditRow: boolean;

  // Titulo que se mostrará de la tabla en el front
  caption: string;

  // Configuración de las columnas
  cols: TableEditableCols[];

  // Lovs de las columnas que son tipo dropdown (el name ha de coincidir con cols.field)
  lovs: TableEditableLovs[];

  // Filas de los datos obtenidos de base de datos
  rows: any;

  // Identificador único del front en la tabla que permite diferenciar filas (requisito del primeng)
  dataKey: string;

  width: number; // Longitud máxima de una tabla (en caso de overflow se hace scrollX)

  expandableRows: boolean; // Deprecated por incompatibilidad con lazyload

  checkBoxSelect: boolean; // Checkbox para seleccionar filas o todas ellas

  tableChild: string; // Tabla hija anidad (sirve en case mostrar detalles en un dialogo)

  scrollHeight = 210; // Tamaño del scroll

  toggleColumns: boolean;
  filters: boolean; // Indica si se añade un filtro de cabecera a nivel de columna

  displayRows = 20; // Cantidad de filas para el lazy load
}

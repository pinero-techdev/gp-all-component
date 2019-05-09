import { SelectItem } from 'primeng/primeng';

export class GPSelector {
  /**
   * Opciones del options
   * @type {Array}
   */
  options: SelectItem[] = [];

  /**
   * Datos seleccionados, puede ser un valor o un array de valore
   */
  selection: any;

  /**
   * constructor del Selector
   * @param isMultiSelect - indica si la selección es de un único valor o de varios
   */
  constructor(public isMultiSelect?: boolean) {
    if (isMultiSelect) {
      this.selection = [];
    } else {
      this.selection = null;
    }
  }

  /**
   * Metodo para cargar los datos en nuestro selector (dato seleccionado incluido)
   * @param datos - Array que contiene los datos que se utilizaran para montar el options
   * @param atributoValor - Atributo que contiene el valor de los campos del options
   * @param atributoDesc - Atributo que contiene los atributos que conforman la etiqueta del options
   * @param descripcionPorDefecto - Descripción que se pondrá en la primera opción del options
   * @param separadorAtributosDesc - Separador que se utilizará para separar los atributos de la etiqueta del options. Por defecto es '-'
   * @param autoSeleccion - Indica si se tiene que seleccionar por defecto un valor, en caso de que solo haya una opción disponible
   * @param translate - Pipe dedicado a traduccion
   */
  public cargarDatos(
    datos: any[],
    atributoValor: string,
    atributoDesc: string[],
    descripcionPorDefecto?: string,
    separadorAtributosDesc?: string,
    autoSeleccion?: boolean,
    translate?: any
  ) {
    this.options = [];
    let separador = ' - ';
    if (separadorAtributosDesc) {
      separador = ' ' + separadorAtributosDesc + ' ';
    }
    if (descripcionPorDefecto && (!datos || (datos != null && datos.length !== 1) || !autoSeleccion)) {
      if (translate) {
        this.options.push({ label: translate.transform(descripcionPorDefecto), value: null });
      } else {
        this.options.push({ label: descripcionPorDefecto, value: null });
      }
    }
    if (datos != null) {
      for (const dato of datos) {
        let label = '';
        for (const descripcion of atributoDesc) {
          if (label.length !== 0) {
            label += separador;
          }
          if (translate) {
            label += translate.transform(dato[descripcion]);
          } else {
            label += dato[descripcion];
          }
        }
        this.options.push({ label: label, value: dato[atributoValor] });
      }
      if (autoSeleccion && datos.length === 1) {
        this.selection = this.isMultiSelect ? [this.options[0].value] : this.options[0].value;
      }
    }
  }
}

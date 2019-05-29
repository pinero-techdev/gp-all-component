import { MenuItem, SelectItem } from 'primeng/primeng';

import * as moment from 'moment';

import { GPSelectItem } from '../../resources/data/gp-select-item.model';
import { CalendarConstants } from '../../resources/constants/calendar.constants';
import { isNull, isNullOrUndefined } from 'util';
/* tslint:disable:variable-name */
export class GPUtil {
  public static readonly odd_reA = new RegExp('\u00C0|\u00C1|\u00C2|\u00C3|\u00C4|\u00C5', 'g');
  public static readonly odd_rea = new RegExp('\u00E0|\u00E1|\u00E2|\u00E3|\u00E4|\u00E5', 'g');
  public static readonly odd_reE = new RegExp('\u00C8|\u00C9|\u00CA|\u00CB', 'g');
  public static readonly odd_ree = new RegExp('\u00E8|\u00E9|\u00EA|\u00EB', 'g');
  public static readonly odd_reI = new RegExp('\u00CC|\u00CD|\u00CE|\u00CF', 'g');
  public static readonly odd_rei = new RegExp('\u00EC|\u00ED|\u00EE|\u00EF', 'g');
  public static readonly odd_reO = new RegExp('\u00D2|\u00D3|\u00D4|\u00D5|\u00D6', 'g');
  public static readonly odd_reo = new RegExp('\u00F2|\u00F3|\u00F4|\u00F5|\u00F6', 'g');
  public static readonly odd_reU = new RegExp('\u00D9|\u00DA|\u00DB|\u00DC', 'g');
  public static readonly odd_reu = new RegExp('\u00F9|\u00FA|\u00FB|\u00FC', 'g');
  public static readonly odd_reN = new RegExp('\u00D1', 'g');
  public static readonly odd_ren = new RegExp('\u00F1', 'g');
  public static readonly odd_reC = new RegExp('\u00C7', 'g');
  public static readonly odd_rec = new RegExp('\u00E7', 'g');
  public static readonly odd_reOthers = new RegExp('[\u0080-\uFFFF]', 'g');

  public static normalize(s: string): string {
    s = s.replace(GPUtil.odd_reA, 'A');
    s = s.replace(GPUtil.odd_rea, 'a');
    s = s.replace(GPUtil.odd_reE, 'E');
    s = s.replace(GPUtil.odd_ree, 'e');
    s = s.replace(GPUtil.odd_reI, 'I');
    s = s.replace(GPUtil.odd_rei, 'i');
    s = s.replace(GPUtil.odd_reO, 'O');
    s = s.replace(GPUtil.odd_reo, 'o');
    s = s.replace(GPUtil.odd_reU, 'U');
    s = s.replace(GPUtil.odd_reu, 'u');
    s = s.replace(GPUtil.odd_reN, 'N');
    s = s.replace(GPUtil.odd_ren, 'n');
    s = s.replace(GPUtil.odd_reC, 'C');
    s = s.replace(GPUtil.odd_rec, 'c');
    s = s.replace(GPUtil.odd_reOthers, '');
    return s;
  }
  /* tslint:enable:variable-name */

  public static str2Date(str: string, fmt: string): Date {
    let fecha = null;
    if (str) {
      if (!fmt) {
        fmt = 'YYYY-MM-DD';
      }
      fecha = moment.parseZone(str, fmt).toDate();
    }
    return fecha;
  }

  public static str2DateString(str: string, fmt1: string, fmt2: string): string {
    let fecha = null;
    if (str) {
      fecha = moment.parseZone(str, fmt1).format(fmt2);
    }
    return fecha;
  }

  public static dateToYyyymmdd(date: Date): string {
    const shouldReturn = isNullOrUndefined(date) || (typeof date === 'string' && date === '');

    if (shouldReturn) {
      return null;
    }

    const y = '000' + date.getFullYear();
    const m = '0' + (date.getMonth() + 1);
    const d = '0' + date.getDate();

    return y.substr(y.length - 4) + '-' + m.substr(m.length - 2) + '-' + d.substr(d.length - 2);
  }

  // FIXME 17/12/2018 convertir con moment
  public static dateTohhmm(date: Date) {
    if (isNull(date)) {
      return null;
    }
    const h = '0' + date.getHours();
    const m = '0' + date.getMinutes();
    return h.substr(h.length - 2) + ':' + m.substr(m.length - 2);
  }

  public static letraDni(dni) {
    return 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(dni.substring(0, 8) % 23);
  }

  /* tslint:disable:ban-types */
  public static calculaDni(value): String {
    if (value.length >= 8) {
      const letraDni = this.letraDni(value);
      value = value.substring(0, 8) + letraDni;
    }
    return value;
  }
  /* tslint:enable:ban-types */

  public static booleanToString(input: boolean, trueValue?: string, falseValue?: string): string {
    if (input) {
      return !isNullOrUndefined(trueValue) ? trueValue : 'S';
    } else {
      return !isNullOrUndefined(falseValue) ? falseValue : 'N';
    }
  }

  public static obtainCalendarConfig(idioma: string = null): any {
    if (idioma) {
      let calendar: any = null;
      switch (idioma) {
        case 'es':
          calendar = CalendarConstants.calendar_es;
          break;
        case 'en':
          calendar = CalendarConstants.calendar_en;
          break;
        default:
          calendar = CalendarConstants.calendar_es;
          break;
      }
      return calendar;
    } else {
      return CalendarConstants.calendar_es;
    }
  }

  /* tslint:disable:variable-name */
  public static base64ToBlob(string: string): Blob {
    const byteCharacters = atob(string);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'application/pdf' });
  }
  /* tslint:enable:variable-name */

  /*METODOS NO ESTÁTICOS, PORQUE PUEDEN SER LLAMADOS DESDE UN TEMPLATE*/
  /**
   * Metodo para obtener la etiqueta de un selector a través de su valor
   * @param selector ''
   * @param valor ''
   */
  public obtenerEtiqueta(selector: SelectItem[], value: any): string {
    if (!isNull(selector) && !isNull(value)) {
      for (const item of selector) {
        if (item.value === value) {
          return item.label;
        }
      }
    }
    return null;
  }

  /**
   * @param datos - Array que contiene los datos que se utilizaran para montar el selector
   * @param atributoValor - Atributo que contiene el valor de los campos del selector
   * @param atributoDesc - Atributo que contiene los atributos que conforman
   *                       la etiqueta del selector
   * @param descripcionPorDefecto - Descripción que se pondrá en la primera opción del selector
   * @param separadorAtributosDesc - Separador que se utilizará para separar los
   *                                 atributos de la etiqueta del selector. Por defecto es '-'
   * @param adicional  - Identificador atributo posibles datos adicionales
   */
  public obtenerSelector(
    datos: any[],
    atributoValor: string,
    atributoDesc: string[],
    descripcionPorDefecto?: string,
    separadorAtributosDesc?: string,
    adicional?: string
  ): GPSelectItem[] {
    const selector: GPSelectItem[] = [];
    let separador = ' - ';
    if (separadorAtributosDesc) {
      separador = ' ' + separadorAtributosDesc + ' ';
    }
    if (descripcionPorDefecto) {
      selector.push({ label: descripcionPorDefecto, value: null, additional: null });
    }
    if (!isNull(datos)) {
      for (const dato of datos) {
        let label = '';
        for (const descripcion of atributoDesc) {
          if (label.length) {
            label += separador;
          }
          label += dato[descripcion];
        }
        selector.push({
          label,
          value: dato[atributoValor],
          additional: dato[adicional],
        });
      }
    }
    return selector;
  }

  public indexOf(list: any[], atributeName: string, value: any): number {
    if (list) {
      for (let index = 0; index < list.length; index++) {
        if (list[index][atributeName] === value) {
          return index;
        }
      }
    }
    return -1;
  }

  /**
   * Devuelve el elemento de la lista cuyo valor del atributo coincide con el indicado
   * @param list ''
   * @param atributeName ''
   * @param value ''
   */
  public getElementFromArray(list: any[], atributeName: string, value: any): any {
    if (list) {
      for (const item of list) {
        if (item[atributeName] === value) {
          return item;
        }
      }
    }
    return null;
  }

  public triBooleanToString(input: boolean, trueValue?: string, falseValue?: string): string {
    if (input === true) {
      if (!(trueValue === null || trueValue === undefined)) {
        return trueValue;
      } else {
        return 'S';
      }
    } else {
      if (input === false) {
        if (!(falseValue === null || falseValue === undefined)) {
          return falseValue;
        } else {
          return 'N';
        }
      } else {
        return null;
      }
    }
  }

  public stringToBoolean(
    input: string,
    trueValue: string = 'S',
    falseValue: string = 'N'
  ): boolean {
    if (trueValue === input) {
      return true;
    } else {
      if (falseValue === input) {
        return false;
      } else {
        return false;
      }
    }
  }

  public obtainCalendarYearRange(offset = 0): string {
    const year = new Date().getFullYear() + offset;
    return '1900:' + year;
  }

  /**
   * meter en gpUtil
   * Metodo para rellenar el menu item dinámicamente a partir de un array de tipo
   * @param datos ''
   * @param atributoCod nombre del atributo que continene el id/cod
   * @param atributoDesc nombre del atributo que continene la descripción
   */
  public cargarMenuItem(
    datos: any[],
    atributoCod: string,
    atributoDesc: string,
    hasChilds: boolean
  ): any[] {
    const itemsMenu = [];
    let items = [];
    if (!hasChilds) {
      items = null;
    }
    if (!isNull(datos)) {
      for (const dato of datos) {
        const newItem = {
          title: dato[atributoCod],
          label: dato[atributoDesc],
          items,
        };
        itemsMenu.push(newItem);
      }
    }
    return itemsMenu;
  }

  /**
   * Metodo para actualizar el menu item dinamicametne conforme se ha seleccionado el padre(codig)
   */
  public cargarMenuItemDesdePadre(
    codigoItemPadre: string,
    itemsMenu: MenuItem[],
    datos: any[],
    atributoCod: string,
    atributoDesc: string,
    hasChilds: boolean
  ): any[] {
    for (const itemPadre of itemsMenu) {
      /*seleccionamos el item sobre el que actualizar su array
       *de items a traves del codigoSeleccionado
       */
      if (itemPadre.title === codigoItemPadre) {
        // actualizamos el array de items
        itemPadre.items = this.cargarMenuItem(datos, atributoCod, atributoDesc, hasChilds);
      }
    }
    return itemsMenu;
  }

  public limpiaSaltosLinea(s: string): string {
    if (!s) {
      return s;
    } else {
      return s.replace(/[\r\n]/g, '');
    }
  }

  public getUserId(): string {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    return isNullOrUndefined(userInfo) ? null : userInfo.userId;
  }

  public calculaEdad(birthday: Date): number {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}

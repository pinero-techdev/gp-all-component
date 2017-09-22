import {SelectItem} from "primeng/primeng";

export class GPUtil {
    public static readonly odd_reA = new RegExp( "\u00C0|\u00C1|\u00C2|\u00C3|\u00C4|\u00C5", "g" );
    public static readonly odd_rea = new RegExp( "\u00E0|\u00E1|\u00E2|\u00E3|\u00E4|\u00E5", "g" );
    public static readonly odd_reE = new RegExp( "\u00C8|\u00C9|\u00CA|\u00CB", "g" );
    public static readonly odd_ree = new RegExp( "\u00E8|\u00E9|\u00EA|\u00EB", "g" );
    public static readonly odd_reI = new RegExp( "\u00CC|\u00CD|\u00CE|\u00CF", "g" );
    public static readonly odd_rei = new RegExp( "\u00EC|\u00ED|\u00EE|\u00EF", "g" );
    public static readonly odd_reO = new RegExp( "\u00D2|\u00D3|\u00D4|\u00D5|\u00D6", "g" );
    public static readonly odd_reo = new RegExp( "\u00F2|\u00F3|\u00F4|\u00F5|\u00F6", "g" );
    public static readonly odd_reU = new RegExp( "\u00D9|\u00DA|\u00DB|\u00DC", "g" );
    public static readonly odd_reu = new RegExp( "\u00F9|\u00FA|\u00FB|\u00FC", "g" );
    public static readonly odd_reN = new RegExp( "\u00D1", "g" );
    public static readonly odd_ren = new RegExp( "\u00F1", "g" );
    public static readonly odd_reC = new RegExp( "\u00C7", "g" );
    public static readonly odd_rec = new RegExp( "\u00E7", "g" );
    public static readonly odd_reOthers = new RegExp( "[\u0080-\uFFFF]", "g" );

    public static normaliza(s:string):string {
        s = s.replace(GPUtil.odd_reA, "A");
        s = s.replace(GPUtil.odd_rea, "a");
        s = s.replace(GPUtil.odd_reE, "E");
        s = s.replace(GPUtil.odd_ree, "e");
        s = s.replace(GPUtil.odd_reI, "I");
        s = s.replace(GPUtil.odd_rei, "i");
        s = s.replace(GPUtil.odd_reO, "O");
        s = s.replace(GPUtil.odd_reo, "o");
        s = s.replace(GPUtil.odd_reU, "U");
        s = s.replace(GPUtil.odd_reu, "u");
        s = s.replace(GPUtil.odd_reN, "N");
        s = s.replace(GPUtil.odd_ren, "n");
        s = s.replace(GPUtil.odd_reC, "C");
        s = s.replace(GPUtil.odd_rec, "c");
        s = s.replace(GPUtil.odd_reOthers, "");
        return s;
    }

    public static dateToYyyymmdd(dt:Date, possibleFormat:string):string {
        if (dt == null) {
            return null;
        }
        if ("string" == typeof dt) {
            // TODO Error en p-calendar. Viene segun el formato del control.
            let s = "" + dt; // Convierte en string, aunque no hace falta.
            if (s == '') {
                return null;
            }
            if (possibleFormat == "dd/mm/yyyy" || possibleFormat == "dd/mm/yy") {
                return s.substr(6, 4) + "-" + s.substr(3, 2) + "-" + s.substr(0, 2);
            }
            throw "Invalid format '" + possibleFormat + "'";
        }
        let y = "000" + dt.getFullYear();
        let m = "0" + ( dt.getMonth() + 1 );
        let d = "0" + dt.getDate();
        return y.substr(y.length - 4) + "-" + m.substr(m.length - 2) + "-" + d.substr(d.length - 2);
    }

    public static yyyymmddToDate(s:string):Date {
        if (s == null || s == "") {
            return null;
        }
        let y = parseInt(s.substr(0, 4));
        let m = parseInt(s.substr(5, 7));
        let d = parseInt(s.substr(8, 10));
        let dt = new Date();
        dt.setTime(0);
        dt.setFullYear(y, m - 1, d);
        return dt;
    }

    public static yyyymmddToDateFormat(yyyymmdd:string, format:string):string {
        if (yyyymmdd == null || yyyymmdd == "") {
            return null;
        }

        let y = yyyymmdd.substr(0, 4);
        let m = yyyymmdd.substr(5, 2);
        let d = yyyymmdd.substr(8, 2);

        if (format == 'dd/mm/yy' || format == 'dd/mm/yyyy') {
            return d + "/" + m + "/" + y;
        }

        throw "Formato de fecha invalido '" + format + "'";
    }

    public static dateFormatToYyyymmdd(dt:string, format:string):string {
        if (dt == null || dt == "") {
            return null;
        }

        if (format == 'dd/mm/yy' || format == 'dd/mm/yyyy') {
            let d = dt.substr(0, 2);
            let m = dt.substr(3, 2);
            let y = dt.substr(6);
            if (y.length == 2) {
                y = ("" + (new Date()).getFullYear()).substr(0, 2);
            }
            return y + "-" + m + "-" + d;
        }

        throw "Formato de fecha invalido '" + format + "'";
    }

    public static hhmmToDate(time:string, format:string):Date {

        let date = new Date();
        if (time == null || time == '') {
            return null;
        }

        console.log("formato: " + format);
        if (format == 'hh:mm') {

            let h = parseInt(time.substr(0, 2));
            let m = parseInt(time.substr(3, 2));

            if (h > 23 && m > 59) {
                throw "Formato de tiempo no válido. Se utiliza el formato de 24h: '" + "'";
            } else {
                date.setHours(h, m);
                return date;
            }
        }

        throw  "Formato de hora invalido '" + "'";
    }

    public static dateTohhmm(date:Date, timeFormat:string) {
        if (date == null) {
            return null;
        }
        console.log("timeFormat: " + timeFormat);
        if (timeFormat == 'hh:mm') {
            let h = '0' + date.getHours();
            let m = '0' + date.getMinutes();

            return h.substr(h.length - 2) + ':' + m.substr(m.length - 2);

        }

        throw "Formato de hora invalido '" + "'";
    }

    /*METODOS NO ESTÁTICOS, PORQUE PUEDEN SER LLAMADOS DESDE UN TEMPLATE*/

    /**
     * Metodo para obtener la etiqueta de un selector a través de su valor
     * @param selector
     * @param valor
     * @return {any}
     */
    public obtenerEtiqueta(selector:SelectItem[], valor:any):string {
        let etiqueta = null;
        if (selector != null && valor != null) {
            for (let item of selector) {
                if (item.value == valor) {
                    return item.label;
                }
            }
        }
        return etiqueta;
    }

    /**
     * @param datos - Array que contiene los datos que se utilizaran para montar el selector
     * @param atributoValor - Atributo que contiene el valor de los campos del selector
     * @param atributoDesc - Atributo que contiene los atributos que conforman la etiqueta del selector
     * @param descripcionPorDefecto - Descripción que se pondrá en la primera opción del selector
     * @param separadorAtributosDesc - Separador que se utilizará para separar los atributos de la etiqueta del selector. Por defecto es '-'
     * @return {SelectItem[]}
     */
    public obtenerSelector(datos:any[], atributoValor:string, atributoDesc:string[], descripcionPorDefecto?:string, separadorAtributosDesc?:string):SelectItem[] {

        let selector:SelectItem[] = [];
        let separador = ' - ';
        if (separadorAtributosDesc) {
            separador = ' ' + separadorAtributosDesc + ' ';
        }
        if (descripcionPorDefecto) {
            selector.push({label: descripcionPorDefecto, value: null});
        }
        if (datos != null) {
            for (let dato of datos) {
                let label = '';
                for (let descripcion of atributoDesc) {
                    if (label.length != 0) {
                        label += separador;
                    }
                    label += dato[descripcion];
                }
                selector.push({label: label, value: dato[atributoValor]});
            }
        }
        return selector;
    }

    public indexOf(list: any[], atributeName: string, value: any): number {

        if (list) {
            for (let index = 0; index < list.length; index++) {
                if ( list[index][atributeName] == value ) {
                    return index;
                }
            }
        }
        return -1;
    }

    public static letraDni(dni) {
        return "TRWAGMYFPDXBNJZSQVHLCKE".charAt(dni.substring(0,8) % 23);
    }

    public booleanToString(input: boolean, trueValue: string = "S", falseValue: string = "N") {
        if(input) {
            return trueValue;
        } else{
            return falseValue;
        }
    }

    public static obtainCalendarConfig(): any {
        return {
            closeText: "Cerrar",
            prevText: "<Ant",
            nextText: "Sig>",
            currentText: "Hoy",
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun",
                "jul", "ago", "sep", "oct", "nov", "dic"],
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            weekHeader: "Sm",
            defaultDate: new Date(),
            firstDayOfWeek: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
    }
}

"use strict";
var GPUtil = (function () {
    function GPUtil() {
    }
    GPUtil.normaliza = function (s) {
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
    };
    GPUtil.dateToYyyymmdd = function (dt, possibleFormat) {
        if (dt == null) {
            return null;
        }
        if ("string" == typeof dt) {
            // TODO Error en p-calendar. Viene segun el formato del control.
            var s = "" + dt; // Convierte en string, aunque no hace falta.
            if (s == '') {
                return null;
            }
            if (possibleFormat == "dd/mm/yyyy" || possibleFormat == "dd/mm/yy") {
                return s.substr(6, 4) + "-" + s.substr(3, 2) + "-" + s.substr(0, 2);
            }
            throw "Invalid format '" + possibleFormat + "'";
        }
        var y = "000" + dt.getFullYear();
        var m = "0" + (dt.getMonth() + 1);
        var d = "0" + dt.getDate();
        return y.substr(y.length - 4) + "-" + m.substr(m.length - 2) + "-" + d.substr(d.length - 2);
    };
    GPUtil.yyyymmddToDate = function (s) {
        if (s == null || s == "") {
            return null;
        }
        var y = parseInt(s.substr(0, 4));
        var m = parseInt(s.substr(5, 7));
        var d = parseInt(s.substr(8, 10));
        var dt = new Date();
        dt.setTime(0);
        dt.setFullYear(y, m - 1, d);
        return dt;
    };
    GPUtil.yyyymmddToDateFormat = function (yyyymmdd, format) {
        if (yyyymmdd == null || yyyymmdd == "") {
            return null;
        }
        var y = yyyymmdd.substr(0, 4);
        var m = yyyymmdd.substr(5, 2);
        var d = yyyymmdd.substr(8, 2);
        if (format == 'dd/mm/yy' || format == 'dd/mm/yyyy') {
            return d + "/" + m + "/" + y;
        }
        throw "Formato de fecha invalido '" + format + "'";
    };
    GPUtil.dateFormatToYyyymmdd = function (dt, format) {
        if (dt == null || dt == "") {
            return null;
        }
        if (format == 'dd/mm/yy' || format == 'dd/mm/yyyy') {
            var d = dt.substr(0, 2);
            var m = dt.substr(3, 2);
            var y = dt.substr(6);
            if (y.length == 2) {
                y = ("" + (new Date()).getFullYear()).substr(0, 2);
            }
            return y + "-" + m + "-" + d;
        }
        throw "Formato de fecha invalido '" + format + "'";
    };
    GPUtil.hhmmToDate = function (time, format) {
        var date = new Date();
        if (time == null || time == '') {
            return null;
        }
        console.log("formato: " + format);
        if (format == 'hh:mm') {
            var h = parseInt(time.substr(0, 2));
            var m = parseInt(time.substr(3, 2));
            if (h > 23 && m > 59) {
                throw "Formato de tiempo no válido. Se utiliza el formato de 24h: '" + "'";
            }
            else {
                date.setHours(h, m);
                return date;
            }
        }
        throw "Formato de hora invalido '" + "'";
    };
    GPUtil.dateTohhmm = function (date, timeFormat) {
        if (date == null) {
            return null;
        }
        console.log("timeFormat: " + timeFormat);
        if (timeFormat == 'hh:mm') {
            var h = '0' + date.getHours();
            var m = '0' + date.getMinutes();
            return h.substr(h.length - 2) + ':' + m.substr(m.length - 2);
        }
        throw "Formato de hora invalido '" + "'";
    };
    GPUtil.prototype.obtenerEtiqueta = function (selector, valor) {
        var etiqueta = null;
        if (selector != null && valor != null) {
            for (var _i = 0, selector_1 = selector; _i < selector_1.length; _i++) {
                var item = selector_1[_i];
                if (item.value == valor) {
                    return item.label;
                }
            }
        }
        return etiqueta;
    };
    /**
     * @param datos - Array que contiene los datos que se utilizaran para montar el selector
     * @param atributoValor - Atributo que contiene el valor de los campos del selector
     * @param atributoDesc - Atributo que contiene los atributos que conforman la etiqueta del selector
     * @param descripcionPorDefecto - Descripción que se pondrá en la primera opción del selector
     * @param separadorAtributosDesc - Separador que se utilizará para separar los atributos de la etiqueta del selector. Por defecto es '-'
     * @return {SelectItem[]}
     */
    GPUtil.prototype.obtenerSelector = function (datos, atributoValor, atributoDesc, descripcionPorDefecto, separadorAtributosDesc) {
        var selector = [];
        var separador = ' - ';
        if (separadorAtributosDesc) {
            separador = ' ' + separadorAtributosDesc + ' ';
        }
        if (descripcionPorDefecto) {
            selector.push({ label: descripcionPorDefecto, value: null });
        }
        if (datos != null) {
            for (var _i = 0, datos_1 = datos; _i < datos_1.length; _i++) {
                var dato = datos_1[_i];
                var label = '';
                for (var _a = 0, atributoDesc_1 = atributoDesc; _a < atributoDesc_1.length; _a++) {
                    var descripcion = atributoDesc_1[_a];
                    if (label.length != 0) {
                        label += separador;
                    }
                    label += dato[descripcion];
                }
                selector.push({ label: label, value: dato[atributoValor] });
            }
        }
        return selector;
    };
    GPUtil.readonly = odd_reA = new RegExp("\u00C0|\u00C1|\u00C2|\u00C3|\u00C4|\u00C5", "g");
    GPUtil.readonly = odd_rea = new RegExp("\u00E0|\u00E1|\u00E2|\u00E3|\u00E4|\u00E5", "g");
    GPUtil.readonly = odd_reE = new RegExp("\u00C8|\u00C9|\u00CA|\u00CB", "g");
    GPUtil.readonly = odd_ree = new RegExp("\u00E8|\u00E9|\u00EA|\u00EB", "g");
    GPUtil.readonly = odd_reI = new RegExp("\u00CC|\u00CD|\u00CE|\u00CF", "g");
    GPUtil.readonly = odd_rei = new RegExp("\u00EC|\u00ED|\u00EE|\u00EF", "g");
    GPUtil.readonly = odd_reO = new RegExp("\u00D2|\u00D3|\u00D4|\u00D5|\u00D6", "g");
    GPUtil.readonly = odd_reo = new RegExp("\u00F2|\u00F3|\u00F4|\u00F5|\u00F6", "g");
    GPUtil.readonly = odd_reU = new RegExp("\u00D9|\u00DA|\u00DB|\u00DC", "g");
    GPUtil.readonly = odd_reu = new RegExp("\u00F9|\u00FA|\u00FB|\u00FC", "g");
    GPUtil.readonly = odd_reN = new RegExp("\u00D1", "g");
    GPUtil.readonly = odd_ren = new RegExp("\u00F1", "g");
    GPUtil.readonly = odd_reC = new RegExp("\u00C7", "g");
    GPUtil.readonly = odd_rec = new RegExp("\u00E7", "g");
    GPUtil.readonly = odd_reOthers = new RegExp("[\u0080-\uFFFF]", "g");
    return GPUtil;
}());
exports.GPUtil = GPUtil;
//# sourceMappingURL=gpUtil.js.map
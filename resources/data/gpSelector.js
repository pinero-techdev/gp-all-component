"use strict";
var GPSelector = (function () {
    /**
     * constructor del Selector
     * @param multiSelect - indica si la selección es de un único valor o de varios
     */
    function GPSelector(isMultiSelect) {
        this.isMultiSelect = isMultiSelect;
        /**
         * Opciones del options
         * @type {Array}
         */
        this.options = [];
        if (isMultiSelect) {
            this.selection = [];
        }
        else {
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
     */
    GPSelector.prototype.cargarDatos = function (datos, atributoValor, atributoDesc, descripcionPorDefecto, separadorAtributosDesc, autoSeleccion) {
        this.options = [];
        var separador = ' - ';
        if (separadorAtributosDesc) {
            separador = ' ' + separadorAtributosDesc + ' ';
        }
        if (descripcionPorDefecto && (datos.length > 1 || !autoSeleccion)) {
            this.options.push({ label: descripcionPorDefecto, value: null });
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
                this.options.push({ label: label, value: dato[atributoValor] });
            }
            if (autoSeleccion && datos.length == 1) {
                this.selection = this.isMultiSelect ? [this.options[0].value] : this.options[0].value;
            }
        }
    };
    return GPSelector;
}());
exports.GPSelector = GPSelector;
//# sourceMappingURL=gpSelector.js.map
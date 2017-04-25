"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var primeng_1 = require("primeng/primeng");
var forms_1 = require("@angular/forms");
var noop_1 = require("rxjs/util/noop");
exports.CUSTOM_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return GpAppMultiSelectComponent; }),
    multi: true
};
var GpAppMultiSelectComponent = (function () {
    function GpAppMultiSelectComponent() {
        /**
         * Texto que se mostrará junto con el número de elementos seleccionados
         * @type {string}
         */
        this.selectionLabel = "Opciones seleccionadas";
        /* PROPIEDADES DE MULTISELECT */
        this.options = null;
        this.disabled = false;
        this.defaultLabel = 'Elige una opción';
        this.style = null;
        this.styleClass = null;
        this.scrollHeight = '200px';
        this.overlayVisible = false;
        this.tabindex = null;
        //modelo de datos interno necesario para el ngModel
        this.innerValue = '';
        //Placeholders for the callbacks which are later providesd
        //by the Control Value Accessor
        this.onTouchedCallback = noop_1.noop;
        this.onChangeCallback = noop_1.noop;
    }
    Object.defineProperty(GpAppMultiSelectComponent.prototype, "valor", {
        //get accessor
        get: function () {
            return this.innerValue;
        },
        //set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    //Set touched on blur
    GpAppMultiSelectComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    //From ControlValueAccessor interface
    GpAppMultiSelectComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    GpAppMultiSelectComponent.prototype.onChangeMultiselect = function () {
        var label;
        var selectionLabel = this.selectionLabel;
        this.multi.updateLabel = function () {
            if (this.value != null && this.value.length > 0) {
                label = this.value.length.toString() + ' ' + selectionLabel;
                this.valuesAsString = label;
            }
            else {
                label = this.defaultLabel;
                this.valuesAsString = label;
            }
        };
    };
    //From ControlValueAccessor interface
    GpAppMultiSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeMultiselect();
        this.onChangeCallback = fn;
    };
    //From ControlValueAccessor interface
    GpAppMultiSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    __decorate([
        core_1.Input()
    ], GpAppMultiSelectComponent.prototype, "selectionLabel");
    __decorate([
        core_1.Input()
    ], GpAppMultiSelectComponent.prototype, "options");
    __decorate([
        core_1.Input()
    ], GpAppMultiSelectComponent.prototype, "disabled");
    __decorate([
        core_1.Input()
    ], GpAppMultiSelectComponent.prototype, "defaultLabel");
    __decorate([
        core_1.Input()
    ], GpAppMultiSelectComponent.prototype, "appendTo");
    __decorate([
        core_1.Input()
    ], GpAppMultiSelectComponent.prototype, "style");
    __decorate([
        core_1.Input()
    ], GpAppMultiSelectComponent.prototype, "styleClass");
    __decorate([
        core_1.Input()
    ], GpAppMultiSelectComponent.prototype, "scrollHeight");
    __decorate([
        core_1.Input()
    ], GpAppMultiSelectComponent.prototype, "overlayVisible");
    __decorate([
        core_1.Input()
    ], GpAppMultiSelectComponent.prototype, "tabindex");
    __decorate([
        core_1.ViewChild(primeng_1.MultiSelect)
    ], GpAppMultiSelectComponent.prototype, "multi");
    GpAppMultiSelectComponent = __decorate([
        core_1.Component({
            selector: 'gp-app-multiselect',
            templateUrl: './gp.app.multi-select.component.html',
            providers: [exports.CUSTOM_CONTROL_VALUE_ACCESSOR]
        })
    ], GpAppMultiSelectComponent);
    return GpAppMultiSelectComponent;
}());
exports.GpAppMultiSelectComponent = GpAppMultiSelectComponent;
//# sourceMappingURL=gp.app.multi-select.component.js.map
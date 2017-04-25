"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/**
 * Clase que implementa un item/servicio del menu de servicios
 */
var MenuItem = (function () {
    function MenuItem(id, texto, description, icon, action, submenus, enabled) {
        //Propiedad que nos devuelve un evento con el id del item sobre el que se ha clickado
        this.clicked = new core_1.EventEmitter();
        this.id = id;
        this.texto = texto;
        this.description = description;
        this.icon = icon;
        this.action = action;
        this.submenus = submenus;
        this.enabled = enabled;
        this._selected = false;
    }
    Object.defineProperty(MenuItem.prototype, "selected", {
        /**
         * Getter de la propiedad _selected
         * @returns {boolean}
         */
        get: function () {
            return this._selected;
        },
        /**
         * Setter para la propiedad _selected
         * Cambia los valores de visualización del elemento
         * @param selected
         */
        set: function (selected) {
            this._selected = selected;
            if (this._selected) {
                this.linkClass = "menulink ripplelink cursor active-menu";
                this.parentClass = "active-menu-parent";
                this.activeMenu = "active-menu";
            }
            else {
                this.linkClass = "menulink ripplelink cursor";
                this.activeMenu = "";
                this.parentClass = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inicializacion del elemento
     */
    MenuItem.prototype.ngOnInit = function () {
        if (this._selected) {
            this.linkClass = "menulink ripplelink active-menu";
            this.parentClass = "active-menu-parent";
            this.activeMenu = "active-menu";
        }
        else {
            this.linkClass = "menulink ripplelink";
            this.activeMenu = "";
            this.parentClass = null;
        }
    };
    /**
     * En caso que se haya clickado en el elemento y la sesión se encuentre activa, avisamos al padre con el id del item
     * para que pueda saber sobre quien se ha clickado
     * Si la sesión ha caducado, redirigimos al menú de Login
     */
    MenuItem.prototype.doSelection = function () {
        this.clicked.emit(this.id);
    };
    /**
     * Si se ha clicado sobre un item hijo, deseleccionamos los demás items
     * y procedemos a seleccionarlo/deseleccionarlo
     * @param childId
     */
    MenuItem.prototype.unselectChildren = function (childId) {
        for (var index = 0; index < this.submenus.length; index++) {
            if (this.submenus[index].selected && this.submenus[index].id != childId) {
                this.submenus[index].selected = false;
            }
            else if (this.submenus[index].id == childId) {
                this.submenus[index].selected = !this.submenus[index].selected;
            }
        }
    };
    __decorate([
        core_1.Input()
    ], MenuItem.prototype, "id");
    __decorate([
        core_1.Input()
    ], MenuItem.prototype, "texto");
    __decorate([
        core_1.Input()
    ], MenuItem.prototype, "description");
    __decorate([
        core_1.Input()
    ], MenuItem.prototype, "icon");
    __decorate([
        core_1.Input()
    ], MenuItem.prototype, "action");
    __decorate([
        core_1.Input()
    ], MenuItem.prototype, "submenus");
    __decorate([
        core_1.Input()
    ], MenuItem.prototype, "enabled");
    __decorate([
        core_1.Output()
    ], MenuItem.prototype, "clicked");
    __decorate([
        core_1.Input()
    ], MenuItem.prototype, "selected");
    return MenuItem;
}());
exports.MenuItem = MenuItem;
//# sourceMappingURL=menuItem.js.map
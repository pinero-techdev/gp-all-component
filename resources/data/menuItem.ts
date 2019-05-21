import { Input, Output, EventEmitter } from '@angular/core';

/**
 * Clase que implementa un item/servicio del menu de servicios
 */
export class MenuItem {
  
  /**
   *  Propiedades para mostrar/esconder los menuItems
   */
  linkClass: String;
  parentClass: String;
  activeMenu: String;

  @Input() id: String;
  @Input() texto: String;
  @Input() description: String;
  @Input() icon: String;
  @Input() action: String;
  @Input() submenus: MenuItem[];
  @Input() enabled: boolean;

  //Propiedad que nos devuelve un evento con el id del item sobre el que se ha clickado
  @Output() clicked: EventEmitter<String> = new EventEmitter<String>();

  // hacemos un getter y un setter, para tener controlado cuando cambia de valor
  private _selected: boolean;

  constructor(id: string, texto: string, description: string, icon: string, action: string, submenus: MenuItem[], enabled: boolean) {
    this.id = id;
    this.texto = texto;
    this.description = description;
    this.icon = icon;
    this.action = action;
    this.submenus = submenus;
    this.enabled = enabled;
    this._selected = false;
  }

  /**
   * Setter para la propiedad _selected
   * Cambia los valores de visualización del elemento
   * @param selected
   */
  @Input()
  set selected(selected: boolean) {
    this._selected = selected;

    if (this._selected) {
      this.linkClass = 'menulink ripplelink cursor active-menu';
      this.parentClass = 'active-menu-parent';
      this.activeMenu = 'active-menu';
    } else {
      this.linkClass = 'menulink ripplelink cursor';
      this.activeMenu = '';
      this.parentClass = null;
    }
  }

  /**
   * Getter de la propiedad _selected
   * @returns {boolean}
   */
  get selected() {
    return this._selected;
  }

  /**
   * Inicializacion del elemento
   */
  ngOnInit() {
    if (this._selected) {
      this.linkClass = 'menulink ripplelink active-menu';
      this.parentClass = 'active-menu-parent';
      this.activeMenu = 'active-menu';
    } else {
      this.linkClass = 'menulink ripplelink';
      this.activeMenu = '';
      this.parentClass = null;
    }
  }

  /**
   * En caso que se haya clickado en el elemento y la sesión se encuentre activa, avisamos al padre con el id del item
   * para que pueda saber sobre quien se ha clickado
   * Si la sesión ha caducado, redirigimos al menú de Login
   */
  doSelection() {
    this.clicked.emit(this.id);
  }

  /**
   * Si se ha clicado sobre un item hijo, deseleccionamos los demás items
   * y procedemos a seleccionarlo/deseleccionarlo
   * @param childId
   */
  unselectChildren(childId: String) {
    for (let index = 0; index < this.submenus.length; index++) {
      if (this.submenus[index].selected && this.submenus[index].id != childId) {
        this.submenus[index].selected = false;
      } else if (this.submenus[index].id == childId) {
        this.submenus[index].selected = !this.submenus[index].selected;
      }
    }
  }
}

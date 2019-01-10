/*import {CommonRq} from "../../services/common.service";

export class MenuRq extends CommonRq {
    sessionId: string;
    params: Param[];

    /**
     * Constructor de la petición de menu
     * @param usuario
     * @param password
     * @param hotel
     */
/*
    constructor(sessionId: string, params?: Param[]) {
        super();
        this.sessionId = sessionId;
        this.params = params;
    }
}

export class Param {
    key: String;
    val: String;


    constructor(key: String, val: String) {
        this.key = key;
        this.val = val;
    }
}
*/
export class MenuRq {
  usuario: String;
  aplicacion: String;
  hotel: String;

  /**
   * Constructor de la petición de menu
   * @param usuario
   * @param password
   * @param hotel
   */
  constructor(usuario: String, aplicacion: String, hotel?: String) {
    this.usuario = usuario;
    this.aplicacion = aplicacion;
    this.hotel = hotel;
  }
}

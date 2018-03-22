export class MenuRq {
    usuario: String;
    aplicacion: String;
    params: Param[];

    /**
     * Constructor de la petición de menu
     * @param usuario
     * @param password
     * @param hotel
     */
    constructor(usuario: String, aplicacion: String, params?: Param[]) {
        this.usuario = usuario;
        this.aplicacion = aplicacion;
        this.params = params;
    }
}

export class Param {
    key: String;
    value: String;


    constructor(key: String, value: String) {
        this.key = key;
        this.value = value;
    }
}

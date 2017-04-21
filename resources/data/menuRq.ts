export class MenuRq {
    usuario: String;
    aplicacion: String;

    /**
     * Constructor de la petición de menu
     * @param usuario
     * @param password
     */
    constructor(usuario: String, aplicacion: String) {
        this.usuario = usuario;
        this.aplicacion = aplicacion;
    }
}

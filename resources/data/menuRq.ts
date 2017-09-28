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

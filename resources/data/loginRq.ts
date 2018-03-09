export class LoginRq {
    usuario: String;
    password: String;
    aplicacion: String;
    bd: String;

    /**
     * Constructor de la petición de login
     * 
     * @param usuario 
     * @param password 
     * @param aplicacion 
     * @param bd 
     */
    constructor(usuario: String, password: String, aplicacion?: String, bd?: String) {
        this.usuario = usuario;
        this.password = password;
        this.aplicacion = aplicacion;
        this.bd = bd;
    }
}

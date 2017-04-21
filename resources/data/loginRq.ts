export class LoginRq {
    usuario: String;
    password: String;

    /**
     * Constructor de la petición de login
     * @param usuario
     * @param password
     */
    constructor(usuario: String, password: String) {
        this.usuario = usuario;
        this.password = password;
    }
}

"use strict";
var LoginRq = (function () {
    /**
     * Constructor de la petición de login
     * @param usuario
     * @param password
     */
    function LoginRq(usuario, password) {
        this.usuario = usuario;
        this.password = password;
    }
    return LoginRq;
}());
exports.LoginRq = LoginRq;
//# sourceMappingURL=loginRq.js.map
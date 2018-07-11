export class LoginRq {
    usuario: string;
    password: string;
	aplicacion: string;
	params: LoginRqParam[];
	
    /**
     * Constructor de la petición de login
     * @param usuario
     * @param password
     */
    constructor(usuario: string, password: string, aplicacion?: string, params?: LoginRqParam[] ) {
        this.usuario = usuario;
        this.password = password;
		if( aplicacion )
		{
			this.aplicacion = aplicacion;
		}
		if( params )
		{
			this.params = params;
		}
    }
}

export class LoginRqParam {
	key: string;
	val: string;
}
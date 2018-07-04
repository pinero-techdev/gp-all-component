export class LoginRq {
    usuario: string;
    password: string;
	aplicacion: string;
	params: LoginRqParam[];
	otherparams: string;
	
    /**
     * Constructor de la petición de login
     * @param usuario
     * @param password
     */
    constructor(usuario: string, password: string, aplicacion?: string, params?: LoginRqParam[], otherparams?: string ) {
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
		if ( otherparams )
		{
			this.otherparams = otherparams;
		}
    }
}

export class LoginRqParam {
	key: string;
	val: string;
}
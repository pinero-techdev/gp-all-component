import {Injectable} from "@angular/core";
import {LoginRqParam} from "../resources/data/loginRq";
import {Param} from "../resources/data/menuRq";
import {RolInfo} from "../resources/data/rolInfo";
import {UserInfo} from "../resources/data/userInfo";

@Injectable()
export class GlobalService {
    private static baseUrl:string;
    private static loginServiceUrl:string;
    private static menuServiceUrl:string;
    private static app:string;
    private static ip:string;
    private static params: Param[] = [];
    private static sessionId:string;
	private static aplicacionLogin:string;
	private static paramsLogin:LoginRqParam[];
	
    public kiosk:boolean;
    public logged:boolean;
    public session:UserInfo;
    public applicationTitle:string;
    public roles: RolInfo[];
    public language:string;

    public preLoginUrl:string;

    constuctor() {
        console.log("CREANDO GlobalService.");
    }

    public static setBaseUrl(newUrl:string) {
        this.baseUrl = newUrl;
    }

    public static get BASE_URL():string {
        return GlobalService.baseUrl;
    }

    public static setLoginServiceUrl(newUrl:string) {
        this.loginServiceUrl = newUrl;
    }

	public static getAplicacionLogin():string {
		return this.aplicacionLogin;
	}
	
	public static setAplicacionLogin(aplicacionLogin:string) {
		this.aplicacionLogin = aplicacionLogin;
	}
	
	public static getParamsLogin(): LoginRqParam[] {
		return this.paramsLogin;
	}
	
	public static setParamsLogin(paramsLogin:LoginRqParam[]) {
		this.paramsLogin = paramsLogin;
	}

    public static get LOGIN_SERVICE_URL():string {
        return GlobalService.loginServiceUrl;
    }

    public static setMenuServiceUrl(newUrl:string) {
        this.menuServiceUrl = newUrl;
    }

    public static get MENU_SERVICE_URL():string {
        return GlobalService.menuServiceUrl;
    }

    public static setApp(newApp:string) {
        this.app = newApp;
    }

    public static get APP():string {
        return GlobalService.app;
    }

    public static setIp(ip: string) {
        this.ip = ip;
    }

    public static get Ip():string {
        return GlobalService.ip;
    }

    public static setParams(params: Param[]){
        this.params = params;
    }

    public static get Params(): Param[]{
        return GlobalService.params;
    }

    public static get SessionId(): string {
        if( !GlobalService.sessionId )
        {
            return "";
        }
        return GlobalService.sessionId;
    }

    public globalStatus():string {
        return "GlobalService( " + this.logged + ", " + JSON.stringify(this.session) + ")";
    }
}
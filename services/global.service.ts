import {Injectable} from "@angular/core";
import {UserInfo} from "../resources/data/userInfo";
import {RolInfo} from "../resources/data/rolInfo";
import {Param} from "../resources/data/menuRq";

@Injectable()
export class GlobalService {
    private static baseUrl:string;
    private static loginServiceUrl:string;
    private static menuServiceUrl:string;
    private static app:string;
    private static ip:string;
    private static params: Param[];
    public kiosk:boolean;
    public logged:boolean;
    public session:UserInfo;
    public applicationTitle:string;
    public roles: RolInfo[];
    public language:string;

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

    public globalStatus():string {
        return "GlobalService( " + this.logged + ", " + JSON.stringify(this.session) + ")";
    }
}
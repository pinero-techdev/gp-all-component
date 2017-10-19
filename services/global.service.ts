import {Injectable} from "@angular/core";
import {UserInfo} from "../resources/data/userInfo";
import {RolInfo} from "../resources/data/rolInfo";

@Injectable()
export class GlobalService {
    private static baseUrl:string;
    private static loginServiceUrl:string;
    private static menuServiceUrl:string;
    private static app:string;
    private static kiosk:boolean;
    public logged:boolean;
    public session:UserInfo;
    private static applicationTitle:string;
    public roles: RolInfo[];

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

    public static get KIOSK():boolean {
        return GlobalService.kiosk;
    }

    public static setKiosk(kiosk:boolean) {
        this.kiosk = kiosk;
    }

    public static setApplicationTitle(applicationTitle:string) {
        this.applicationTitle = applicationTitle;
    }

    public static get APPLICATION_TITLE():string {
        return GlobalService.applicationTitle;
    }

    public globalStatus():string {
        return "GlobalService( " + this.logged + ", " + JSON.stringify(this.session) + ")";
    }
}
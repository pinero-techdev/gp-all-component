import {Injectable} from "@angular/core";
import {UserInfo} from "../resources/data/userInfo";

@Injectable()
export class GlobalService {
    private static baseUrl: string;
    private static loginServiceUrl : string;
    private static menuServiceUrl : string;
    private static app: string;

    constuctor() {
        console.log("CREANDO GlobalService.");
    }

    public static setBaseUrl( newUrl : string )
    {
        this.baseUrl= newUrl;
    }
    public static get BASE_URL(): string { return GlobalService.baseUrl; }

    public static setMenuServiceUrl( newUrl : string )
    {
        this.menuServiceUrl = newUrl;
    }
    public static get MENU_SERVICE_URL(): string { return GlobalService.menuServiceUrl; }

    public static setLoginServiceUrl( newUrl : string )
    {
        this.loginServiceUrl = newUrl;
    }
    public static get LOGIN_SERVICE_URL(): string { return GlobalService.loginServiceUrl; }

    public static setApp( newApp: string)
    {
        this.app = newApp;
    }

    public static get APP(): string { return GlobalService.app; }

    public logged: boolean;
    public session: UserInfo;

    public applicationTitle: string;

    public globalStatus() : string {
        return "GlobalService( " + this.logged + ", " + JSON.stringify( this.session ) + ", " + this.applicationTitle + ")";
    }
}

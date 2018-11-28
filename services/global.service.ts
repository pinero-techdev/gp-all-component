import {Injectable} from "@angular/core";
import {LoginRqParam} from "../resources/data/loginRq";
import {Param} from "../resources/data/menuRq";
import {RolInfo} from "../resources/data/rolInfo";
import {UserInfo} from "../resources/data/userInfo";

@Injectable()
export class GlobalService {
    private static baseUrl: string;
    private static loginServiceUrl: string;
    private static menuServiceUrl: string;
    private static preLoginUrl: string;
    private static aplicacionLogin: string;
    private static paramsLogin: LoginRqParam[];

    private static app: string;
    private static ip: string;
    private static params: Param[] = [];
    private static session: UserInfo;
    private static sessionId: string;

    private static kiosk: boolean;
    private static logged: boolean;
    private static applicationTitle: string;
    private static roles: RolInfo[];
    private static language: string;

    private static _appHeaderInfo: string;

    public static get BASE_URL(): string {
        return this.baseUrl;
    }

    public static setBaseUrl(newUrl: string) {
        this.baseUrl = newUrl;
    }

    public static get LOGIN_SERVICE_URL(): string {
        return this.loginServiceUrl;
    }

    public static setLoginServiceUrl(newUrl: string) {
        this.loginServiceUrl = newUrl;
    }

    public static get MENU_SERVICE_URL(): string {
        return this.menuServiceUrl;
    }

    public static setMenuServiceUrl(newUrl: string) {
        this.menuServiceUrl = newUrl;
    }

    public static get PRE_LOGIN_URL(): string {
        return this.preLoginUrl;
    }

    public static setPreLoginUrl(preLoginUrl: string) {
        this.preLoginUrl = preLoginUrl;
    }

    public static get APLICACION_LOGIN(): string {
        return this.aplicacionLogin;
    }

    public static setAplicacionLogin(aplicacionLogin: string) {
        this.aplicacionLogin = aplicacionLogin;
    }

    public static get PARAMS_LOGIN(): LoginRqParam[] {
        return this.paramsLogin;
    }

    public static setParamsLogin(paramsLogin: LoginRqParam[]) {
        this.paramsLogin = paramsLogin;
    }

    public static setApp(newApp: string) {
        this.app = newApp;
    }

    public static get APP(): string {
        return this.app;
    }

    public static setIp(ip: string) {
        this.ip = ip;
    }

    public static get IP(): string {
        return this.ip;
    }

    public static setParams(params: Param[]) {
        this.params = params;
    }

    public static get PARAMS(): Param[] {
        return this.params;
    }

    public static setSession(session: UserInfo) {
        this.session = session;
    }

    public static get SESSION(): UserInfo {
        if (!this.session) {
            return null;
        }
        return this.session;
    }

    public static setSessionId(sessionId: string) {
        this.sessionId = sessionId;
    }

    public static get SESSION_ID(): string {
        if (!this.sessionId) {
            return "";
        }
        return this.sessionId;
    }

    public static setKiosk(kiosk: boolean) {
        this.kiosk = kiosk;
    }

    public static get KIOSK(): boolean {
        return this.kiosk;
    }

    public static setLogged(logged: boolean) {
        this.logged = logged;
    }

    public static get LOGGED(): boolean {
        return this.logged;
    }

    public static setApplicationTitle(applicationTitle: string) {
        this.applicationTitle = applicationTitle;
    }

    public static get APPLICATION_TITLE(): string {
        return this.applicationTitle;
    }

    public static setRoles(roles: RolInfo[]) {
        this.roles = roles;
    }

    public static get ROLES(): RolInfo[] {
        return this.roles;
    }

    public static setLanguage(language: string) {
        this.language = language;
    }

    public static get LANGUAGE(): string {
        return this.language;
    }

    public static getAppHeaderInfo(): string {
        return this._appHeaderInfo;
    }

    public static setAppHeaderInfo(value: string) {
        this._appHeaderInfo = value;
    }
}
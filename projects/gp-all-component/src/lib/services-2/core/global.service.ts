import { Param } from './../../resources/data/param.model';
import { Injectable } from '@angular/core';
import { GlobalSingletonService } from './global-singleton.service';
import { UserInfo } from './../../resources/data/user-info.model';
import { RolInfo } from './../../resources/data/rol-info.model';

@Injectable()
export class GlobalService {
    private static globalSingleton: GlobalSingletonService = new GlobalSingletonService();

    public static getBASE_URL(): string {
        return GlobalService.globalSingleton.baseUrl
            ? GlobalService.globalSingleton.baseUrl
            : '/bpguest-svc';
    }

    public static setBaseUrl(newUrl: string) {
      GlobalService.globalSingleton.baseUrl = newUrl;
    }

    public static getLOGIN_SERVICE_URL(): string {
        return GlobalService.globalSingleton.loginServiceUrl;
    }

    public static setLoginServiceUrl(newUrl: string) {
      GlobalService.globalSingleton.loginServiceUrl = newUrl;
    }

    public static getMENU_SERVICE_URL(): string {
        return GlobalService.globalSingleton.menuServiceUrl;
    }

    public static setMenuServiceUrl(newUrl: string) {
      GlobalService.globalSingleton.menuServiceUrl = newUrl;
    }

    public static getPRE_LOGIN_URL(): string {
        return GlobalService.globalSingleton.preLoginUrl;
    }

    public static setPreLoginUrl(preLoginUrl: string) {
        GlobalService.globalSingleton.preLoginUrl = preLoginUrl;
    }

    public static getAPLICACION_LOGIN(): string {
        return GlobalService.globalSingleton.aplicacionLogin;
    }

    public static setAplicacionLogin(aplicacionLogin: string) {
        GlobalService.globalSingleton.aplicacionLogin = aplicacionLogin;
    }

    public static getPARAMS_LOGIN(): Param[] {
        return GlobalService.globalSingleton.paramsLogin;
    }

    public static setParamsLogin(paramsLogin: Param[]) {
        GlobalService.globalSingleton.paramsLogin = paramsLogin;
    }

    public static setApp(newApp: string) {
        GlobalService.globalSingleton.app = newApp;
    }

    public static getAPP(): string {
        return GlobalService.globalSingleton.app;
    }

    public static setIp(ip: string) {
        GlobalService.globalSingleton.ip = ip;
    }

    public static getIP(): string {
        return GlobalService.globalSingleton.ip;
    }

    public static setParams(params: Param[]) {
        GlobalService.globalSingleton.params = params;
    }

    public static getPARAMS(): Param[] {
        return GlobalService.globalSingleton.params;
    }

    public static setSession(session: UserInfo) {
        GlobalService.globalSingleton.session = session;
    }

    public static getSESSION(): UserInfo {
        if (!GlobalService.globalSingleton.session) {
            return null;
        }
        return GlobalService.globalSingleton.session;
    }

    public static setSessionId(sessionId: string) {
        GlobalService.globalSingleton.sessionId = sessionId;
    }

    public static getSESSION_ID(): string {
        if (!GlobalService.globalSingleton.sessionId) {
            return '';
        }
        return GlobalService.globalSingleton.sessionId;
    }

    public static setKiosk(kiosk: boolean) {
        GlobalService.globalSingleton.kiosk = kiosk;
    }

    public static getKIOSK(): boolean {
        return GlobalService.globalSingleton.kiosk;
    }

    public static setLogged(logged: boolean) {
        GlobalService.globalSingleton.logged = logged;
    }

    public static getLOGGED(): boolean {
        return GlobalService.globalSingleton.logged;
    }

    public static setApplicationTitle(applicationTitle: string) {
        GlobalService.globalSingleton.applicationTitle = applicationTitle;
    }

    public static getAPPLICATION_TITLE(): string {
        return GlobalService.globalSingleton.applicationTitle;
    }

    public static setRoles(roles: RolInfo[]) {
        GlobalService.globalSingleton.roles = roles;
    }

    public static getROLES(): RolInfo[] {
        return GlobalService.globalSingleton.roles;
    }

    public static setLanguage(language: string) {
        GlobalService.globalSingleton.language = language;
    }

    public static getLANGUAGE(): string {
        return GlobalService.globalSingleton.language;
    }
}

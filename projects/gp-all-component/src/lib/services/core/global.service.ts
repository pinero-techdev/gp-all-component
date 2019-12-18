import { Injectable } from '@angular/core';
import { Param } from '../../resources/data/param.model';
import { RolInfo } from '../../resources/data/rol-info.model';
import { UserInfo } from '../../resources/data/user-info.model';
import { GlobalSingletonService } from './global-singleton.service';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { environmentBase, IEnvironment } from '../../util/environment';
import { Params } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  private static globalSingleton: GlobalSingletonService = new GlobalSingletonService();

  private static sessionStorageService = new SessionStorageService();

  public static setEnvironment(environment: IEnvironment) {
    const env = { ...environmentBase, ...environment };
    GlobalService.setBaseUrl(env.baseUrl);
    GlobalService.setLoginServiceUrl(env.loginUrl);
    GlobalService.setMenuServiceUrl(env.menuUrl);
    GlobalService.setApp(env.appName);
    GlobalService.setAplicacionLogin(env.appName);
    GlobalService.setLogged(false);
    GlobalService.setApplicationTitle(env.appTitle);
    GlobalService.setVersion(env.version);
  }

  public static getBASE_URL(): string {
    return GlobalService.globalSingleton.baseUrl;
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

  public static getPRE_LOGIN_PARAMS(): Params {
    return GlobalService.globalSingleton.preLoginParams;
  }

  public static setPreLoginParams(preLoginParams: Params) {
    GlobalService.globalSingleton.preLoginParams = preLoginParams;
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

  public static getAPP(): string {
    return GlobalService.globalSingleton.app;
  }

  public static setApp(newApp: string) {
    GlobalService.globalSingleton.app = newApp;
  }

  public static getIP(): string {
    return GlobalService.globalSingleton.ip;
  }

  public static setIp(ip: string) {
    GlobalService.globalSingleton.ip = ip;
  }

  public static getPARAMS(): Param[] {
    return GlobalService.globalSingleton.params;
  }

  public static setParams(params: Param[]) {
    GlobalService.globalSingleton.params = params;
  }

  public static getSESSION(): UserInfo {
    if (!GlobalService.globalSingleton.session) {
      const session = this.sessionStorageService.getItem('userInfo');
      if (!session) {
        return null;
      }
      GlobalService.setSession(session);
    }
    return GlobalService.globalSingleton.session;
  }

  public static setSession(session: UserInfo) {
    GlobalService.globalSingleton.session = session;
  }

  public static getSESSION_ID(): string {
    if (!GlobalService.globalSingleton.sessionId) {
      const sessionId = this.sessionStorageService.getItem('sessionId');
      if (!sessionId) {
        return '';
      }
      GlobalService.setSessionId(sessionId);
    }
    return GlobalService.globalSingleton.sessionId;
  }

  public static setSessionId(sessionId: string) {
    GlobalService.globalSingleton.sessionId = sessionId;
  }

  public static getKIOSK(): boolean {
    return GlobalService.globalSingleton.kiosk;
  }

  public static setKiosk(kiosk: boolean) {
    GlobalService.globalSingleton.kiosk = kiosk;
  }

  public static getLOGGED(): boolean {
    return GlobalService.globalSingleton.logged;
  }

  public static setLogged(logged: boolean) {
    GlobalService.globalSingleton.logged = logged;
  }

  public static getAPPLICATION_TITLE(): string {
    return GlobalService.globalSingleton.applicationTitle;
  }

  public static setApplicationTitle(applicationTitle: string) {
    GlobalService.globalSingleton.applicationTitle = applicationTitle;
  }

  public static getROLES(): RolInfo[] {
    return GlobalService.globalSingleton.roles;
  }

  public static setRoles(roles: RolInfo[]) {
    GlobalService.globalSingleton.roles = roles;
  }

  public static getLANGUAGE(): string {
    return GlobalService.globalSingleton.language;
  }

  public static setLanguage(language: string) {
    GlobalService.globalSingleton.language = language;
  }

  public static getVERSION(): string {
    return GlobalService.globalSingleton.version;
  }

  public static setVersion(version: string) {
    GlobalService.globalSingleton.version = version;
  }
}

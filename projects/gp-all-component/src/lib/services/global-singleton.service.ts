import {Param} from '../resources/data/param.model';
import {RolInfo} from '../resources/data/rol-info.model';
import {UserInfo} from '../resources/data/user-info.model';

export class GlobalSingletonService {
  private _baseUrl: string;
  private _loginServiceUrl: string;
  private _menuServiceUrl: string;
  private _preLoginUrl: string;
  private _aplicacionLogin: string;
  private _paramsLogin: Param[];

  private _app: string;
  private _ip: string;
  private _params: Param[] = [];
  private _session: UserInfo;
  private _sessionId: string;

  private _kiosk: boolean;
  private _logged: boolean;
  private _applicationTitle: string;
  private _roles: RolInfo[];
  private _language: string;

  get baseUrl(): string {
    return this._baseUrl;
  }

  set baseUrl(value: string) {
    this._baseUrl = value;
  }

  get loginServiceUrl(): string {
    return this._loginServiceUrl;
  }

  set loginServiceUrl(value: string) {
    this._loginServiceUrl = value;
  }

  get menuServiceUrl(): string {
    return this._menuServiceUrl;
  }

  set menuServiceUrl(value: string) {
    this._menuServiceUrl = value;
  }

  get preLoginUrl(): string {
    return this._preLoginUrl;
  }

  set preLoginUrl(value: string) {
    this._preLoginUrl = value;
  }

  get aplicacionLogin(): string {
    return this._aplicacionLogin;
  }

  set aplicacionLogin(value: string) {
    this._aplicacionLogin = value;
  }

  get paramsLogin(): Param[] {
    return this._paramsLogin;
  }

  set paramsLogin(value: Param[]) {
    this._paramsLogin = value;
  }

  get app(): string {
    return this._app;
  }

  set app(value: string) {
    this._app = value;
  }

  get ip(): string {
    return this._ip;
  }

  set ip(value: string) {
    this._ip = value;
  }

  get params(): Param[] {
    return this._params;
  }

  set params(value: Param[]) {
    this._params = value;
  }

  get session(): UserInfo {
    return this._session;
  }

  set session(value: UserInfo) {
    this._session = value;
  }

  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(value: string) {
    this._sessionId = value;
  }

  get kiosk(): boolean {
    return this._kiosk;
  }

  set kiosk(value: boolean) {
    this._kiosk = value;
  }

  get logged(): boolean {
    return this._logged;
  }

  set logged(value: boolean) {
    this._logged = value;
  }

  get applicationTitle(): string {
    return this._applicationTitle;
  }

  set applicationTitle(value: string) {
    this._applicationTitle = value;
  }

  get roles(): RolInfo[] {
    return this._roles;
  }

  set roles(value: RolInfo[]) {
    this._roles = value;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }
}

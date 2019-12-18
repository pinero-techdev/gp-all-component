import { Param } from '../../resources/data/param.model';
import { RolInfo } from '../../resources/data/rol-info.model';
import { UserInfo } from '../../resources/data/user-info.model';
import { Params } from '@angular/router';

export class GlobalSingletonService {
  private baseUrlValue: string;
  private loginServiceUrlValue: string;
  private menuServiceUrlValue: string;
  private preLoginUrlValue: string;
  private preLoginParamsValue: Params;
  private aplicacionLoginValue: string;
  private paramsLoginValue: Param[];

  private appValue: string;
  private versionValue: string;
  private ipValue: string;
  private paramsValue: Param[] = [];
  private sessionValue: UserInfo;
  private sessionIdValue: string;

  private kioskValue: boolean;
  private loggedValue: boolean;
  private applicationTitleValue: string;
  private rolesValue: RolInfo[];
  private languageValue: string;

  get baseUrl(): string {
    return this.baseUrlValue;
  }

  set baseUrl(value: string) {
    this.baseUrlValue = value;
  }

  get loginServiceUrl(): string {
    return this.loginServiceUrlValue;
  }

  set loginServiceUrl(value: string) {
    this.loginServiceUrlValue = value;
  }

  get menuServiceUrl(): string {
    return this.menuServiceUrlValue;
  }

  set menuServiceUrl(value: string) {
    this.menuServiceUrlValue = value;
  }

  get preLoginUrl(): string {
    return this.preLoginUrlValue;
  }

  set preLoginUrl(value: string) {
    this.preLoginUrlValue = value;
  }
  get preLoginParams(): Params {
    return this.preLoginParamsValue;
  }

  set preLoginParams(value: Params) {
    this.preLoginParamsValue = value;
  }

  get aplicacionLogin(): string {
    return this.aplicacionLoginValue;
  }

  set aplicacionLogin(value: string) {
    this.aplicacionLoginValue = value;
  }

  get paramsLogin(): Param[] {
    return this.paramsLoginValue;
  }

  set paramsLogin(value: Param[]) {
    this.paramsLoginValue = value;
  }

  get app(): string {
    return this.appValue;
  }

  set app(value: string) {
    this.appValue = value;
  }

  get ip(): string {
    return this.ipValue;
  }

  set ip(value: string) {
    this.ipValue = value;
  }

  get params(): Param[] {
    return this.paramsValue;
  }

  set params(value: Param[]) {
    this.paramsValue = value;
  }

  get session(): UserInfo {
    return this.sessionValue;
  }

  set session(value: UserInfo) {
    this.sessionValue = value;
  }

  get sessionId(): string {
    return this.sessionIdValue;
  }

  set sessionId(value: string) {
    this.sessionIdValue = value;
  }

  get kiosk(): boolean {
    return this.kioskValue;
  }

  set kiosk(value: boolean) {
    this.kioskValue = value;
  }

  get logged(): boolean {
    return this.loggedValue;
  }

  set logged(value: boolean) {
    this.loggedValue = value;
  }

  get applicationTitle(): string {
    return this.applicationTitleValue;
  }

  set applicationTitle(value: string) {
    this.applicationTitleValue = value;
  }

  get roles(): RolInfo[] {
    return this.rolesValue;
  }

  set roles(value: RolInfo[]) {
    this.rolesValue = value;
  }

  get language(): string {
    return this.languageValue;
  }

  set language(value: string) {
    this.languageValue = value;
  }

  get version(): string {
    return this.versionValue;
  }

  set version(value: string) {
    this.versionValue = value;
  }
}

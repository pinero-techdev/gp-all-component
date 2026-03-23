import {
  Component,
  Input,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../../services/api/login/login.service';
import { CommonRs } from '../../services/core/common.service';
import { GlobalService } from '../../services/core/global.service';
import { filter, first, takeWhile } from 'rxjs/operators';
import { LocaleES } from '../../resources/localization/es-ES.lang';
import { UserInfo } from '../../resources/data/user-info.model';
import { CustomStyles } from '../../resources/data/customStyles';

@Component({
  selector: 'gp-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Get some DOM elements to check clicking on them.
   */
  @ViewChild('menuUser') menuUser: ElementRef;
  @ViewChild('userMobileButton') userMobileButton: ElementRef;

  breadCrumb: any = [];
  breadCrumbTemp: any = [];
  display = false;
  isHome = false;
  itemsUserMenu: MenuItem[];
  readonly locale = LocaleES;
  session: UserInfo;
  userMenuVisible = false;

  private isAlive = true;
  // tslint:disable
  private _isOpen = false;
  // tslint:enable

  @Input() homeUrl = '/home';
  @Input() showMenu = true;
  @Input() isExternal = false;
  @Input() logoUrl: string;
  @Input() title: string;
  /**
   * Run environment
   */
  @Input() environment: string;

  @Input() newStatusBreadcrumb: any;
  @Output() showServiceMenu: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  @Output() openMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() logOut = new EventEmitter();
  @Output() sendLauncher = new EventEmitter();

  // custom-styles
  @Input() customStyles: CustomStyles;

  customStylesBol = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private changeDetector: ChangeDetectorRef
  ) {}

  /**
   * Check for menu open
   */
  @Input() set isOpen(value: boolean) {
    this._isOpen = value;
    this.changeDetector.detectChanges();
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  get logged() {
    return !!GlobalService.getSESSION_ID();
  }

  get fullName() {
    return GlobalService.getSESSION() && GlobalService.getSESSION().hasOwnProperty('fullName')
      ? GlobalService.getSESSION().fullName
      : '';
  }

  get version() {
    return GlobalService.getVERSION();
  }
  get isEnvironmentTest() {
    return this.environment === 'test' || this.environment === 'development';
  }
  get environmentLabel() {
    if (this.environment === 'test') {
      return 'TEST';
    } else if (this.environment === 'development') {
      return 'PREPROD';
    } else {
      return '';
    }
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  ngOnInit() {
    console.info('JK ========> ngOnInit TopbarComponent');
    this.setCustomStyles();
    console.info('JK ========> setCustomStyles');
    const breadCrumbStored = sessionStorage.getItem('breadCrumb');
    console.info('JK ========> ngOnInit breadCrumbStored');
    if (breadCrumbStored) {
      console.info('JK ========> ngOnInit breadCrumbStored');
      try {
        this.breadCrumb = JSON.parse(breadCrumbStored);
        console.info('JK ========> ngOnInit try { this.breadCrumb');
      } catch {
        this.breadCrumb = [];
        console.info('JK ========> ngOnInit catch { this.breadCrumb = [] } ');
      }
    } else {
      console.info('JK ========> ngOnInit else { this.breadCrumb = [] }');
      this.breadCrumb = [];
    }
    this.setIsHome(this.router.url);
    console.info('JK ========> ngOnInit setIsHome');
    this.router.events
      .pipe(
        takeWhile(() => this.isAlive),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => this.setIsHome(event.url));
    console.info('JK ========> ngOnInit this.router.events.subscribe');
    this.itemsUserMenu = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (click) => {
          this.toggleUserMenu(),
            this.toggleMenu(false),
            (this.breadCrumb = []),
            this.redirect('logout');
        },
      },
    ];
    console.info('JK ========> ngOnInit this.itemsUserMenu = [ Logout ]');
    this.session = GlobalService.getSESSION();
    console.info('JK ========> ngOnInit this.session = GlobalService.getSESSION()');
  }

  setCustomStyles() {
    console.info('JK ========> setCustomStyles');
    if (this.customStyles) {
      console.info('JK ========> if (this.customStyles');
      console.info('JK ========> this.customStyles?.showId ');
      console.info(this.customStyles);
      console.info(this.customStyles.showId);

      document.documentElement.style.setProperty(
        '--logo-custom',
        'url("' + this.customStyles.logo + '")'
      );
      console.info('JK ========> document.documentElement.style.setProperty(--logo-custom');
      document.documentElement.style.setProperty('--header-color', this.customStyles.headerColor);
      console.info('JK ========> document.documentElement.style.setProperty(--header-color');
      this.customStylesBol = true;
    } else {
      console.info('JK ========> this.customStylesBol = false;');
      this.customStylesBol = false;
    }
  }

  /**
   * Watch breadcrumb prop changes.
   *
   * @param changes 'Simple changes object'
   */
  ngOnChanges(changes: SimpleChanges) {
    console.info('JK ========> ngOnChanges');
    const newStatusBreadcrumb =
      changes.newStatusBreadcrumb && changes.newStatusBreadcrumb.currentValue;
    console.info('JK ========> newStatusBreadcrumb = changes.newStatusBreadcrumb &&');
    if (newStatusBreadcrumb) {
      console.info('JK ========> if (newStatusBreadcrumb) {');
      this.setBreadcrumb(newStatusBreadcrumb);
      console.info('JK ========> this.setBreadcrumb(newStatusBreadcrumb);');
    }
  }

  /**
   * Redirects depending on option choosen by user.
   *
   * @param action 'login action'
   */
  redirect(action: string) {
    console.info('JK ========> redirect');
    let response = new CommonRs();

    if (action === 'logout') {
      console.info('JK ========> redirect if (action === logout) {');
      if (this.isExternal) {
        console.info('JK ========> if (this.isExternal) {');
        this.logOut.emit();
      } else {
        console.info('JK ========> redirect else {');
        this.loginService
          .logout()
          .pipe(first())
          .subscribe(
            (data) => {
              response = data;
              console.info('JK ========> response = data;');
              if (response.ok) {
                console.info('JK ========> if (response.ok) {');
                this.goToLogin();
              }
            },
            (error) => {
              console.info('JK ========> (error) => {');
              console.error(error);
              this.goToLogin();
            },
            () => {
              // if logout response fails. User must keep logged
              console.info('GlobalService.setLogged(!response.ok);');
              GlobalService.setLogged(!response.ok);
            }
          );
      }
    }
  }

  /**
   * Show breadcrumb on navigation bar.
   *
   * @param menu 'breadCrumb object with label and active keys'
   * @param index 'numeric index'
   */
  getBreadCrumbMenu(menu: object, index: number) {
    console.info('JK ========>   getBreadCrumbMenu(menu: object, index: number) {');
    if (!this.isOpen) {
      console.info('JK ========> !this.isOpen');
      this.breadCrumbTemp = Object.assign([], this.breadCrumb);
    }
    console.info(
      'JK ========> getBreadCrumbMenu this.breadCrumb.splice(index + 1, this.breadCrumb.length - 1'
    );
    this.breadCrumb.splice(index + 1, this.breadCrumb.length - 1);
    console.info('JK ========> getBreadCrumbMenu  this.saveBreadCrumbToSession();');
    this.saveBreadCrumbToSession();

    if (menu[index] && menu[index].menu && menu[index].menu.length) {
      console.info(
        'JK ========>  if (menu[index] && menu[index].menu && menu[index].menu.length) {'
      );
      this.sendLauncher.emit(menu[index].menu);
      console.info('JK ========> this.sendLauncher.emit(menu[index].menu);');
      this.toggleMenu(true);
    }
  }

  /**
   * Navigates to login screen and
   * closes the menu.
   */
  goToLogin() {
    console.info('JK ========> goToLogin');
    GlobalService.setPreLoginUrl(null);
    console.info('JK ========> goToLogin GlobalService.setPreLoginUrl(null);');
    this.router.navigate(['login']);
    console.info('JK ========> goToLogin this.router.navigate([]);');
    this.toggleMenu(false);
  }

  /**
   * Change user menu icon.
   */
  toggleIconUserMenu() {
    console.info('JK ========> toggleIconUserMenu');
    this.toggleMenu(!this.isOpen);
    console.info('JK ========> this.toggleMenu(!this.isOpen);');
    if (this.isOpen) {
      console.info('JK ========> if (this.isOpen) {');
      this.breadCrumbTemp = Object.assign([], this.breadCrumb);
      console.info('JK ========> this.breadCrumbTemp = Object.assign([], this.breadCrumb);');
      this.breadCrumb = [];
    }
    console.info('JK ========> this.checkLastItemBreadcrumb();');
    this.checkLastItemBreadcrumb();

    if (!this.isOpen) {
      console.info('JK ========> if (!this.isOpen) {');
      this.breadCrumb = Object.assign([], this.breadCrumbTemp);
      console.info('JK ========> this.breadCrumb = Object.assign([], this.breadCrumbTemp);');
      this.breadCrumbTemp = [];
    }
  }

  /**
   * Check and remove last menu item
   */
  checkLastItemBreadcrumb() {
    console.info('JK ========> checkLastItemBreadcrumb');
    const lastItemBreadcrumb = this.breadCrumb[this.breadCrumb.length - 1];
    console.info('JK ========> checkLastItemBreadcrumb const lastItemBreadcrumb');
    if (lastItemBreadcrumb && !lastItemBreadcrumb.menu) {
      console.info('JK ========> checkLastItemBreadcrumb if (lastItemBreadcrumb ');
      this.removeItemBreadcrumb();
    }
  }

  /**
   * Updates the breadcrumb
   *
   * @param item 'Breadcrumb object'
   */
  setBreadcrumb(item: any) {
    console.info('JK ========> setBreadcrumb(item: any) {');
    item.isActive ? this.breadCrumb.push(item) : this.removeItemBreadcrumb();
    console.info('JK ========> setBreadcrumb this.saveBreadCrumbToSession();');
    this.saveBreadCrumbToSession();
    console.info('JK ========> setBreadcrumb this.checkLastItemBreadcrumb();');
    this.checkLastItemBreadcrumb();
  }

  removeItemBreadcrumb() {
    console.info('JK ========> removeItemBreadcrumb');
    this.breadCrumb.splice(-1, 1);
    console.info('JK ========> removeItemBreadcrumb this.saveBreadCrumbToSession();');
    this.saveBreadCrumbToSession();
    console.info('JK ========> removeItemBreadcrumb');
  }

  /**
   * Toggles menu open or close.
   *
   * @param isOpen 'open boolean prop'
   */
  toggleMenu(isOpen: boolean) {
    console.info('JK ========> toggleMenu(isOpen: boolean) {');
    if (this.isOpen !== isOpen) {
      console.info('JK ========> if (this.isOpen !== isOpen) {');
      this.isOpen = Boolean(isOpen);
      console.info('JK ========> toggleMenu this.openMenu.emit(this.isOpen);');
      this.openMenu.emit(this.isOpen);
      console.info('JK ========> toggleMenu');
    }
  }

  toggleUserMenu() {
    console.info('JK ========> toggleUserMenu');
    this.userMenuVisible = !this.userMenuVisible;
    console.info('JK ========> toggleUserMenu this.changeDetector.detectChanges();');
    this.changeDetector.detectChanges();
  }

  resetMenu() {
    console.info('JK ========> resetMenu');
    let temp;
    console.info('JK ========> let temp;');
    if (
      this.breadCrumb &&
      this.breadCrumb[0] &&
      this.breadCrumb[0].menu &&
      this.breadCrumb[0].menu[0] &&
      this.breadCrumb[0].menu[0].parentList
    ) {
      console.info('JK ========> resetMenu if (this.breadCrumb && this.breadCrumb[0] &&) {');
      temp = this.breadCrumb[0].menu[0].parentList;
    }

    if (!this.isOpen) {
      console.info('JK ========> resetMenu if (!this.isOpen) { ');
      this.breadCrumbTemp = Object.assign([], this.breadCrumb);
    }

    this.breadCrumb = [];
    console.info('JK ========> resetMenu this.saveBreadCrumbToSession();');
    this.saveBreadCrumbToSession();
    if (temp) {
      console.info('JK ========> resetMenu if (temp) {');
      this.sendLauncher.emit(temp);
    }
    console.info('JK ========> resetMenu this.toggleMenu(true);');
    this.toggleMenu(true);
  }

  isLastMenu(index) {
    console.info('JK ========> isLastMenu(index) {');
    return index === this.breadCrumb.length - 1;
  }

  private setIsHome(url: string) {
    console.info('JK ========> setIsHome(url: string) {');
    this.isHome = url === this.homeUrl;
    console.info('JK ========> setIsHome');
    this.toggleMenu(this.isHome);
    console.info('JK ========> setIsHome');
    this.changeDetector.detectChanges();
  }

  private saveBreadCrumbToSession() {
    console.info('JK ========> saveBreadCrumbToSession');
    const safeBreadCrumb = this.getSafeBreadCrumb(this.breadCrumb);
    console.info('JK ========> saveBreadCrumbToSession');
    sessionStorage.setItem('breadCrumb', JSON.stringify(safeBreadCrumb));
    console.info('JK ========> saveBreadCrumbToSession');
  }

  // Elimina propiedades circulares como parentList y submenus
  private getSafeBreadCrumb(breadCrumb: any[]): any[] {
    console.info('JK ========> saveBreadCrumbToSession');
    return breadCrumb.map((item) => {
      console.info('JK ========> saveBreadCrumbToSession');
      const safeItem = { ...item };
      console.info('JK ========> saveBreadCrumbToSession');
      if (safeItem.menu && Array.isArray(safeItem.menu)) {
        console.info('JK ========> saveBreadCrumbToSession');
        safeItem.menu = safeItem.menu.map((menuItem) => {
          console.info('JK ========> saveBreadCrumbToSession');
          const safeMenuItem = { ...menuItem };
          console.info('JK ========> saveBreadCrumbToSession');
          delete safeMenuItem.parentList;
          console.info('JK ========> saveBreadCrumbToSession');
          delete safeMenuItem.submenus;
          console.info('JK ========> saveBreadCrumbToSession');
          return safeMenuItem;
        });
      }
      console.info('JK ========> saveBreadCrumbToSession');
      delete safeItem.parentList;
      console.info('JK ========> saveBreadCrumbToSession');
      delete safeItem.submenus;
      return safeItem;
    });
  }
}

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
  HostListener,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
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

  breadCrumb: any[] = [];
  breadCrumbTemp: any[] = [];
  display = false;
  isHome = false;
  itemsUserMenu: MenuItem[];
  readonly locale = LocaleES;
  session: UserInfo;
  userMenuVisible = false;

  private isAlive = true;
  private isOpen2 = false;
  private isBackNavigation = false;
  private firstNavigationEnd = true;
  private suppressBreadcrumbUpdates = false;

  private readonly BREADCRUMB_CURRENT_KEY = 'topbarBreadcrumbCurrent';
  private readonly BREADCRUMB_URL_PREFIX = 'topbarBreadcrumbUrl_';
  private readonly MENU_PATH_KEY = 'mainMenuPath';

  private currentUrl = '';
  private navigatingToHome = false;

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

  @HostListener('window:beforeunload')
  beforeUnload() {
    this.saveBreadcrumb();
  }

  /**
   * Check for menu open
   */
  @Input() set isOpen(value: boolean) {
    this.isOpen2 = value;
    this.changeDetector.detectChanges();
  }

  get isOpen(): boolean {
    return this.isOpen2;
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

  ngOnInit() {
    this.setCustomStyles();

    this.currentUrl = this.getCurrentBrowserUrl();
    this.setIsHome(this.currentUrl);

    if (this.isHome) {
      this.clearBreadcrumb();
      this.clearMenuState();
    } else if (!this.breadCrumb.length) {
      this.loadBreadcrumbForUrl(this.currentUrl, true);
    }

    this.router.events
      .pipe(
        takeWhile(() => this.isAlive),
        filter((event) => event instanceof NavigationStart)
      )
      .subscribe((event: NavigationStart) => {
        this.saveBreadcrumb();
        this.isBackNavigation = event.navigationTrigger === 'popstate';
      });

    this.router.events
      .pipe(
        takeWhile(() => this.isAlive),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const newUrl = this.normalizeUrl(event.urlAfterRedirects || event.url);

        this.currentUrl = newUrl;
        this.setIsHome(newUrl);

        if (this.isHome) {
          this.breadCrumb = [];
          this.breadCrumbTemp = [];
          this.clearBreadcrumb();
          this.clearMenuState();
          this.suppressBreadcrumbUpdates = false;
          this.isBackNavigation = false;
          this.firstNavigationEnd = false;
          this.changeDetector.detectChanges();
          return;
        }

        const savedForUrl = this.getSavedBreadcrumbForUrl(newUrl, this.firstNavigationEnd);

        if (savedForUrl && savedForUrl.length && !this.breadCrumb.length) {
          this.breadCrumb = savedForUrl;
        }

        this.firstNavigationEnd = false;
        this.isBackNavigation = false;
        this.changeDetector.detectChanges();
      });

    this.itemsUserMenu = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.toggleUserMenu();
          this.toggleMenu(false);
          this.breadCrumb = [];
          this.breadCrumbTemp = [];
          this.clearBreadcrumb();
          this.clearMenuState();
          this.redirect('logout');
        },
      },
    ];

    this.session = GlobalService.getSESSION();
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.newStatusBreadcrumb;

    if (!change || !change.currentValue) {
      return;
    }

    if (this.suppressBreadcrumbUpdates) {
      return;
    }

    this.setBreadcrumb(change.currentValue);
  }

  ngOnDestroy() {
    this.saveBreadcrumb();
    this.isAlive = false;
  }

  setCustomStyles() {
    if (this.customStyles) {
      document.documentElement.style.setProperty(
        '--logo-custom',
        'url("' + this.customStyles.logo + '")'
      );
      document.documentElement.style.setProperty('--header-color', this.customStyles.headerColor);
      this.customStylesBol = true;
    } else {
      this.customStylesBol = false;
    }
  }

  /**
   * Redirects depending on option choosen by user.
   *
   * @param action 'login action'
   */
  redirect(action: string) {
    let response = new CommonRs();

    if (action === 'logout') {
      if (this.isExternal) {
        this.logOut.emit();
      } else {
        this.loginService
          .logout()
          .pipe(first())
          .subscribe(
            (data) => {
              response = data;
              if (response.ok) {
                this.goToLogin();
              }
            },
            (error) => {
              console.error(error);
              this.goToLogin();
            },
            () => {
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
  getBreadCrumbMenu(menu: any[], index: number) {
    if (!this.isOpen) {
      this.breadCrumbTemp = Object.assign([], this.breadCrumb);
    }

    const selectedBreadcrumb = this.breadCrumb[index];

    if (!selectedBreadcrumb) {
      return;
    }

    this.breadCrumb.splice(index + 1);

    if (selectedBreadcrumb.menuPath) {
      sessionStorage.setItem(this.MENU_PATH_KEY, JSON.stringify(selectedBreadcrumb.menuPath));
    } else {
      this.clearMenuState();
    }

    this.saveBreadcrumb();

    if (selectedBreadcrumb.action) {
      this.router.navigateByUrl(selectedBreadcrumb.action);
      this.toggleMenu(false);
      return;
    }

    this.reopenMenu();
  }

  /**
   * Navigates to login screen and
   * closes the menu.
   */
  goToLogin() {
    GlobalService.setPreLoginUrl(null);
    this.breadCrumb = [];
    this.breadCrumbTemp = [];
    this.clearBreadcrumb();
    this.clearMenuState();
    this.router.navigate(['login']);
    this.toggleMenu(false);
  }

  /**
   * Change user menu icon.
   */
  toggleIconUserMenu() {
    if (this.isOpen) {
      this.breadCrumb = Object.assign([], this.breadCrumbTemp);
      this.saveBreadcrumb();
      this.toggleMenu(false);
      return;
    }

    this.prepareBreadcrumbForMenuOpen();
    this.toggleMenu(true);
    this.breadCrumbTemp = Object.assign([], this.breadCrumb);
  }

  checkLastItemBreadcrumb() {
    this.prepareBreadcrumbForMenuOpen();
  }

  /**
   * Updates the breadcrumb
   *
   * @param item 'Breadcrumb object'
   */
  setBreadcrumb(item: any) {
    if (!item || !item.label) {
      return;
    }

    if (item.isActive === false) {
      this.removeSpecificBreadcrumb();
      return;
    }

    if (!this.currentUrl) {
      this.currentUrl = this.getCurrentBrowserUrl();
    }

    const lastItem = this.breadCrumb[this.breadCrumb.length - 1];

    const isSameAsLast =
      lastItem &&
      lastItem.label === item.label &&
      lastItem.id === item.id &&
      lastItem.action === item.action;

    if (!isSameAsLast) {
      this.breadCrumb.push(item);
    }

    this.saveBreadcrumb();
  }

  removeItemBreadcrumb() {
    if (!this.breadCrumb.length) {
      return;
    }

    this.breadCrumb.splice(-1, 1);
    this.saveBreadcrumb();
  }

  private removeSpecificBreadcrumb() {
    if (!this.breadCrumb.length) {
      return;
    }

    this.breadCrumb.splice(-1, 1);
    this.updateMenuPathFromBreadcrumb();
    this.saveBreadcrumb();
  }

  /**
   * Toggles menu open or close.
   *
   * @param isOpen 'open boolean prop'
   */
  toggleMenu(isOpen: boolean) {
    if (this.isOpen !== isOpen) {
      this.isOpen = Boolean(isOpen);
      this.openMenu.emit(this.isOpen);
    }
  }

  toggleUserMenu() {
    this.userMenuVisible = !this.userMenuVisible;
    this.changeDetector.detectChanges();
  }

  resetMenu() {
    window.dispatchEvent(new CustomEvent('breadcrumb-reset-start'));
    this.navigatingToHome = true;
    this.suppressBreadcrumbUpdates = true;

    this.breadCrumb = [];
    this.breadCrumbTemp = [];
    this.clearBreadcrumb();
    this.clearMenuState();

    this.toggleMenu(false);
    this.detectChangesSafe();

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(this.homeUrl).then(() => {
        this.currentUrl = this.normalizeUrl(this.homeUrl);
        this.isHome = true;

        this.breadCrumb = [];
        this.breadCrumbTemp = [];
        this.clearBreadcrumb();
        this.clearMenuState();

        this.isBackNavigation = false;
        this.firstNavigationEnd = false;

        this.toggleMenu(false);

        this.detectChangesSafe();

        setTimeout(() => {
          this.suppressBreadcrumbUpdates = false;
          this.navigatingToHome = false;
          window.dispatchEvent(new CustomEvent('breadcrumb-reset-end'));
        }, 100);
      });
    });
  }

  isLastMenu(index: number) {
    return index === this.breadCrumb.length - 1;
  }

  private prepareBreadcrumbForMenuOpen() {
    if (!this.breadCrumb || !this.breadCrumb.length) {
      this.clearMenuState();
      return;
    }

    const lastItemBreadcrumb = this.breadCrumb[this.breadCrumb.length - 1];

    if (lastItemBreadcrumb && lastItemBreadcrumb.action) {
      this.breadCrumb.splice(-1, 1);
      this.updateMenuPathFromBreadcrumb();
      this.saveBreadcrumb();
      return;
    }

    if (lastItemBreadcrumb && lastItemBreadcrumb.menuPath) {
      sessionStorage.setItem(this.MENU_PATH_KEY, JSON.stringify(lastItemBreadcrumb.menuPath));
    }
  }

  private updateMenuPathFromBreadcrumb() {
    if (!this.breadCrumb || !this.breadCrumb.length) {
      this.clearMenuState();
      return;
    }

    for (let i = this.breadCrumb.length - 1; i >= 0; i--) {
      const item = this.breadCrumb[i];

      if (item && item.menuPath) {
        sessionStorage.setItem(this.MENU_PATH_KEY, JSON.stringify(item.menuPath));
        return;
      }
    }

    this.clearMenuState();
  }

  private reopenMenu() {
    if (this.isOpen) {
      this.toggleMenu(false);
      setTimeout(() => {
        this.toggleMenu(true);
      }, 0);
    } else {
      this.toggleMenu(true);
    }
  }

  private setIsHome(url: string) {
    this.isHome = this.normalizeUrl(url) === this.normalizeUrl(this.homeUrl);

    if (this.isHome) {
      this.breadCrumb = [];
      this.breadCrumbTemp = [];
    }

    if (!this.navigatingToHome) {
      this.toggleMenu(this.isHome);
    }

    this.changeDetector.detectChanges();
  }

  private saveBreadcrumb() {
    if (this.suppressBreadcrumbUpdates || this.isHome) {
      return;
    }

    const url = this.normalizeUrl(this.currentUrl || this.getCurrentBrowserUrl());

    if (!url || url === this.normalizeUrl(this.homeUrl)) {
      return;
    }

    if (!this.breadCrumb || !this.breadCrumb.length) {
      return;
    }

    const breadcrumbToSave = this.breadCrumb.map((item) => ({
      label: item.label,
      id: item.id,
      isActive: item.isActive !== false,
      action: item.action,
      menuPath: item.menuPath ? Object.assign([], item.menuPath) : [],
    }));

    const json = JSON.stringify(breadcrumbToSave);

    sessionStorage.setItem(this.BREADCRUMB_CURRENT_KEY, json);
    sessionStorage.setItem(this.getBreadcrumbUrlKey(url), json);
  }

  private loadBreadcrumbForUrl(url: string, allowCurrentFallback = false) {
    const savedBreadcrumb = this.getSavedBreadcrumbForUrl(url, allowCurrentFallback);

    if (savedBreadcrumb && savedBreadcrumb.length) {
      this.breadCrumb = savedBreadcrumb;
    }
  }

  private getSavedBreadcrumbForUrl(url: string, allowCurrentFallback = false): any[] {
    const normalizedUrl = this.normalizeUrl(url);

    let savedBreadcrumb = sessionStorage.getItem(this.getBreadcrumbUrlKey(normalizedUrl));

    if (!savedBreadcrumb && allowCurrentFallback) {
      savedBreadcrumb = sessionStorage.getItem(this.BREADCRUMB_CURRENT_KEY);
    }

    if (!savedBreadcrumb) {
      return [];
    }

    try {
      const parsedBreadcrumb = JSON.parse(savedBreadcrumb);

      return parsedBreadcrumb && Array.isArray(parsedBreadcrumb) ? parsedBreadcrumb : [];
    } catch (e) {
      console.error('Error cargando breadcrumb', e);
      return [];
    }
  }

  private clearBreadcrumb() {
    Object.keys(sessionStorage)
      .filter(
        (key) =>
          key === this.BREADCRUMB_CURRENT_KEY || key.indexOf(this.BREADCRUMB_URL_PREFIX) === 0
      )
      .forEach((key) => sessionStorage.removeItem(key));
  }

  private clearMenuState() {
    sessionStorage.removeItem(this.MENU_PATH_KEY);
  }

  private getBreadcrumbUrlKey(url: string) {
    return this.BREADCRUMB_URL_PREFIX + this.normalizeUrl(url);
  }

  private getCurrentBrowserUrl(): string {
    const hash = window.location.hash;

    if (hash && hash.indexOf('#/') === 0) {
      return this.normalizeUrl(hash.substring(1));
    }

    return this.normalizeUrl(window.location.pathname + window.location.search);
  }

  private normalizeUrl(url: string): string {
    if (!url) {
      return '';
    }

    let cleanUrl = url;

    if (cleanUrl.indexOf('#/') !== -1) {
      cleanUrl = cleanUrl.substring(cleanUrl.indexOf('#/') + 1);
    }

    cleanUrl = cleanUrl.split('?')[0];

    if (!cleanUrl || cleanUrl === '/') {
      return '/';
    }

    return cleanUrl.endsWith('/') && cleanUrl.length > 1
      ? cleanUrl.substring(0, cleanUrl.length - 1)
      : cleanUrl;
  }

  private detectChangesSafe() {
    if (this.isAlive) {
      this.changeDetector.detectChanges();
    }
  }
}

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
  private isBackNavigation = false;
  private readonly BREADCRUMB_STORAGE_KEY = 'topbarBreadcrumb';
  private restoredBreadcrumbFromStorage = false;
  private skipNextBreadcrumbUpdate = false;

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
    this.setCustomStyles();
    this.setIsHome(this.router.url);
    this.loadBreadcrumb();

    this.router.events
      .pipe(
        takeWhile(() => this.isAlive),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.setIsHome(event.url);
        if (this.isBackNavigation) {
          console.log('BACK ==> eliminar último breadcrumb');
          this.isBackNavigation = false;
          this.removeItemBreadcrumb();
        }
      });

    this.router.events
      .pipe(
        takeWhile(() => this.isAlive),
        filter((event) => event instanceof NavigationStart)
      )
      .subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate') {
          console.log('Navegación con botón atrás detectada');
          this.isBackNavigation = true;
        }
      });

    this.itemsUserMenu = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (click) => {
          this.toggleUserMenu();
          this.toggleMenu(false);
          this.breadCrumb = [];
          this.clearBreadcrumb();
          this.redirect('logout');
        },
      },
    ];

    this.session = GlobalService.getSESSION();
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
   * Watch breadcrumb prop changes.
   *
   * @param changes 'Simple changes object'
   */
  ngOnChanges(changes: SimpleChanges) {
    const newStatusBreadcrumb =
      changes.newStatusBreadcrumb && changes.newStatusBreadcrumb.currentValue;

    if (newStatusBreadcrumb) {
      // Al recargar la página restauramos el breadcrumb completo desde sessionStorage.
      // La primera actualización que llega desde el componente hijo suele ser solo
      // la última miga, y si la procesamos rompe la cadena restaurada.
      if (this.skipNextBreadcrumbUpdate) {
        this.skipNextBreadcrumbUpdate = false;
        return;
      }

      if (this.isBackNavigation) {
        this.isBackNavigation = false;
      }

      this.setBreadcrumb(newStatusBreadcrumb);
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
              // if logout response fails. User must keep logged
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
    if (!this.isOpen) {
      this.breadCrumbTemp = Object.assign([], this.breadCrumb);
    }
    this.breadCrumb.splice(index + 1, this.breadCrumb.length - 1);
    this.saveBreadcrumb();

    if (menu[index] && menu[index].menu && menu[index].menu.length) {
      this.sendLauncher.emit(menu[index].menu);
      this.toggleMenu(true);
    }
  }

  /**
   * Navigates to login screen and
   * closes the menu.
   */
  goToLogin() {
    GlobalService.setPreLoginUrl(null);
    this.clearBreadcrumb();
    this.router.navigate(['login']);
    this.toggleMenu(false);
  }

  /**
   * Change user menu icon.
   */
  toggleIconUserMenu() {
    this.toggleMenu(!this.isOpen);
    if (this.isOpen) {
      this.breadCrumbTemp = Object.assign([], this.breadCrumb);
    }
    this.checkLastItemBreadcrumb();

    if (!this.isOpen) {
      this.breadCrumb = Object.assign([], this.breadCrumbTemp);
      this.saveBreadcrumb();
    }
  }

  /**
   * Check and remove last menu item
   */
  checkLastItemBreadcrumb() {
    const lastItemBreadcrumb = this.breadCrumb[this.breadCrumb.length - 1];
    if (lastItemBreadcrumb && !lastItemBreadcrumb.menu) {
      this.removeItemBreadcrumb();
    }
  }

  /**
   * Updates the breadcrumb
   *
   * @param item 'Breadcrumb object'
   */
  setBreadcrumb(item: any) {
    if (!item.isActive) {
      this.removeItemBreadcrumb();
      return;
    }
    const existingIndex = this.breadCrumb.findIndex((b) => b.label === item.label);
    if (existingIndex !== -1) {
      this.breadCrumb = this.breadCrumb.slice(0, existingIndex + 1);
    } else {
      this.breadCrumb.push(item);
    }
    this.saveBreadcrumb();
  }

  removeItemBreadcrumb() {
    this.breadCrumb.splice(-1, 1);
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
    let temp;
    if (
      this.breadCrumb &&
      this.breadCrumb[0] &&
      this.breadCrumb[0].menu &&
      this.breadCrumb[0].menu[0] &&
      this.breadCrumb[0].menu[0].parentList
    ) {
      temp = this.breadCrumb[0].menu[0].parentList;
    }
    if (!this.isOpen) {
      this.breadCrumbTemp = Object.assign([], this.breadCrumb);
    }
    this.breadCrumb = [];
    this.saveBreadcrumb();
    if (temp) {
      this.sendLauncher.emit(temp);
    }

    this.toggleMenu(true);
  }

  isLastMenu(index) {
    return index === this.breadCrumb.length - 1;
  }

  private setIsHome(url: string) {
    this.isHome = url === this.homeUrl;
    this.toggleMenu(this.isHome);
    this.changeDetector.detectChanges();
  }

  private saveBreadcrumb() {
    sessionStorage.setItem(this.BREADCRUMB_STORAGE_KEY, JSON.stringify(this.breadCrumb));
  }

  private loadBreadcrumb() {
    const savedBreadcrumb = sessionStorage.getItem(this.BREADCRUMB_STORAGE_KEY);

    if (savedBreadcrumb) {
      this.breadCrumb = JSON.parse(savedBreadcrumb);
      this.restoredBreadcrumbFromStorage = this.breadCrumb.length > 0;
      this.skipNextBreadcrumbUpdate = this.restoredBreadcrumbFromStorage;
    } else {
      this.breadCrumb = [];
      this.restoredBreadcrumbFromStorage = false;
      this.skipNextBreadcrumbUpdate = false;
    }
  }

  private clearBreadcrumb() {
    sessionStorage.removeItem(this.BREADCRUMB_STORAGE_KEY);
  }
}

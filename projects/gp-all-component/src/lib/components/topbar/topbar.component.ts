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

@Component({
  selector: 'gp-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Get some DOM elements to check clicking on them.
   */
  @ViewChild('menuUser',{static : false}) menuUser: ElementRef;
  @ViewChild('userMobileButton',{static : false}) userMobileButton: ElementRef;

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
  @Input() logoUrl: string;
  @Input() title: string;

  @Input() newStatusBreadcrumb: any;
  @Output() showServiceMenu: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  @Output() openMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendLauncher = new EventEmitter();

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

  ngOnDestroy() {
    this.isAlive = false;
  }

  ngOnInit() {
    this.breadCrumb = [];
    this.setIsHome(this.router.url);
    this.router.events
      .pipe(
        takeWhile(() => this.isAlive),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => this.setIsHome(event.url));

    this.itemsUserMenu = [
      {
        label: 'Logout',
        icon: 'fa fa-sign-out',
        command: (click) => {
          this.toggleUserMenu(),
            this.toggleMenu(false),
            (this.breadCrumb = []),
            this.redirect('logout');
        },
      },
    ];

    this.session = GlobalService.getSESSION();
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
    item.isActive ? this.breadCrumb.push(item) : this.removeItemBreadcrumb();
  }

  removeItemBreadcrumb() {
    this.breadCrumb.splice(-1, 1);
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
    const temp = this.breadCrumb[0].menu[0].parentList;
    if (!this.isOpen) {
      this.breadCrumbTemp = Object.assign([], this.breadCrumb);
    }

    this.breadCrumb = [];
    this.sendLauncher.emit(temp);
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
}

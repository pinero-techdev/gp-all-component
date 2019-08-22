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
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './../../services/api/login/login.service';
import { CommonRs } from './../../services/core/common.service';
import { GlobalService } from './../../services/core/global.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'gp-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnChanges {
  /**
   * Get some DOM elements to check clicking on them.
   */
  @ViewChild('menuUser') menuUser: ElementRef;
  @ViewChild('userMobileButton') userMobileButton: ElementRef;

  itemsUserMenu: MenuItem[];

  @Input() homeUrl: string;
  @Input() showMenu = true;
  @Input() logoUrl: string;
  @Input() title: string;
  @Input() isOpen: boolean;
  @Input() newStatusBreadcrumb: any;
  @Output() showServiceMenu: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  @Output() openMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendLauncher = new EventEmitter();

  display = false;
  userMenuVisible = false;
  breadCrumb: any = [];
  isHome = false;

  constructor(private router: Router, private loginService: LoginService) {}

  get logged() {
    return GlobalService.getSESSION();
  }

  get fullName() {
    return GlobalService.getSESSION() ? GlobalService.getSESSION().fullName : null;
  }

  ngOnInit() {
    this.breadCrumb = [];
    this.isHome = this.router.url !== '/home';

    this.router.events.pipe(first()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.toggleMenu(false);
      }
    });

    this.itemsUserMenu = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (click) => {
          this.toggleUserMenu(), this.toggleMenu(false), this.redirect('logout');
        },
      },
    ];
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
    this.breadCrumb.splice(index + 1, this.breadCrumb.length - 1);

    if (menu[index] && menu[index].floatMenu && menu[index].floatMenu.length) {
      this.sendLauncher.emit(menu[index].floatMenu);
      this.toggleMenu(true);
    }
  }

  /**
   * Navigates to login screen and
   * closes the menu.
   */
  goToLogin() {
    this.router.navigate(['login']);
    this.toggleMenu(false);
  }

  /**
   * Change user menu icon.
   */
  toggleIconUserMenu() {
    this.toggleMenu(!this.isOpen);
    this.checkLastItemBreadcrumb();
  }

  /**
   * Check and remove last menu item
   */
  checkLastItemBreadcrumb() {
    const lastItemBreadcrumb = this.breadCrumb[this.breadCrumb.length - 1];

    if (lastItemBreadcrumb && !lastItemBreadcrumb.floatMenu) {
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
    this.isOpen = typeof isOpen === 'boolean' ? isOpen : !this.isOpen;
    this.openMenu.emit(this.isOpen);
  }

  toggleUserMenu() {
    this.userMenuVisible = !this.userMenuVisible;
  }

  resetMenu() {
    this.breadCrumb = [];
    this.sendLauncher.emit('init');
    this.toggleMenu(true);
  }

  isLastMenu(index) {
    return index === this.breadCrumb.length - 1;
  }
}

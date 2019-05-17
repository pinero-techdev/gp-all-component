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
  @Input() logoUrl: string;
  @Input() title: string;
  @Input() isOpen: boolean;
  @Input() newStatusBreadcrumb: any;
  @Output() showServiceMenu: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  @Output() openMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendLauncher = new EventEmitter();

  display = false;
  showMenu = false;
  userMenuVisible = false;
  breadCrumb: any = [];

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.toggleMenu(false);
      }
    });
    this.breadCrumb = [];
    this.itemsUserMenu = [
      {
        label: 'Logout',
        icon: 'fa fa-sign-out-alt',
        command: (click) => {
          this.toggleUserMenu(), this.toggleMenu(false), this.redirect('logout');
        },
      },
    ];
  }

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
    switch (action) {
      case 'logout':
        let response = new CommonRs();
        this.loginService.logout().subscribe(
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
            console.log('petición de logout finalizada con resultado: ');
            // CommonRs se crea con ok por defecto a falso
            // Si ha habido algún problema con el logout, el usuario sigue logueado
            GlobalService.setLogged(!response.ok);
          }
        );
        break;
      default:
        console.info('redireccionar a:' + action);
    }
  }

  getBreadCrumbMenu(menu, index) {
    this.breadCrumb.splice(index + 1, this.breadCrumb.length - 1);

    if (menu[index] && menu[index].floatMenu && menu[index].floatMenu.length) {
      this.sendLauncher.emit(menu[index].floatMenu);
      this.toggleMenu(true);
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
    this.toggleMenu(false);
  }

  toggleIconUserMenu() {
    this.toggleMenu(!this.isOpen);
    this.checkLastItemBreadcrumb();
  }

  checkLastItemBreadcrumb() {
    const lastItemBreadcrumb = this.breadCrumb[this.breadCrumb.length - 1];

    if (lastItemBreadcrumb && !lastItemBreadcrumb.floatMenu) {
      this.removeItemBreadcrumb();
    }
  }

  setBreadcrumb(item) {
    if (item.isActive) {
      this.breadCrumb.push(item);
    } else {
      this.removeItemBreadcrumb();
    }
  }

  removeItemBreadcrumb() {
    this.breadCrumb.splice(-1, 1);
  }

  toggleMenu(isOpen) {
    if (this.logged) {
      this.isOpen = typeof isOpen === 'boolean' ? isOpen : !this.isOpen;
      this.openMenu.emit(this.isOpen);
    }
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

  get logged() {
    return GlobalService.getLOGGED();
  }

  get fullName() {
    return GlobalService.getSESSION() ? GlobalService.getSESSION().fullName : null;
  }
}

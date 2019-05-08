import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from './../../services/api/login/login.service';
import { CommonRs } from './../../services/core/common.service';
import { GlobalService } from './../../services/core/global.service';
import { LocaleES } from './../../resources/localization/es-ES.lang';

@Component({
  selector: 'gp-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  /**
   * Get some DOM elements to check clicking on them.
   */
  @ViewChild('menuUser') menuUser: ElementRef;
  @ViewChild('userMobileButton') userMobileButton: ElementRef;

  display = false;
  readonly locale = LocaleES;
  classShowMenuButton = 'Fright ShowOnMobile ripplelink Unselectable ShadowEffect';
  itemsUserMenu: MenuItem[];
  showMenu = false;
  userMenuVisible = false;

  @Output() showServiceMenu: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.itemsUserMenu = [
      {
        label: 'Logout',
        icon: 'ui-icon-power-settings-new',
        command: (click) => {
          this.toggleUserMenu(), this.redirect('logout');
        },
      },
    ];
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
        .first()
        .subscribe(
          (data) => {
            response = data;
            if (response.ok) {
              this.router.navigate(['login']);
            }
          },
          (error) => {
            console.error(error);
            this.router.navigate(['login']);
          },
          () => {
            // if logout response fails. User must keep logged
            GlobalService.setLogged(!response.ok);
          }
        );
    }
  }

  toggleUserMenu() {
    this.userMenuVisible = !this.userMenuVisible;
  }

  get logged() {
    return GlobalService.getLOGGED();
  }

  get fullName() {
    if (GlobalService.getSESSION()) {
      return GlobalService.getSESSION().fullName;
    } else {
      return null;
    }
  }
}

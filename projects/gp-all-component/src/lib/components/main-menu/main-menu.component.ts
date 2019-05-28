import { GlobalService } from './../../services/core/global.service';
import { MainMenuService, MenuRq } from '../../services/api/main-menu/main-menu.service';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  Input,
  TemplateRef,
  ContentChild,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'gp-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
/**
 * Clase Menu que agrupa los servicios accesibles por el username
 */
export class MainMenuComponent implements OnInit, OnDestroy {
  /**
   * Check for menu open
   */
  @Input() isOpen: boolean;

  /**
   * Check for new status launcher
   */
  @Input() newStatusLauncher: any;

  /**
   * Emmiter for close menu action
   */
  @Output() closeMenu = new EventEmitter<boolean>();

  /**
   * Emmiter for sendBreadcrumb action
   */
  @Output() sendBreadcrumb = new EventEmitter();

  /**
   * Holds the reference to launcher
   */
  @ViewChild('launcher') launcher;

  /**
   * Holds the reference to menu content
   */
  @ContentChild(TemplateRef) menuContentRef: TemplateRef<any>;

  /**
   * Holds the float menu instance
   */
  floatMenu = [];

  /**
   * Holds the default menu instance
   */
  defaultMenu = [];

  /**
   * Holds the expanded check
   */
  isExpanded = false;

  /**
   * Holds the overview value
   */
  overview: string;

  /**
   * Holds the tooltip disabled check
   */
  disableTooltip = true;

  /**
   * Holds the loaded view check
   */
  viewLoaded = false;

  /**
   * Holds the component life status
   */
  private isAlive = true;

  constructor(private router: Router, private menuProviderService: MainMenuService) {}

  /**
   * Angular OnInit lifecycle hook
   */
  ngOnInit(): void {
    this.initMenu();
  }

  /**
   * Angular OnDestroy lifecycle hook
   */
  ngOnDestroy(): void {
    this.isAlive = false;
  }

  /**
   * Start configuration for menu
   */
  initMenu(): void {
    const sessionId = sessionStorage.getItem('sessionId');
    const request = new MenuRq(sessionId, GlobalService.getPARAMS());

    this.menuProviderService
      .obtenMenu(request)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((menu) => {
        this.defaultMenu = menu;
        this.setMainMenu();
      });

    this.router.events.pipe(takeWhile(() => this.isAlive)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.reset();
      }
    });
  }

  /**
   * Sets the menu
   */
  setMainMenu(): void {
    this.floatMenu = this.cloneArray(this.defaultMenu);
    this.overview = 'dashboard';
    this.viewLoaded = true;
  }

  /**
   * Util to clone the passed array
   * @param data The array
   */
  cloneArray(data: any[]): any[] {
    return data.map((element) => Object.assign({}, element));
  }

  /**
   * Logic to execute on menu toggle
   * @param isOpen Boolean condition
   */
  onToggleMenu(isOpen: any): void {
    this.isOpen = typeof isOpen === 'boolean' ? isOpen : !this.isOpen;
  }

  /**
   * Logic to execte on menu close
   * @param menu The menu input
   */
  onCloseMenu(menu: any): void {
    this.onToggleMenu(false);
    this.closeMenu.emit(this.isOpen);
    this.sendBreadcrumb.emit({ label: menu.texto, isActive: true });
    this.isExpanded = false;
  }

  /**
   * Logic to execute on menu change
   * @param menuChange The menu to change
   */
  menuChange(menuChange: any): void {
    const submenus = menuChange.submenus;

    if (submenus && submenus.length > 0) {
      this.getActionSubmenu(menuChange.submenus, menuChange.texto);
    } else if (menuChange.parentList) {
      this.getActionGoBack(menuChange.parentList, menuChange.texto);
    }
    this.getOverview();
  }

  /**
   * Get the actions for submenu
   * @param submenus The input submenus
   * @param label The input label
   */
  getActionSubmenu(submenus: any, label: string): void {
    if (submenus && submenus.length > 0) {
      this.getGoBackOptionMenu(submenus);
      this.floatMenu = submenus;
      this.sendBreadcrumb.emit({
        label,
        floatMenu: submenus,
        isActive: true,
      });
    }
  }

  /**
   * Gets the overview
   */
  getOverview(): void {
    const item = this.floatMenu.filter((menu) => menu.overview);

    if (item.length > 0) {
      this.overview = item[0].overview;
    }
  }

  /**
   * Gets the action for go back
   * @param parentList The input parent list
   * @param label The input label
   */
  getActionGoBack(parentList: any, label: string): void {
    this.floatMenu = parentList;
    this.sendBreadcrumb.emit({
      label,
      parentList,
      isActive: false,
    });
  }

  /**
   * Gets the go back options menu
   * @param list The input list
   */
  getGoBackOptionMenu(list: any[]): void {
    if (list[0].id !== 'go_back') {
      list.unshift({
        enabled: true,
        parentList: this.cloneArray(this.floatMenu),
        id: 'go_back',
        texto: 'Volver',
      });
    }
  }

  /**
   * Filter that returns only enabled items
   */
  filterEnabledItems(): any[] {
    return this.floatMenu.filter((x) => x.enabled);
  }

  /**
   * Toggles the overview status
   */
  toggleOverview(): void {
    this.launcher.nativeElement.classList.toggle('menu-expanded');
    this.isExpanded = !this.isExpanded;
    this.disableTooltip = !this.disableTooltip;
  }

  /**
   * Reset expand status
   */
  reset(): void {
    this.isExpanded = false;
  }
}

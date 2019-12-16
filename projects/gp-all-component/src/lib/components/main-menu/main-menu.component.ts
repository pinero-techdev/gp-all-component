import { GlobalService } from '../../services/core/global.service';
import { MainMenuService, MenuRq } from '../../services/api/main-menu/main-menu.service';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  TemplateRef,
  ContentChild,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeWhile, first } from 'rxjs/operators';
import { LocaleES } from '../../resources/localization/es-ES.lang';

class MenuItem {
  action: string;
  description: string;
  enabled: boolean;
  icon: string;
  id: string;
  overview: string;
  parentList: MenuItem[];
  submenus: MenuItem[];
  text: string;
  type: string;
}
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
   * Holds the reference to menu content
   */
  @ContentChild(TemplateRef) menuContentRef: TemplateRef<any>;

  /**
   * Holds the component life status
   */
  private isAlive = true;

  // tslint:disable
  private _isOpen = false;
  // tslint:enable

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
   * When home is active the menu should be opened
   */
  @Input() homeUrl = '/home';

  /**
   * Check for menu open
   */
  @Input() set isOpen(value: boolean) {
    if (this.isOpen !== value) {
      this._isOpen = value;
      this.changeDetector.detectChanges();
    }
  }
  get isOpen(): boolean {
    return this._isOpen;
  }

  /**
   * Holds the menu's data
   */
  @Input() menu: MenuItem[];

  /**
   * Emmiter for close menu action
   */
  @Output() closeMenu = new EventEmitter<boolean>();

  /**
   * Emmiter for sendBreadcrumb action
   */
  @Output() sendBreadcrumb = new EventEmitter();

  constructor(
    private router: Router,
    private menuProviderService: MainMenuService,
    private changeDetector: ChangeDetectorRef
  ) {}

  /**
   * Angular OnInit lifecycle hook
   */
  ngOnInit() {
    const sessionId = GlobalService.getSESSION_ID();

    if (sessionId) {
      const request = new MenuRq(sessionId, GlobalService.getPARAMS());

      this.menuProviderService
        .getMenu(request)
        .pipe(first())
        .subscribe((menu) => this.setMainMenu(menu));

      this.router.events.pipe(takeWhile(() => this.isAlive)).subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.reset();
        }
      });
    }
  }

  /**
   * Angular OnDestroy lifecycle hook
   */
  ngOnDestroy(): void {
    this.isAlive = false;
  }

  /**
   * Sets the menu
   */
  setMainMenu(value: any): void {
    this.menu = value.map((item) => this.createMenuItem(item));
    this.viewLoaded = true;
  }

  createMenuItem(item: any): MenuItem {
    const newItem = new MenuItem();
    newItem.action = item.action ? item.action : null;
    newItem.description = item.description ? item.description : null;
    newItem.enabled = item.enabled ? item.enabled : null;
    newItem.icon = item.icon ? item.icon : null;
    newItem.id = item.id ? item.id : null;
    newItem.overview = item.overview ? item.overview : null;
    newItem.parentList = item.parentList ? item.parentList : [];
    newItem.submenus = item.submenus ? this.setSubMenu(item.submenus) : [];
    newItem.text = item.hasOwnProperty('text') ? item.text : null;
    newItem.type = item.type ? item.type : null;

    return newItem;
  }

  setSubMenu(submenu: MenuItem[]): MenuItem[] {
    return submenu.map((item) => this.createMenuItem(item));
  }
  /**
   * Logic to execute on menu close
   * @param item a menu's item
   */
  onCloseMenu(item: any): void {
    this.isOpen = false;
    this.closeMenu.emit(this.isOpen);

    const idItem = item.action ? item.id : undefined;
    this.sendBreadcrumb.emit({ label: item.text, isActive: true, id: idItem });
    this.isExpanded = false;
    this.changeDetector.detectChanges();
  }

  /**
   * Logic to execute on menu change
   * @param menuChange The menu to change
   */
  menuChange(menuChange: any): void {
    const submenus = menuChange.submenus;

    if (submenus && submenus.length > 0) {
      this.getActionSubmenu(menuChange.submenus, menuChange.text);
    } else if (menuChange.parentList) {
      this.getActionGoBack(menuChange.parentList, menuChange.text);
    }
    this.getOverview();
    this.changeDetector.detectChanges();
  }

  /**
   * Get the actions for submenu
   * @param submenus The input submenus
   * @param label The input label
   */
  getActionSubmenu(submenus: any, label: string): void {
    console.log('getActionSubmenu: ', submenus, label);
    if (submenus && submenus.length > 0) {
      this.getGoBackOptionMenu(submenus);
      this.menu = submenus;
      this.sendBreadcrumb.emit({
        label,
        menu: submenus,
        isActive: true,
      });
      this.changeDetector.detectChanges();
    }
  }

  /**
   * Gets the overview
   */
  getOverview(): void {
    const item = this.menu.filter((menu) => menu.overview);

    if (item.length > 0) {
      this.overview = item[0].overview;
    }
    this.changeDetector.detectChanges();
  }

  /**
   * Gets the action for go back
   * @param parentList The input parent list
   * @param label The input label
   */
  getActionGoBack(parentList: any, label: string): void {
    console.log('getActionGoBack: ', parentList, label);
    this.menu = parentList;
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
        parentList: [...[], ...this.menu],
        id: 'go_back',
        text: LocaleES.BACK,
      });
    }
  }

  /**
   * Toggles the overview status
   */
  toggleOverview(): void {
    this.isExpanded = !this.isExpanded;
    this.disableTooltip = !this.disableTooltip;
    this.changeDetector.detectChanges();
  }

  /**
   * Reset expand status
   */
  reset(): void {
    this.isExpanded = false;
  }
}

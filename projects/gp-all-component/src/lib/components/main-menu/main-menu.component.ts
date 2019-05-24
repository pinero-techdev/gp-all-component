import { GlobalService } from './../../services/core/global.service';
import { MainMenuService, MenuRq } from '../../services/api/main-menu/main-menu.service';
import {
  Component,
  OnInit,
  ApplicationRef,
  EventEmitter,
  Output,
  ViewChild,
  Input,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'gp-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
/**
 * Clase Menu que agrupa los servicios accesibles por el username
 */
export class MainMenuComponent implements OnInit {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() isOpen: boolean;
  @Input() newStatusLauncher: any;
  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendBreadcrumb = new EventEmitter();

  floatMenu = [];
  defaultMenu = [];
  isExpanded = false;
  overview: string;
  disableTooltip = true;

  viewLoaded = false;

  @ViewChild('launcher') launcher;

  constructor(
    private router: Router,
    private menuProviderService: MainMenuService,
    private applicationRef: ApplicationRef
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.reset();
      }
    });
  }

  ngOnInit() {
    this.initMenu();
  }

  initMenu() {
    const sessionId = sessionStorage.getItem('sessionId');
    const request: MenuRq = new MenuRq(sessionId, GlobalService.getPARAMS());

    this.menuProviderService.obtenMenu(request).subscribe((menu) => {
      this.defaultMenu = menu;
      this.setMainMenu();
    });
  }

  isHome() {
    return this.router.url === '/home';
  }

  setMainMenu() {
    this.floatMenu = this.cloneArray(this.defaultMenu);
    this.overview = 'dashboard';
    this.viewLoaded = true;
  }

  cloneArray(data) {
    return data.map((element) => Object.assign({}, element));
  }

  refresh() {
    this.applicationRef.tick();
  }

  onToggleMenu(isOpen) {
    this.isOpen = typeof isOpen === 'boolean' ? isOpen : !this.isOpen;
  }

  onCloseMenu(menu) {
    this.onToggleMenu(false);
    this.closeMenu.emit(this.isOpen);
    this.sendBreadcrumb.emit({ label: menu.texto, isActive: true });
    this.isExpanded = false;
  }

  menuChange(menuChange) {
    const submenus = menuChange.submenus;

    if (submenus && submenus.length > 0) {
      this.getActionSubmenu(menuChange.submenus, menuChange.texto);
    } else if (menuChange.parentList) {
      this.getActionGoBack(menuChange.parentList, menuChange.texto);
    }
    this.getOverview();
  }

  getActionSubmenu(submenus, label) {
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

  getOverview() {
    const item = this.floatMenu.filter((menu) => menu.overview);

    if (item.length > 0) {
      this.overview = item[0].overview;
    }
  }

  getActionGoBack(parentList, label) {
    this.floatMenu = parentList;
    this.sendBreadcrumb.emit({
      label,
      parentList,
      isActive: false,
    });
  }

  getGoBackOptionMenu(list) {
    if (list[0].id !== 'go_back') {
      list.unshift({
        enabled: true,
        parentList: this.cloneArray(this.floatMenu),
        id: 'go_back',
        texto: 'Volver',
      });
    }
  }

  filterEnabledItems() {
    return this.floatMenu.filter((x) => x.enabled);
  }

  toggleOverview() {
    this.launcher.nativeElement.classList.toggle('menu-expanded');
    this.isExpanded = !this.isExpanded;
    this.disableTooltip = !this.disableTooltip;
  }

  reset() {
    this.isExpanded = false;
  }
}

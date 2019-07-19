import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../resources/data/menu/menu-item.model';

@Component({
  selector: 'gp-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input()
  items: MenuItem[];

  @Input()
  open: boolean;

  @Input()
  expanded: boolean;

  menu: MenuItem[];
  isOpen: boolean;
  isExpanded: boolean;
  // idMenuSelected: string;
  // toggleSubmenu = false;

  ngOnInit(): void {
    this.isOpen = this.open;
    this.isExpanded = this.expanded;
    this.menu = this.items;
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  // selectItem(item) {
  //   if(this.idMenuSelected === item.id) {

  //     this.toggleSubmenu = !this.toggleSubmenu
  //   }
  // }
}

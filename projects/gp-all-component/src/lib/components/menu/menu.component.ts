import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'gp-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('items')
  menuItems: MenuItem[];

  @Input()
  expanded: boolean;

  items: MenuItem[];
  isExpanded: boolean;

  ngOnInit(): void {
    this.isExpanded = this.expanded;
    this.items = this.menuItems;
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}

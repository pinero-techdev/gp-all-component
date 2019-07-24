import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'gp-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input()
  items: MenuItem[];

  @Input()
  isExpanded = true;

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}

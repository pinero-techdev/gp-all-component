import { Component, Input } from '@angular/core';
import { GpMenuItem } from './../../resources/data/gp-menu-item.model';

@Component({
  selector: 'gp-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input()
  items: GpMenuItem[];

  @Input()
  isExpanded = true;

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}

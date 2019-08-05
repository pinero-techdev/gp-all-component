import { Component, Input } from '@angular/core';
import { GpMenuItem } from './../../resources/data/gp-menu-item.model';

@Component({
  selector: 'gp-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input()
  items: GpMenuItem[];

  @Input()
  home: GpMenuItem;
}

import { Component, ContentChildren, QueryList } from '@angular/core';
import { TabDirective } from '../tab.directive';

@Component({
  selector: 'gp-tabgroup',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.scss'],
})
export class TabViewComponent {
  @ContentChildren(TabDirective) tabs: QueryList<TabDirective>;

  activePosition = 0;

  selectTab(i) {
    this.activePosition = i;
  }

  getTemplate() {
    if (this.tabs.toArray()[this.activePosition]) {
      return this.tabs.toArray()[this.activePosition].getElementRef();
    }
  }
}

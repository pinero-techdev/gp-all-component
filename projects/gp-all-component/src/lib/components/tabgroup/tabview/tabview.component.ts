import { Component, ContentChildren, QueryList, Input, OnInit } from '@angular/core';
import { TabDirective } from '../tab.directive';

@Component({
  selector: 'gp-tabgroup',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.scss'],
})
export class TabViewComponent implements OnInit {
  @ContentChildren(TabDirective) tabs: QueryList<TabDirective>;

  @Input()
  orientation: string;

  activePosition = 0;
  orientationLeft = false;

  ngOnInit() {
    this.orientationLeft = this.orientation === 'left' ? true : false;
  }

  selectTab(i) {
    this.activePosition = i;
  }

  getTemplate() {
    if (this.tabs.toArray()[this.activePosition]) {
      return this.tabs.toArray()[this.activePosition].getElementRef();
    }
  }
}

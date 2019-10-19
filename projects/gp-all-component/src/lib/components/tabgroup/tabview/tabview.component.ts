import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { TabDirective } from '../tab.directive';
import { TabOrientation } from '../../../resources/constants/tabview.enum';

@Component({
  selector: 'gp-tabgroup',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.scss'],
})
export class TabViewComponent implements OnInit {
  @ContentChildren(TabDirective) tabs: QueryList<TabDirective>;

  @Input() orientation: string;
  @Input() selected: string;
  @Input() activePosition = 0;

  @Output() onClick = new EventEmitter<number>();

  orientationLeft = false;

  ngOnInit() {
    this.activePosition = +this.selected || this.activePosition;
    this.orientationLeft = this.orientation === TabOrientation.Left;
  }

  selectTab(i) {
    this.activePosition = i;
    this.onClick.emit(i);
  }

  getTemplate() {
    if (this.tabs.toArray()[this.activePosition]) {
      return this.tabs.toArray()[this.activePosition].getElementRef();
    }
  }
}

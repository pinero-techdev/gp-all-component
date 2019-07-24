import { Component, Input } from '@angular/core';

@Component({
  selector: 'gp-tabview',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.scss'],
})
export class TabviewComponent {
  @Input()
  tabs: any;
}

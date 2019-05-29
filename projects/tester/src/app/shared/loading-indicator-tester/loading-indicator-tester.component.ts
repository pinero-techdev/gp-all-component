import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-indicator-tester',
  templateUrl: './loading-indicator-tester.component.html',
  styleUrls: ['./loading-indicator-tester.component.scss'],
})
export class LoadingIndicatorTesterComponent {
  @Input() msg = 'Recuperando datos ...';
  @Input() w = '40px';
  @Input() h = '40px';
}

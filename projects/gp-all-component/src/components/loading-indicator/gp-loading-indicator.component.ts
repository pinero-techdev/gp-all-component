import {Component, Input} from '@angular/core';

@Component({
  selector: 'gp-loading-indicator',
  templateUrl: './gp-loading-indicator.component.html'
})
export class GpLoadingIndicatorComponent {
  @Input() msg = 'Recuperando datos ...';
  @Input() w = '40px';
  @Input() h = '40px';
}

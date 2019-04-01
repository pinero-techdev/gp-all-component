import { Component, Input } from '@angular/core';

@Component({
  selector: 'gp-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})

export class LoadingIndicatorComponent {
  @Input() msg = 'Recuperando datos ...';
  @Input() w = '40px';
  @Input() h = '40px';
}
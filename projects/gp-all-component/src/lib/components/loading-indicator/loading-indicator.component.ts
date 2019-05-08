import { Component, Input } from '@angular/core';
import { LocaleES } from './../../resources/localization/es-ES.lang';

@Component({
  selector: 'gp-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent {
  @Input() msg = LocaleES.RETRIEVING_DATA;
  @Input() w = '40px';
  @Input() h = '40px';
}

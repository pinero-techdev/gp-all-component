import { Component, Input } from '@angular/core';
import { LocaleES } from '../../resources/localization/es-ES.lang';

@Component({
  selector: 'gp-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
})
export class LoadingIndicatorComponent {
  /**
   * Add a custom message while active
   */
  @Input() msg = LocaleES.RETRIEVING_DATA;

  /**
   * Set custom width for component
   */
  @Input() w = '40px';

  /**
   * Set custom height for component
   */
  @Input() h = '40px';
}

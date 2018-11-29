import {Component, Input} from '@angular/core';

@Component({
    selector: 'gp-app-loading-indicator',
    templateUrl: './gp.app.loading-indicator.component.html'
})
export class GpAppLoadingIndicatorComponent {
    @Input() msg: string = 'Recuperando datos ...';
    @Input() w: string = '40px';
    @Input() h: string = '40px';
}
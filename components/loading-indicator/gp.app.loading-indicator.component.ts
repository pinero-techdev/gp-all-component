import { Component, Input, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/primeng';

@Component({
  selector: 'gp-app-loading-indicator',
  templateUrl: './gp.app.loading-indicator.component.html'
})
export class GpAppLoadingIndicatorComponent {
  @Input()
  msg: string = 'Recuperando datos ...';
  @Input()
  w: string = '40px';
  @Input()
  h: string = '40px';
}

@NgModule({
  imports: [ReactiveFormsModule, ProgressSpinnerModule],
  exports: [GpAppLoadingIndicatorComponent],
  declarations: [GpAppLoadingIndicatorComponent]
})
export class GpAppLoadingIndicatorModule {}

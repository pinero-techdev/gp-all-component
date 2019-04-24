import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { ProgressSpinnerModule } from 'primeng/primeng';

@NgModule({
  declarations: [LoadingIndicatorComponent],
  imports: [CommonModule, ProgressSpinnerModule],
  exports: [LoadingIndicatorComponent],
})
export class LoadingIndicatorModule {}

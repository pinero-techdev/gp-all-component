import { MultiLanguageComponent } from './multi-language.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule, EditorModule } from 'primeng/primeng';
import { LoadingIndicatorModule } from '../loading-indicator/loading-indicator.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MultiLanguageComponent],
  imports: [
    CommonModule,
    ToastModule,
    DialogModule,
    TooltipModule,
    LoadingIndicatorModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
  ],
  exports: [MultiLanguageComponent],
})
export class MultiLanguageModule {}

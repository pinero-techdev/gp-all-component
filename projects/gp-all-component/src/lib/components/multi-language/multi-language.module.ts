import { MessagesService } from './../../services/core/messages.service';
import { MultiLanguageService } from './../../services/api/multi-language/multi-language.service';
import { MultiLanguageComponent } from './multi-language.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule, EditorModule } from 'primeng/primeng';
import { LoadingIndicatorModule } from '../loading-indicator/loading-indicator.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [MultiLanguageComponent],
  imports: [
    ButtonModule,
    CommonModule,
    DialogModule,
    EditorModule,
    FormsModule,
    HttpClientModule,
    LoadingIndicatorModule,
    ReactiveFormsModule,
    ToastModule,
    TooltipModule,
  ],
  exports: [MultiLanguageComponent],
  providers: [MultiLanguageService, MessagesService],
})
export class MultiLanguageModule {}

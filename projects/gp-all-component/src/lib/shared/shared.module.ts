import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { MessageService } from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    DialogModule,
    EditorModule,
    ToastModule,
    ProgressSpinnerModule,
    TooltipModule,
    InputTextModule,
    ScrollPanelModule,
    MessagesModule,
    MessageModule,
    MultiSelectModule,
    MenuModule,
  ],
  exports: [
    ButtonModule,
    DialogModule,
    EditorModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    TooltipModule,
    ScrollPanelModule,
    InputTextModule,
    MultiSelectModule,
    MenuModule,
  ],
  providers: [MessageService],
})
export class SharedModule {}

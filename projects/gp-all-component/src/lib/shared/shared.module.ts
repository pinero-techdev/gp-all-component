import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/primeng';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
@NgModule({
  declarations: [],
  imports: [
    CalendarModule,
    EditorModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    MenuModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    ScrollPanelModule,
    ToastModule,
    TooltipModule,
  ],
  exports: [
    CalendarModule,
    EditorModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    MenuModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    ScrollPanelModule,
    ToastModule,
    TooltipModule,
  ],
  providers: [MessageService],
})
export class SharedModule {}

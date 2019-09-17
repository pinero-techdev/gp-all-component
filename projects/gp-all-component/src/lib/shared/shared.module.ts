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
import { PaginatorModule } from 'primeng/paginator';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SessionStorageService } from '../services/session-storage/session-storage.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  imports: [
    CalendarModule,
    ConfirmDialogModule,
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
    PaginatorModule,
    ProgressSpinnerModule,
    ScrollPanelModule,
    ToastModule,
    TooltipModule,
    TriStateCheckboxModule,
  ],
  exports: [
    CalendarModule,
    ConfirmDialogModule,
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
    PaginatorModule,
    ProgressSpinnerModule,
    ScrollPanelModule,
    TriStateCheckboxModule,
    ToastModule,
    TooltipModule,
  ],
  providers: [ConfirmationService, MessageService, SessionStorageService],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ConfirmationService, MessageService, SessionStorageService],
    };
  }
}

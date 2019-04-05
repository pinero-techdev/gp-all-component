import { MainMenuProviderServiceMock } from './../components/main-menu/main-menu.mock';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { MessageService } from 'primeng/primeng';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
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
        TranslateModule,
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
        TranslateModule,
    ],
    providers: [MessageService, MainMenuProviderServiceMock],
})
export class SharedModule {}

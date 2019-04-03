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

@NgModule({
    declarations: [],
    imports: [
        ButtonModule,
        DialogModule,
        EditorModule,
        ScrollPanelModule,
        ToastModule,
        ProgressSpinnerModule,
        TooltipModule,
        InputTextModule,
        ScrollPanelModule,
        TranslateModule,
    ],
    exports: [
        ButtonModule,
        DialogModule,
        EditorModule,
        ScrollPanelModule,
        ToastModule,
        ProgressSpinnerModule,
        TooltipModule,
        ScrollPanelModule,
        InputTextModule,
        TranslateModule,
    ],
    providers: [MessageService],
})
export class SharedModule {}

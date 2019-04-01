import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { TranslateModule } from '@ngx-translate/core';

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
        TranslateModule
    ],
    exports: [
        ButtonModule,
        DialogModule,
        EditorModule,
        ScrollPanelModule,
        ToastModule,
        ProgressSpinnerModule,
        TooltipModule,
        InputTextModule,
        TranslateModule
    ],
})
export class SharedModule {}

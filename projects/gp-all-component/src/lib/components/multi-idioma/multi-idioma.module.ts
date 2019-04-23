import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiIdiomaComponent } from './multi-idioma.component';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule, EditorModule } from 'primeng/primeng';
import { LoadingIndicatorModule } from '../loading-indicator/loading-indicator.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [MultiIdiomaComponent],
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
    exports: [MultiIdiomaComponent],
})
export class MultiIdiomaModule {}

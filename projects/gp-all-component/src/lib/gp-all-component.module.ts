import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingIndicatorComponent } 
from './components/loading-indicator/loading-indicator.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [DynamicComponent, LoadingIndicatorComponent],
    imports: [
        BrowserModule,
        ButtonModule,
        ProgressSpinnerModule,
        BrowserAnimationsModule,
        CommonModule,
        ProgressSpinnerModule,
    ],
    exports: [DynamicComponent, LoadingIndicatorComponent],
})
export class GpAllComponentModule {}

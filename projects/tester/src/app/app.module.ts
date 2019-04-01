import { GpAllComponentModule } from 'gp-all-component/gp-all-component.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicTesterComponent } 
from './dynamic-tester/dynamic-tester.component';
import { FooTesterComponent } from './foo-tester/foo-tester.component';
import { LoadingIndicatorTesterComponent } 
from './loading-indicator-tester/loading-indicator-tester.component';

@NgModule({
    declarations: [
        AppComponent,
        DynamicTesterComponent,
        FooTesterComponent,
        LoadingIndicatorTesterComponent,
    ],
    entryComponents: [FooTesterComponent],
    exports: [FooTesterComponent],
    imports: [BrowserModule, CommonModule, GpAllComponentModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

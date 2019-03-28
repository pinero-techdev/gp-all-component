import { CommonModule } from '@angular/common';
import { GpAllComponentModule } from './../../../gp-all-component/src/lib/gp-all-component.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { FooTesterComponent } from './foo-tester/foo-tester.component';

@NgModule({
    declarations: [BarComponent, AppComponent, DynamicTesterComponent, FooTesterComponent],
    entryComponents: [FooTesterComponent],
    exports: [FooTesterComponent],
    imports: [BrowserModule, CommonModule, GpAllComponentModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

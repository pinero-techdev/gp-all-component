import { GpAllComponentModule } from './../../../gp-all-component/src/lib/gp-all-component.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, GpAllComponentModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

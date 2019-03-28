import { AppRoutingModule } from './app-routing.module';
import { GpAllComponentModule } from './../../../gp-all-component/src/lib/gp-all-component.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TesterModule } from './tester/tester.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, RouterModule, AppRoutingModule, GpAllComponentModule, TesterModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

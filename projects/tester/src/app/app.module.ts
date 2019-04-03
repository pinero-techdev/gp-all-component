import { FormsModule } from '@angular/forms';
import { GpAllComponentModule } from '../../../gp-all-component/src/lib/gp-all-component.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { FooTesterComponent } from './foo-tester/foo-tester.component';
import { LoadingIndicatorTesterComponent } from './loading-indicator-tester/loading-indicator-tester.component';
import { MenuTesterComponent } from './menu-tester/menu-tester.component';
import { MultiIdiomaTesterComponent } from './multi-idioma-tester/multi-idioma-tester.component';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [
        AppComponent,
        DynamicTesterComponent,
        FooTesterComponent,
        LoadingIndicatorTesterComponent,
        MenuTesterComponent,
        MultiIdiomaTesterComponent,
    ],
    entryComponents: [FooTesterComponent],
    exports: [FooTesterComponent],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        GpAllComponentModule,
        RouterModule.forRoot([])
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

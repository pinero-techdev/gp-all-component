import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MainMenuProviderService } from '../../../gp-all-component/src/lib/services/api/main-menu/main-menu-provider.service';
import { GpAllComponentModule } from '../../../gp-all-component/src/lib/gp-all-component.module';
import { MultiSelectModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { FooTesterComponent } from './foo-tester/foo-tester.component';
import { LoadingIndicatorTesterComponent } from './loading-indicator-tester/loading-indicator-tester.component';
import { LoginTesterComponent } from './login-tester/login-tester.component';
import { MainMenuTesterComponent } from './main-menu-tester/main-menu-tester.component';
import { MainMenuTesterService } from './main-menu-tester/main-menu-tester.service';
import { MultiIdiomaTesterComponent } from './multi-idioma-tester/multi-idioma-tester.component';
import { RatingTesterComponent } from './rating-tester/rating-tester.component';

@NgModule({
    declarations: [
        AppComponent,
        DynamicTesterComponent,
        FooTesterComponent,
        LoadingIndicatorTesterComponent,
        MultiIdiomaTesterComponent,
        MainMenuTesterComponent,
        LoginTesterComponent,
        RatingTesterComponent,
    ],
    entryComponents: [FooTesterComponent],
    exports: [FooTesterComponent],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        GpAllComponentModule,
        MultiSelectModule,
        RouterModule.forRoot([]),
    ],
    providers: [
        {
            provide: MainMenuProviderService,
            useClass: MainMenuTesterService,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

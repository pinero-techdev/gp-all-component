import { MultiSelectTesterComponent } from './multi-select-tester/multi-select-tester.component';
import { MainMenuTesterService } from './main-menu-tester/main-menu-tester.service';
import {
    MainMenuProviderService, //
} from '@lib/services/api/main-menu/main-menu-provider.service';
import { MainMenuTesterComponent } from './main-menu-tester/main-menu-tester.component';
import {
    LoadingIndicatorTesterComponent, //
} from './loading-indicator-tester/loading-indicator-tester.component';
import { MultiIdiomaTesterComponent } from './multi-idioma-tester/multi-idioma-tester.component';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { CommonModule } from '@angular/common';
import {
    ForgotPasswordTesterComponent, //
} from './forgot-password-tester/forgot-password-tester.component';
import { LoginTesterComponent } from './login-tester/login-tester.component';
import { NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared.routing.module';
import { GpAllComponentModule } from '@lib/gp-all-component.module';
import { RatingTesterComponent } from './rating-tester/rating-tester.component';

@NgModule({
    declarations: [
        DynamicTesterComponent,
        ForgotPasswordTesterComponent,
        LoadingIndicatorTesterComponent,
        LoginTesterComponent,
        MainMenuTesterComponent,
        MultiIdiomaTesterComponent,
        MultiSelectTesterComponent,
        RatingTesterComponent,
    ],
    imports: [CommonModule, GpAllComponentModule, SharedRoutingModule],
    exports: [
        DynamicTesterComponent,
        ForgotPasswordTesterComponent,
        LoadingIndicatorTesterComponent,
        LoginTesterComponent,
        MainMenuTesterComponent,
        MultiIdiomaTesterComponent,
        MultiSelectTesterComponent,
        RatingTesterComponent,
    ],
    providers: [{ provide: MainMenuProviderService, useClass: MainMenuTesterService }],
})
export class SharedModule {}

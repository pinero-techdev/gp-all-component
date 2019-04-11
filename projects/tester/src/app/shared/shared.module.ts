import { MainMenuTesterService } from './main-menu-tester/main-menu-tester.service';
import {
    MainMenuProviderService, //
} from './../../../../gp-all-component/src/lib/services/api/main-menu/main-menu-provider.service';
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

@NgModule({
    declarations: [
        DynamicTesterComponent,
        LoadingIndicatorTesterComponent,
        MultiIdiomaTesterComponent,
        MainMenuTesterComponent,
        LoginTesterComponent,
        ForgotPasswordTesterComponent,
    ],
    imports: [CommonModule, GpAllComponentModule, SharedRoutingModule],
    exports: [
        DynamicTesterComponent,
        LoadingIndicatorTesterComponent,
        MultiIdiomaTesterComponent,
        MainMenuTesterComponent,
        LoginTesterComponent,
        ForgotPasswordTesterComponent,
    ],
    providers: [{ provide: MainMenuProviderService, useClass: MainMenuTesterService }],
})
export class SharedModule {}

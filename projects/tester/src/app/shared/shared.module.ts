import { MultiSelectTesterComponent } from './multi-select-tester/multi-select-tester.component';
import { MainMenuTesterService } from './main-menu-tester/main-menu-tester.service';
import {
  MainMenuProviderService, //
} from '@lib/services/api/main-menu/main-menu-provider.service';
import { MainMenuTesterComponent } from './main-menu-tester/main-menu-tester.component';
import {
  LoadingIndicatorTesterComponent, //
} from './loading-indicator-tester/loading-indicator-tester.component';
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
import { TableWrapperModule } from '@lib/components/table-wrapper/table-wrapper.module';
import { TableFrameTesterComponent } from './table-frame-tester/table-frame-tester.component';
import { MultiLanguageTesterComponent } from './multi-language-tester/multi-language-tester.component';
import { TopbarTesterComponent } from './topbar-tester/topbar-tester.component';
@NgModule({
  declarations: [
    DynamicTesterComponent,
    ForgotPasswordTesterComponent,
    LoadingIndicatorTesterComponent,
    LoginTesterComponent,
    MainMenuTesterComponent,
    MultiLanguageTesterComponent,
    MultiSelectTesterComponent,
    RatingTesterComponent,
    TableFrameTesterComponent,
    TopbarTesterComponent,
  ],
  imports: [CommonModule, GpAllComponentModule, SharedRoutingModule, TableWrapperModule],
  exports: [
    DynamicTesterComponent,
    ForgotPasswordTesterComponent,
    LoadingIndicatorTesterComponent,
    LoginTesterComponent,
    MainMenuTesterComponent,
    MultiLanguageTesterComponent,
    MultiSelectTesterComponent,
    RatingTesterComponent,
    TopbarTesterComponent,
  ],
  providers: [{ provide: MainMenuProviderService, useClass: MainMenuTesterService }],
})
export class SharedModule {}

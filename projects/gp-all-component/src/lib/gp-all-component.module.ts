import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_CONTROL_VALUE_ACCESSOR } from './resources/constants/custom-control-value-accessor.constant';
import { CommonModule } from '@angular/common';
import { CoreModule } from './services/core/core.module';
import { DynamicModule } from './components/dynamic/dynamic.module';
import { EmptyModule } from './components/empty/empty.module';
import { ForgotPasswordModule } from './components/forgot-password/forgot-password.module';
import { FormWrapperModule } from './components/form-wrapper/form-wrapper.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GPUtil } from './services/core/gp-util.service';
import { GpAllComponentRoutingModule } from './gp-all-component.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoadingIndicatorModule } from './components/loading-indicator/loading-indicator.module';
import { LoginModule } from './components/login/login.module';
import { LoginService } from './services/api/login/login.service';
import { MainMenuModule } from './components/main-menu/main-menu.module';
import { MainMenuProviderService } from './services/api/main-menu/main-menu-provider.service';
import { MainMenuService } from './services/api/main-menu/main-menu.service';
import { MessagesService } from './services/core/messages.service';
import { MultiLanguageModule } from './components/multi-language/multi-language.module';
import { MultiSelectModule } from './components/multi-select/multi-select.module';
import { RedirectModule } from './components/redirect/redirect.module';
import { NgModule } from '@angular/core';
import { RatingModule } from './components/rating/rating.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { TableWrapperModule } from './components/table-wrapper/table-wrapper.module';
import { TopbarModule } from './components/topbar/topbar.module';
import { LowercaseDirectiveModule } from './directives/lowercase-directive/lowercase-directive.module';
import { UppercaseDirectiveModule } from './directives/uppercase-directive/uppercase-directive.module';
import { FocusDirectiveModule } from './directives/focus-directive/focus-directive.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    CoreModule,
    FormsModule,
    GpAllComponentRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,

    // Directives
    FocusDirectiveModule,
    LowercaseDirectiveModule,
    UppercaseDirectiveModule,

    // Library Modules
    DynamicModule,
    EmptyModule,
    ForgotPasswordModule,
    FormWrapperModule,
    LoadingIndicatorModule,
    LoginModule,
    MainMenuModule,
    MultiLanguageModule,
    MultiSelectModule,
    RatingModule,
    TableWrapperModule,
    TopbarModule,
    RedirectModule,
  ],
  exports: [
    // We export library modules
    DynamicModule,
    EmptyModule,
    ForgotPasswordModule,
    FormWrapperModule,
    LoadingIndicatorModule,
    LoginModule,
    MainMenuModule,
    MultiLanguageModule,
    MultiSelectModule,
    RatingModule,
    TopbarModule,
    RedirectModule,

    // Directives
    FocusDirectiveModule,
    LowercaseDirectiveModule,
    UppercaseDirectiveModule,
  ],
  providers: [
    CUSTOM_CONTROL_VALUE_ACCESSOR,
    GPUtil,
    LoginService,
    MainMenuProviderService,
    MainMenuService,
    MessagesService,
  ],
})
export class GpAllComponentModule {}

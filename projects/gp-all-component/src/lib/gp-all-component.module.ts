import { MultiLanguageService } from './services/api/multi-language/multi-language.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_CONTROL_VALUE_ACCESSOR } from './resources/constants/custom-control-value-accessor.constant';
import { CommonModule } from '@angular/common';
import { DynamicModule } from './components/dynamic/dynamic.module';
import { EmptyModule } from './components/empty/empty.module';
import { ForgotPasswordModule } from './components/forgot-password/forgot-password.module';
import { FormWrapperModule } from './components/form-wrapper/form-wrapper.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GPUtil } from './services/core/gp-util.service';
import { GlobalService } from './services/core/global.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingIndicatorModule } from './components/loading-indicator/loading-indicator.module';
import { LoginModule } from './components/login/login.module';
import { MainMenuModule } from './components/main-menu/main-menu.module';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { MultiLanguageModule } from './components/multi-language/multi-language.module';
import { MultiSelectModule } from './components/multi-select/multi-select.module';
import { NgModule } from '@angular/core';
import { RatingModule } from './components/rating/rating.module';
import { RedirectModule } from './components/redirect/redirect.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { TableWrapperModule } from './components/table-wrapper/table-wrapper.module';
import { TopbarModule } from './components/topbar/topbar.module';
import { LowercaseDirectiveModule } from './directives/lowercase-directive/lowercase-directive.module';
import { UppercaseDirectiveModule } from './directives/uppercase-directive/uppercase-directive.module';
import { FocusDirectiveModule } from './directives/focus-directive/focus-directive.module';
import { environmentBase } from './util/environment';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
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

    // Directives
    FocusDirectiveModule,
    LowercaseDirectiveModule,
    UppercaseDirectiveModule,
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
  providers: [CUSTOM_CONTROL_VALUE_ACCESSOR, GPUtil],
})
export class GpAllComponentModule {
  public static forRoot(environment: any): ModuleWithProviders {
    this.setGlobal(environment);

    return {
      ngModule: GpAllComponentModule,
      providers: [
        {
          provide: 'env',
          useValue: environment,
        },
      ],
    };
  }

  private static setGlobal(environment: any) {
    const env = { ...environmentBase, ...environment };
    GlobalService.setBaseUrl(env.baseUrl);
    GlobalService.setLoginServiceUrl(env.loginUrl);
    GlobalService.setMenuServiceUrl(env.menuUrl);
    GlobalService.setApp(env.appName);
    GlobalService.setAplicacionLogin(env.appName);
    GlobalService.setLogged(false);
    GlobalService.setApplicationTitle(env.appTitle);
  }
}

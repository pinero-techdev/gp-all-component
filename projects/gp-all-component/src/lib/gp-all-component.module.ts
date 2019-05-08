import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_CONTROL_VALUE_ACCESSOR } from './resources/constants/custom-control-value-accessor.constant';
import { CommonModule } from '@angular/common';
import { CoreModule } from './services/core/core.module';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { DynamicModule } from './components/dynamic/dynamic.module';
import { EmptyComponent } from './components/empty/empty.component';
import { EmptyModule } from './components/empty/empty.module';
import { ForgotPasswordModule } from './components/forgot-password/forgot-password.module';
import { FormCalendarFieldComponent } from './components/form-wrapper/components/form-calendar-field/form-calendar-field.component';
import { FormCheckboxFieldComponent } from './components/form-wrapper/components/form-checkbox-field/form-checkbox-field.component';
import { FormDropdownFieldComponent } from './components/form-wrapper/components/form-dropdown-field/form-dropdown-field.component';
import { FormDropdownRelatedFieldComponent } from './components/form-wrapper/components/form-dropdown-related-field/form-dropdown-related-field.component';
import { FormImgFieldComponent } from './components/form-wrapper/components/form-img-field/form-img-field.component';
import { FormSwitchFieldComponent } from './components/form-wrapper/components/form-switch-field/form-switch-field.component';
import { FormTextAreaFieldComponent } from './components/form-wrapper/components/form-text-area-field/form-text-area-field.component';
import { FormTextFieldComponent } from './components/form-wrapper/components/form-text-field/form-text-field.component';
import { FormTimeFieldComponent } from './components/form-wrapper/components/form-time-field/form-time-field.component';
import { FormWrapperModule } from './components/form-wrapper/form-wrapper.module';
import { FormWysiwygFieldComponent } from './components/form-wrapper/components/form-wysiwyg-field/form-wysiwyg-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GPUtil } from './services/core/gp-util.service';
import { GpAllComponentRoutingModule } from './gp-all-component.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { LoadingIndicatorModule } from './components/loading-indicator/loading-indicator.module';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from './components/login/login.module';
import { LoginService } from './services/api/login/login.service';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainMenuModule } from './components/main-menu/main-menu.module';
import { MainMenuProviderService } from './services/api/main-menu/main-menu-provider.service';
import { MainMenuService } from './services/api/main-menu/main-menu.service';
import { MessagesService } from './services/core/messages.service';
import { MultiLanguageModule } from './components/multi-language/multi-language.module';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { MultiSelectModule } from './components/multi-select/multi-select.module';
import { NgModule } from '@angular/core';
import { RatingComponent } from './components/rating/rating.component';
import { RatingModule } from './components/rating/rating.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { TableCrudComponent } from './components/table-wrapper/components/table-crud/table-crud.component';
import { TableFrameComponent } from './components/table-wrapper/components/table-frame/table-frame.component';
import { TableWrapperModule } from './components/table-wrapper/table-wrapper.module';
import { TopbarModule } from './components/topbar/topbar.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CoreModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    GpAllComponentRoutingModule,

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

    // Directives
    // FocusDirective,
    // LowercaseDirective,
    // UppercaseDirective
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

    // And we export components to maintain
    // compatibility with previous versions
    DynamicComponent,
    EmptyComponent,
    LoadingIndicatorComponent,
    LoginComponent,
    MainMenuComponent,
    MultiSelectComponent,
    RatingComponent,

    // Form Wrapper components
    FormCalendarFieldComponent,
    FormCheckboxFieldComponent,
    FormDropdownFieldComponent,
    FormDropdownRelatedFieldComponent,
    FormImgFieldComponent,
    FormSwitchFieldComponent,
    FormTextAreaFieldComponent,
    FormTextFieldComponent,
    FormTimeFieldComponent,
    FormWysiwygFieldComponent,

    // Table Wrapper components
    TableCrudComponent,
    TableFrameComponent,

    // // Directives
    // FocusDirective,
    // LowercaseDirective,
    // UppercaseDirective,
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

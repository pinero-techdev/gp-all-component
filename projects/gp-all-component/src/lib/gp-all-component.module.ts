import { MessagesService } from './services/core/messages.service';
import { MainMenuProviderService } from '@lib/services/api/main-menu/main-menu-provider.service';
import { MainMenuService } from './services/api/main-menu/main-menu.service';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LoginService } from './services/api/login/login.service';
import { CoreModule } from './services/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyComponent } from './components/empty/empty.component';
import { CUSTOM_CONTROL_VALUE_ACCESSOR } from './resources/constants/custom-control-value-accessor.constant';
import { LoginComponent } from './components/login/login.component';
import { GPUtil } from './services/core/gp-util.service';
import { MultiLanguageModule } from './components/multi-language/multi-language.module';
import { LoadingIndicatorModule } from './components/loading-indicator/loading-indicator.module';
import { DynamicModule } from './components/dynamic/dynamic.module';
import { EmptyModule } from './components/empty/empty.module';
import { MainMenuModule } from './components/main-menu/main-menu.module';
import { LoginModule } from './components/login/login.module';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { MultiSelectModule } from './components/multi-select/multi-select.module';
import { RatingModule } from './components/rating/rating.module';
import { RatingComponent } from './components/rating/rating.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { FormCalendarFieldComponent } from './components/form-wrapper/components/form-calendar-field/form-calendar-field.component';
import { TableCrudComponent } from './components/table-wrapper/components/table-crud/table-crud.component';
import { TableWrapperModule } from './components/table-wrapper/table-wrapper.module';
import { FormCheckboxFieldComponent } from './components/form-wrapper/components/form-checkbox-field/form-checkbox-field.component';
import { FormDropdownFieldComponent } from './components/form-wrapper/components/form-dropdown-field/form-dropdown-field.component';
import { FormSwitchFieldComponent } from './components/form-wrapper/components/form-switch-field/form-switch-field.component';
import { FormTextAreaFieldComponent } from './components/form-wrapper/components/form-text-area-field/form-text-area-field.component';
import { FormTextFieldComponent } from './components/form-wrapper/components/form-text-field/form-text-field.component';
import { FormTimeFieldComponent } from './components/form-wrapper/components/form-time-field/form-time-field.component';
import { FormWysiwygFieldComponent } from './components/form-wrapper/components/form-wysiwyg-field/form-wysiwyg-field.component';
import { FormDropdownRelatedFieldComponent } from './components/form-wrapper/components/form-dropdown-related-field/form-dropdown-related-field.component';
import { FormImgFieldComponent } from './components/form-wrapper/components/form-img-field/form-img-field.component';
import { TableFrameComponent } from './components/table-wrapper/components/table-frame/table-frame.component';
import { FormWrapperModule } from './components/form-wrapper/form-wrapper.module';
import { ForgotPasswordModule } from './components/forgot-password/forgot-password.module';

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

        // Library Modules
        LoginModule,
        RatingModule,
        DynamicModule,
        FormWrapperModule,
        MultiLanguageModule,
        MultiSelectModule,
        LoadingIndicatorModule,
        MainMenuModule,
        EmptyModule,
        ForgotPasswordModule,
        TableWrapperModule,
    ],
    exports: [
        // We export library modules
        DynamicModule,
        MultiSelectModule,
        LoginModule,
        MainMenuModule,
        RatingModule,
        EmptyModule,
        ForgotPasswordModule,
        LoadingIndicatorModule,
        FormWrapperModule,
        MultiLanguageModule,

        // And we export components to maintain
        // compatibility with previous versions
        DynamicComponent,
        MultiSelectComponent,
        LoginComponent,
        MainMenuComponent,
        RatingComponent,
        EmptyComponent,
        LoadingIndicatorComponent,

        // Form Wrapper components
        FormCalendarFieldComponent,
        FormCheckboxFieldComponent,
        FormDropdownFieldComponent,
        FormSwitchFieldComponent,
        FormTextAreaFieldComponent,
        FormTextFieldComponent,
        FormTimeFieldComponent,
        FormWysiwygFieldComponent,
        FormDropdownRelatedFieldComponent,
        FormImgFieldComponent,

        // Table Wrapper components
        TableCrudComponent,
        TableFrameComponent,
    ],
    providers: [
        LoginService,
        MainMenuService,
        GPUtil,
        MessagesService,
        MainMenuProviderService,
        CUSTOM_CONTROL_VALUE_ACCESSOR,
    ],
})
export class GpAllComponentModule {}

import { ForgotPasswordModule } from './../../../../gp-all-component/src/lib/components/forgot-password/forgot-password.module';
import { CalendarTesterComponent } from './calendar-tester/calendar-tester.component';
import { CommonModule } from '@angular/common';
import { DropdownRelatedTesterComponent } from './dropdown-related-tester/dropdown-related-tester.component';
import { DropdownTesterComponent } from './dropdown-tester/dropdown-tester.component';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { FormCheckboxFieldTesterComponent } from './form-checkbox-field-tester/form-checkbox-field-tester.component';
import { ImgTesterComponent } from './img-tester/img-tester.component';
import { LoadingIndicatorTesterComponent } from './loading-indicator-tester/loading-indicator-tester.component';
import { MainMenuTesterComponent } from './main-menu-tester/main-menu-tester.component';
import { MultiLanguageTesterComponent } from './multi-language-tester/multi-language-tester.component';
import { MultiSelectTesterComponent } from './multi-select-tester/multi-select-tester.component';
import { NgModule } from '@angular/core';
import { RatingTesterComponent } from './rating-tester/rating-tester.component';
import { SharedRoutingModule } from './shared.routing.module';
import { SwitchFieldTesterComponent } from './switch-field-tester/switch-field-tester.component';
import { TableCrudTesterComponent } from './table-crud-tester/table-crud-tester.component';
import { TableFrameTesterComponent } from './table-frame-tester/table-frame-tester.component';
import { TextFieldTesterComponent } from './text-field-tester/text-field-tester.component';
import { TextareaTesterComponent } from './textarea-tester/textarea-tester.component';
import { TimeFieldTesterComponent } from './time-field-tester/time-field-tester.component';
import { TopbarTesterComponent } from './topbar-tester/topbar-tester.component';
import { WysiwygTesterComponent } from './wysiwyg-tester/wysiwyg-tester.component';
import { RedirectTesterComponent } from './redirect-tester/redirect-tester.component';
import { environment } from '../../environments/environment.prod';
import {
  DynamicModule,
  MainMenuModule,
  GlobalServiceModule,
  MultiLanguageModule,
  MultiSelectModule,
  TableWrapperModule,
  FormWrapperModule,
  LoadingIndicatorModule,
  RatingModule,
  RedirectModule,
  TopbarModule,
  LoginModule,
} from 'gp-all-component';

@NgModule({
  declarations: [
    CalendarTesterComponent,
    DropdownRelatedTesterComponent,
    DropdownTesterComponent,
    DynamicTesterComponent,
    FormCheckboxFieldTesterComponent,
    ImgTesterComponent,
    LoadingIndicatorTesterComponent,
    MainMenuTesterComponent,
    MultiLanguageTesterComponent,
    MultiSelectTesterComponent,
    RatingTesterComponent,
    RedirectTesterComponent,
    SwitchFieldTesterComponent,
    TableCrudTesterComponent,
    TableFrameTesterComponent,
    TextFieldTesterComponent,
    TextareaTesterComponent,
    TimeFieldTesterComponent,
    TopbarTesterComponent,
    WysiwygTesterComponent,
  ],
  imports: [
    CommonModule,
    DynamicModule,
    ForgotPasswordModule,
    FormWrapperModule,
    GlobalServiceModule.forRoot(environment),
    LoadingIndicatorModule,
    LoginModule,
    MainMenuModule,
    MultiLanguageModule,
    MultiSelectModule,
    RatingModule,
    RedirectModule,
    SharedRoutingModule,
    TableWrapperModule,
    TopbarModule,
  ],
  exports: [
    DropdownRelatedTesterComponent,
    DropdownTesterComponent,
    DynamicTesterComponent,
    FormCheckboxFieldTesterComponent,
    ImgTesterComponent,
    LoadingIndicatorTesterComponent,
    MainMenuTesterComponent,
    MultiLanguageTesterComponent,
    MultiSelectTesterComponent,
    RatingTesterComponent,
    SwitchFieldTesterComponent,
    TextareaTesterComponent,
    TextareaTesterComponent,
    TopbarTesterComponent,
    WysiwygTesterComponent,
    TimeFieldTesterComponent,
    TextFieldTesterComponent,
  ],
})
export class SharedModule {}

import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {CustomFormsModule} from 'ng2-validation';

import {
  AccordionModule,
  AutoCompleteModule,
  BlockUIModule,
  CalendarModule,
  ChartModule,
  CheckboxModule,
  ChipsModule,
  ConfirmDialogModule,
  DataGridModule,
  DataListModule,
  DataTableModule,
  DialogModule,
  DropdownModule,
  EditorModule,
  FieldsetModule,
  FileUploadModule,
  GalleriaModule,
  GrowlModule,
  InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  ListboxModule,
  MenubarModule,
  MenuModule,
  MessagesModule,
  MultiSelectModule,
  OrderListModule,
  OverlayPanelModule,
  PanelMenuModule,
  PanelModule,
  PickListModule,
  ProgressBarModule,
  ProgressSpinnerModule,
  RadioButtonModule,
  RatingModule,
  ScheduleModule,
  ScrollPanelModule,
  SharedModule,
  SlideMenuModule,
  SliderModule,
  SpinnerModule,
  SplitButtonModule,
  TabViewModule,
  ToolbarModule,
  TooltipModule,
  TreeModule,
  TriStateCheckboxModule
} from 'primeng/primeng';
import 'rxjs/Observable';
import {GpDynamicComponent} from './components/dynamic/gp-dynamic.component';

import {GpEmptyComponent} from './components/empty/gp-empty.component';
import {GpLoadingIndicatorComponent} from './components/loading-indicator/gp-loading-indicator.component';
import {GpLoginComponent} from './components/login/gp-login.component';
import {GpMainMenuComponent} from './components/menu/gp-main-menu.component';
import {GpMultiIdiomaComponent} from './components/multi-idioma/components/gp-multi-idioma.component';
import {GpMultiSelectComponent} from './components/multiselect/components/gp-multi-select.component';
import {GpModificaPasswordComponent} from './components/password/gp-modifica-password.component';
import {GpRatingComponent} from './components/rating/gp-rating.component';
import {GpRedirectComponent} from './components/redirect/gp-redirect.component';
import {GpFormCalendarFieldComponent} from './components/tables/gp-form/components/gp-form-calendar-field.component';
import {GpFormCheckboxFieldComponent} from './components/tables/gp-form/components/gp-form-checkbox-field.component';
import {GpFormDropdownFieldComponent} from './components/tables/gp-form/components/gp-form-dropdown-field.component';
import {GpFormDropdownRelatedfieldComponent} from './components/tables/gp-form/components/gp-form-dropdown-related-field.component';
import {GpFormImgFieldComponent} from './components/tables/gp-form/components/gp-form-img-field.component';
import {GpFormSwitchFieldComponent} from './components/tables/gp-form/components/gp-form-switch-field.component';
import {GpFormTextFieldComponent} from './components/tables/gp-form/components/gp-form-text-field.component';
import {GpFormTextAreaFieldComponent} from './components/tables/gp-form/components/gp-form-textarea-field.component';
import {GpFormTimeFieldComponent} from './components/tables/gp-form/components/gp-form-time-field.component';
import {GpFormWysiwygFieldComponent} from './components/tables/gp-form/components/gp-form-wysiwyg-field.component';
import {GpTableCrudComponent} from './components/tables/gp-table/components/gp-table-crud.component';
import {GpTableFrameComponent} from './components/tables/gp-table/components/gp-table-frame.component';
import {GpTopbarComponent} from './components/topbar/gp-topbar-component';
import {FocusDirective} from './directives/focus.directive';
import {LowercaseDirective} from './directives/lowercase.directive';
import {UppercaseDirective} from './directives/uppercase.directive';
import {AuthGuard} from './services/auth-guard.service';
import {CommonService} from './services/common.service';
import {GlobalService} from './services/global.service';
import {LoginService} from './services/login.service';
import {MenuService} from './services/menu.service';
import {MultiIdomaService} from './services/multi-idioma.service';
import {TableService} from './services/table.service';

@NgModule({
  imports: [
    AccordionModule, AutoCompleteModule, BlockUIModule, BrowserAnimationsModule, BrowserModule,
    CalendarModule, ChartModule, CheckboxModule, ChipsModule, ConfirmDialogModule, CustomFormsModule,
    DataGridModule, DataListModule, DataTableModule, DialogModule, DropdownModule, EditorModule, FieldsetModule,
    FileUploadModule, FormsModule, GalleriaModule, GrowlModule, HttpClientModule, HttpModule, InputSwitchModule,
    InputTextModule, InputTextareaModule, ListboxModule, MenuModule, MenubarModule, MessagesModule,
    MultiSelectModule, OrderListModule, OverlayPanelModule, PanelMenuModule, PanelModule,
    PickListModule, ProgressBarModule, ProgressSpinnerModule, RadioButtonModule,
    RatingModule, ReactiveFormsModule, RouterModule, ScheduleModule, ScrollPanelModule,
    SharedModule, SlideMenuModule, SliderModule, SpinnerModule,
    SplitButtonModule, TabViewModule, ToolbarModule, TooltipModule, TreeModule, TriStateCheckboxModule
  ],
  exports: [
    // Directives.
    FocusDirective, LowercaseDirective, UppercaseDirective,

    // Components.
    GpDynamicComponent, GpEmptyComponent, GpLoadingIndicatorComponent,
    GpLoginComponent, GpMainMenuComponent, GpModificaPasswordComponent,
    GpMultiIdiomaComponent, GpMultiSelectComponent, GpRatingComponent, GpRedirectComponent,
    GpTableCrudComponent, GpTableFrameComponent, GpTopbarComponent,
    GpFormCalendarFieldComponent, GpFormCheckboxFieldComponent, GpFormDropdownFieldComponent,
    GpFormDropdownRelatedfieldComponent, GpFormImgFieldComponent, GpFormSwitchFieldComponent, GpFormTextAreaFieldComponent,
    GpFormTextFieldComponent, GpFormTimeFieldComponent, GpFormWysiwygFieldComponent
  ],
  declarations: [
    // Directives.
    FocusDirective, LowercaseDirective, UppercaseDirective,

    // Components.
    GpDynamicComponent, GpEmptyComponent, GpLoadingIndicatorComponent,
    GpLoginComponent, GpMainMenuComponent, GpModificaPasswordComponent,
    GpMultiIdiomaComponent, GpMultiSelectComponent, GpRatingComponent, GpRedirectComponent,
    GpTableCrudComponent, GpTableFrameComponent, GpTopbarComponent,
    GpFormCalendarFieldComponent, GpFormCheckboxFieldComponent, GpFormDropdownFieldComponent,
    GpFormDropdownRelatedfieldComponent, GpFormImgFieldComponent, GpFormSwitchFieldComponent, GpFormTextAreaFieldComponent,
    GpFormTextFieldComponent, GpFormTimeFieldComponent, GpFormWysiwygFieldComponent
  ],
  providers: [MenuService, AuthGuard, CommonService, GlobalService, LoginService, MultiIdomaService, TableService]
})
export class GpAllModule {
}

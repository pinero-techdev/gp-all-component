import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import 'rxjs/Rx';

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

import {GpAppEmptyComponent} from './components/empty/gp.app.empty.component';
import {GpAppTopBarComponent} from './components/menu/gp.app.topbar.component';
import {GpAppRedirectComponent} from './components/redirect/gp.app.redirect.component';
import {GpAppTableFrameComponent} from './components/tables/gp-app-table-frame.component';
import {GpAppTableCrudComponent} from './components/tables/gp-app-table-crud.component';
import {GpAppRemoteFsysPickerComponent} from './components/remote-fsys/gp.app.remote-fsys-picker.component';
import {GpFormCalendarFieldComponent} from './components/tables/gp-form-calendar-field.component';
import {GpFormCheckboxFieldComponent} from './components/tables/gp-form-checkbox-field.component';
import {GpFormDropdownFieldComponent} from './components/tables/gp-form-dropdown-field.component';
import {GpFormTextAreaFieldComponent} from './components/tables/gp-form-textarea-field.component';
import {GpFormSwitchFieldComponent} from './components/tables/gp-form-switch-field.component';
import {GpFormImgFieldComponent} from './components/tables/gp-form-img-field.component';
import {GpFormDropdownRelatedfieldComponent} from './components/tables/gp-form-dropdown-related-field.component';
import {GpFormTextFieldComponent} from './components/tables/gp-form-text-field.component';
import {GpFormTimeFieldComponent} from './components/tables/gp-form-time-field.component';
import {GpFormWysiwygFieldComponent} from './components/tables/gp-form-wysiwyg-field.component';
import {GpAppRatingComponent} from './components/rating/gp.app.rating.component';
import {GpAppMultiSelectComponent} from './components/multiselect/gp.app.multi-select.component';
import {GpAppMultiIdiomaComponent} from './components/multi-idioma/gp.app.multi-idioma.component';
import {GpAppModificaPasswordComponent} from './components/password/gp.app.modifica-password.component';
import {GpAppMainMenuComponent} from './components/menu/gp.app.main.menu.component';
import {GpAppLoginComponent} from './components/login/gp.app.login.component';
import {GpAppLoadingIndicatorComponent} from './components/loading-indicator/gp.app.loading-indicator.component';
import {GPDynamicComponent} from './components/dynamic/gp.dynamic.component';
import {GPUppercaseDirective} from './directives/gp-uppercase.directive';
import {GPLowercaseDirective} from './directives/gp-lowercase.directive';
import {FocusDirective} from './directives/focus.directive';
import {AuthGuard} from './resources/data/authGuard';
import {AppMenuService} from './services/app-menu.service';
import {CommonService} from './services/common.service';
import {GlobalService} from './services/global.service';
import {LoginService} from './services/login.service';
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
                  FocusDirective, GPLowercaseDirective, GPUppercaseDirective,

                  // Components.
                  GPDynamicComponent, GpAppEmptyComponent, GpAppLoadingIndicatorComponent,
                  GpAppLoginComponent, GpAppMainMenuComponent, GpAppModificaPasswordComponent,
                  GpAppMultiIdiomaComponent, GpAppMultiSelectComponent, GpAppRatingComponent, GpAppRedirectComponent,
                  GpAppRemoteFsysPickerComponent, GpAppTableCrudComponent, GpAppTableFrameComponent, GpAppTopBarComponent,
                  GpFormCalendarFieldComponent, GpFormCheckboxFieldComponent, GpFormDropdownFieldComponent,
                  GpFormDropdownRelatedfieldComponent, GpFormImgFieldComponent, GpFormSwitchFieldComponent, GpFormTextAreaFieldComponent,
                  GpFormTextFieldComponent, GpFormTimeFieldComponent, GpFormWysiwygFieldComponent
              ],
              declarations: [
                  // Directives.
                  FocusDirective, GPLowercaseDirective, GPUppercaseDirective,

                  // Components.
                  GPDynamicComponent, GpAppEmptyComponent, GpAppLoadingIndicatorComponent,
                  GpAppLoginComponent, GpAppMainMenuComponent, GpAppModificaPasswordComponent,
                  GpAppMultiIdiomaComponent, GpAppMultiSelectComponent, GpAppRatingComponent, GpAppRedirectComponent,
                  GpAppRemoteFsysPickerComponent, GpAppTableCrudComponent, GpAppTableFrameComponent, GpAppTopBarComponent,
                  GpFormCalendarFieldComponent, GpFormCheckboxFieldComponent, GpFormDropdownFieldComponent,
                  GpFormDropdownRelatedfieldComponent, GpFormImgFieldComponent, GpFormSwitchFieldComponent, GpFormTextAreaFieldComponent,
                  GpFormTextFieldComponent, GpFormTimeFieldComponent, GpFormWysiwygFieldComponent
              ],
              providers: [AppMenuService, AuthGuard, CommonService, GlobalService, LoginService, MultiIdomaService, TableService]
          })
export class GpAllModule {
}

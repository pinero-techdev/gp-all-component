import { CommonModule } from '@angular/common';
import { DropdownRelatedTesterComponent } from './dropdown-related-tester/dropdown-related-tester.component';
import { DropdownTesterComponent } from './dropdown-tester/dropdown-tester.component';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { GpAllComponentModule } from '@lib/gp-all-component.module';
import { LoadingIndicatorTesterComponent } from './loading-indicator-tester/loading-indicator-tester.component';
import { MainMenuProviderService } from '@lib/services/api/main-menu/main-menu-provider.service';
import { MainMenuTesterComponent } from './main-menu-tester/main-menu-tester.component';
import { MainMenuTesterService } from './main-menu-tester/main-menu-tester.service';
import { MultiLanguageTesterComponent } from './multi-language-tester/multi-language-tester.component';
import { MultiSelectTesterComponent } from './multi-select-tester/multi-select-tester.component';
import { NgModule } from '@angular/core';
import { RatingTesterComponent } from './rating-tester/rating-tester.component';
import { SharedRoutingModule } from './shared.routing.module';
import { TableCrudTesterComponent } from './table-crud-tester/table-crud-tester.component';
import { TableFrameTesterComponent } from './table-frame-tester/table-frame-tester.component';
import { TableWrapperModule } from '@lib/components/table-wrapper/table-wrapper.module';
import { TextareaTesterComponent } from './textarea-tester/textarea-tester.component';
import { TopbarTesterComponent } from './topbar-tester/topbar-tester.component';
import { ImgTesterComponent } from './img-tester/img-tester.component';
import { SwitchFieldTesterComponent } from './switch-field-tester/switch-field-tester.component';
import { WysiwygTesterComponent } from './wysiwyg-tester/wysiwyg-tester.component';
import { TimeFieldTesterComponent } from './time-field-tester/time-field-tester.component';
import { TextFieldTesterComponent } from './text-field-tester/text-field-tester.component';

@NgModule({
  declarations: [
    DropdownRelatedTesterComponent,
    DropdownTesterComponent,
    DynamicTesterComponent,
    ImgTesterComponent,
    LoadingIndicatorTesterComponent,
    MainMenuTesterComponent,
    MultiLanguageTesterComponent,
    MultiSelectTesterComponent,
    RatingTesterComponent,
    SwitchFieldTesterComponent,
    TableCrudTesterComponent,
    TableFrameTesterComponent,
    TextareaTesterComponent,
    TopbarTesterComponent,
    WysiwygTesterComponent,
    TimeFieldTesterComponent,
    TextFieldTesterComponent,
  ],
  imports: [CommonModule, GpAllComponentModule, SharedRoutingModule, TableWrapperModule],
  exports: [
    DropdownRelatedTesterComponent,
    DropdownTesterComponent,
    DynamicTesterComponent,
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
  providers: [{ provide: MainMenuProviderService, useClass: MainMenuTesterService }],
})
export class SharedModule {}

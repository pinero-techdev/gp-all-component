import { DropdownRelatedTesterComponent } from './dropdown-related-tester/dropdown-related-tester.component';
import { DropdownTesterComponent } from './dropdown-tester/dropdown-tester.component';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { GpAllComponentModule } from '@lib/gp-all-component.module';
import { LoadingIndicatorTesterComponent } from './loading-indicator-tester/loading-indicator-tester.component';
import { MainMenuProviderService } from '@lib/services/api/main-menu/main-menu-provider.service';
import { MainMenuTesterComponent } from './main-menu-tester/main-menu-tester.component';
import { LoadingIndicatorTesterComponent } from './loading-indicator-tester/loading-indicator-tester.component';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared.routing.module';
import { GpAllComponentModule } from '@lib/gp-all-component.module';
import { RatingTesterComponent } from './rating-tester/rating-tester.component';
import { TableWrapperModule } from '@lib/components/table-wrapper/table-wrapper.module';
import { TableFrameTesterComponent } from './table-frame-tester/table-frame-tester.component';
import { MultiLanguageTesterComponent } from './multi-language-tester/multi-language-tester.component';
import { TopbarTesterComponent } from './topbar-tester/topbar-tester.component';
import { TableCrudTesterComponent } from './table-crud-tester/table-crud-tester.component';
import { DropdownTesterComponent } from './dropdown-tester/dropdown-tester.component';

@NgModule({
  declarations: [
    DropdownTesterComponent,
    DropdownRelatedTesterComponent,
    DynamicTesterComponent,
    LoadingIndicatorTesterComponent,
    MainMenuTesterComponent,
    MultiLanguageTesterComponent,
    MultiSelectTesterComponent,
    RatingTesterComponent,
    TableFrameTesterComponent,
    TopbarTesterComponent,
    TableCrudTesterComponent,
  ],
  imports: [CommonModule, GpAllComponentModule, SharedRoutingModule, TableWrapperModule],
  exports: [
    DropdownRelatedTesterComponent,
    DropdownTesterComponent,
    DynamicTesterComponent,
    LoadingIndicatorTesterComponent,
    MainMenuTesterComponent,
    MultiLanguageTesterComponent,
    MultiSelectTesterComponent,
    RatingTesterComponent,
    TextareaTesterComponent,
    TopbarTesterComponent,
  ],
  providers: [{ provide: MainMenuProviderService, useClass: MainMenuTesterService }],
})
export class SharedModule {}

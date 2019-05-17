import { DropdownRelatedTesterComponent } from './dropdown-related-tester/dropdown-related-tester.component';
import { FooTesterComponent } from './../foo-tester/foo-tester.component';
import { MultiLanguageTesterComponent } from './multi-language-tester/multi-language-tester.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { LoadingIndicatorTesterComponent } from './loading-indicator-tester/loading-indicator-tester.component';
import { MainMenuTesterComponent } from './main-menu-tester/main-menu-tester.component';
import { RatingTesterComponent } from './rating-tester/rating-tester.component';
import { MultiSelectTesterComponent } from './multi-select-tester/multi-select-tester.component';
import { TableFrameTesterComponent } from './table-frame-tester/table-frame-tester.component';
import { TopbarTesterComponent } from './topbar-tester/topbar-tester.component';
import { TableCrudTesterComponent } from './table-crud-tester/table-crud-tester.component';
import { DropdownTesterComponent } from './dropdown-tester/dropdown-tester.component';
import { FormCheckboxFieldTesterComponent } from './form-checkbox-field-tester/form-checkbox-field-tester.component';
import { ImgTesterComponent } from './img-tester/img-tester.component';
import { CalendarTesterComponent } from './calendar-tester/calendar-tester.component';
import { RedirectComponent } from '@lib/components/redirect/redirect.component';
import { SwitchFieldTesterComponent } from './switch-field-tester/switch-field-tester.component';
import { WysiwygTesterComponent } from './wysiwyg-tester/wysiwyg-tester.component';
import { TimeFieldTesterComponent } from './time-field-tester/time-field-tester.component';
import { TextFieldTesterComponent } from './text-field-tester/text-field-tester.component';

export const appRoutes: Routes = [
  {
    path: 'dynamic-tester',
    component: DynamicTesterComponent,
  },
  {
    path: 'loading-indicator-tester',
    component: LoadingIndicatorTesterComponent,
  },
  {
    path: 'main-menu-tester',
    component: MainMenuTesterComponent,
  },
  {
    path: 'multi-language-tester',
    component: MultiLanguageTesterComponent,
  },
  {
    path: 'rating-tester',
    component: RatingTesterComponent,
  },
  {
    path: 'text-field-tester',
    component: TextFieldTesterComponent,
  },
  {
    path: 'multi-select-tester',
    component: MultiSelectTesterComponent,
  },
  {
    path: 'table-frame-tester',
    component: TableFrameTesterComponent,
  },
  {
    path: 'table-crud-tester',
    component: TableCrudTesterComponent,
  },
  {
    path: 'topbar-tester',
    component: TopbarTesterComponent,
  },
  {
    path: 'foo',
    component: FooTesterComponent,
  },
  {
    path: 'dropdown-tester',
    component: DropdownTesterComponent,
  },
  {
    path: 'dropdown-related-tester',
    component: DropdownRelatedTesterComponent,
  },
  {
    path: 'checkbox-tester',
    component: FormCheckboxFieldTesterComponent,
  },
  {
    path: 'img-tester',
    component: ImgTesterComponent,
  },
  {
    path: 'calendar-tester',
    component: CalendarTesterComponent,
  },
  {
    path: 'redirect-tester/:new/:url',
    component: RedirectComponent,
  },
  {
    path: 'switch-tester',
    component: SwitchFieldTesterComponent,
  },
  {
    path: 'wysiwyg-tester',
    component: WysiwygTesterComponent,
  },
  {
    path: 'time-field-tester',
    component: TimeFieldTesterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}

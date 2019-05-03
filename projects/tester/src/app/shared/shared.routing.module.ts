import { DropdownRelatedTesterComponent } from './dropdown-related-tester/dropdown-related-tester.component';
import { FooTesterComponent } from './../foo-tester/foo-tester.component';
import { MultiLanguageTesterComponent } from './multi-language-tester/multi-language-tester.component';
import { ForgotPasswordTesterComponent } from './forgot-password-tester/forgot-password-tester.component';
import { LoginTesterComponent } from './login-tester/login-tester.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { LoadingIndicatorTesterComponent } from './loading-indicator-tester/loading-indicator-tester.component';
import { MainMenuTesterComponent } from './main-menu-tester/main-menu-tester.component';
import { RatingTesterComponent } from './rating-tester/rating-tester.component';
import { MultiSelectTesterComponent } from './multi-select-tester/multi-select-tester.component';
import { TableFrameTesterComponent } from './table-frame-tester/table-frame-tester.component';
import { TopbarTesterComponent } from './topbar-tester/topbar-tester.component';
import { DropdownTesterComponent } from './dropdown-tester/dropdown-tester.component';
import { FormCheckboxFieldTesterComponent } from './form-checkbox-field-tester/form-checkbox-field-tester.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginTesterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordTesterComponent,
  },
  {
    path: 'forgot-password/:username',
    component: ForgotPasswordTesterComponent,
  },
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
    path: 'multi-select-tester',
    component: MultiSelectTesterComponent,
  },
  {
    path: 'table-frame-tester',
    component: TableFrameTesterComponent,
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
    path: 'form-checkbox-field-tester',
    component: FormCheckboxFieldTesterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}

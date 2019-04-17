import {
    ForgotPasswordTesterComponent, //
} from './forgot-password-tester/forgot-password-tester.component';
import { LoginTesterComponent } from './login-tester/login-tester.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { LoadingIndicatorTesterComponent } from './loading-indicator-tester/loading-indicator-tester.component';
import { MainMenuTesterComponent } from './main-menu-tester/main-menu-tester.component';
import { MultiIdiomaTesterComponent } from './multi-idioma-tester/multi-idioma-tester.component';
import { RatingTesterComponent } from './rating-tester/rating-tester.component';
import { MultiSelectTesterComponent } from './multi-select-tester/multi-select-tester.component';

export const appRoutes: Routes = [
    {
        path: 'login-tester',
        component: LoginTesterComponent,
    },
    {
        path: 'modifica-password/:user',
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
        path: 'multi-idioma-tester',
        component: MultiIdiomaTesterComponent,
    },
    {
        path: 'rating-tester',
        component: RatingTesterComponent,
    },
    {
        path: 'multi-select-tester',
        component: MultiSelectTesterComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class SharedRoutingModule {}

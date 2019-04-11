import { ForgotPasswordTesterComponent } from './../forgot-password-tester/forgot-password-tester.component';
import { LoginTesterComponent } from './../login-tester/login-tester.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginTesterComponent,
    },
    {
        path: 'modifica-password/:user',
        component: ForgotPasswordTesterComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class SharedRoutingModule {}

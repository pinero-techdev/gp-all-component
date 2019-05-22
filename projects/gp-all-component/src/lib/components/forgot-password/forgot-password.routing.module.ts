import { AuthGuard } from './../../services/core/auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'forgot-password/:username',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard],
    data: { public: true },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard],
    data: { public: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}

import { AuthGuard } from './services/core/auth-guard.service';
import { EmptyComponent } from './components/empty/empty.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [],
  },
  {
    path: 'forgot-password/:username',
    component: ForgotPasswordComponent,
    canActivate: [],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [],
  },
  {
    path: 'home',
    component: EmptyComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GpAllComponentRoutingModule {}

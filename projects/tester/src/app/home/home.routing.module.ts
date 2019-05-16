import { AuthGuard } from './../../../../gp-all-component/src/lib/services/core/auth-guard.service';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'components',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'components',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { public: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

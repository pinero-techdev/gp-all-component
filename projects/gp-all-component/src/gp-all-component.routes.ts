import {Routes} from '@angular/router';
import {GpEmptyComponent} from './components/empty/gp-empty.component';
import {GpLoginComponent} from './components/login/gp-login.component';
import {GpModificaPasswordComponent} from './components/modifica-password/gp-modifica-password.component';
import {AuthGuard} from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: GpLoginComponent, canActivate: []
  },
  {
    path: 'login',
    component: GpLoginComponent, canActivate: []
  },
  {
    path: 'modifica-password/:usuarios',
    component: GpModificaPasswordComponent, canActivate: []
  },
  {
    path: 'modifica-password',
    component: GpModificaPasswordComponent, canActivate: []
  },
  {
    path: 'home',
    component: GpEmptyComponent, canActivate: [AuthGuard]
  },
]


import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';
import { LoginService } from '../../services/api/login/login.service';
import { ButtonModule } from '../button/button.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorModule } from '../loading-indicator/loading-indicator.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    LoadingIndicatorModule,
  ],
  exports: [LoginComponent],
  providers: [LoginService],
})
export class LoginModule {}

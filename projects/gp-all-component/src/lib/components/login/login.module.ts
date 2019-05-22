import { LoginService } from './../../services/api/login/login.service';
import { LoginRoutingModule } from './login.routing.module';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonModule,
    LoginRoutingModule,
  ],
  exports: [LoginComponent],
  providers: [LoginService],
})
export class LoginModule {}

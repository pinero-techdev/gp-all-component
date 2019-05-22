import { ForgotPasswordService } from './../../services/api/forgot-password/forgot-password.service';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password.routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [CommonModule, FormsModule, ForgotPasswordRoutingModule, SharedModule],
  exports: [ForgotPasswordComponent],
  providers: [ForgotPasswordService],
})
export class ForgotPasswordModule {}

import { UppercaseDirective } from './../../directives/uppercase.directive';
import { SharedModule } from './../../shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ForgotPasswordComponent, UppercaseDirective],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}

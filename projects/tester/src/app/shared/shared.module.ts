import { CommonModule } from '@angular/common';
import { ForgotPasswordTesterComponent } from '../forgot-password-tester/forgot-password-tester.component';
import { LoginTesterComponent } from './../login-tester/login-tester.component';
import { NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared.routing.module';
import { GpAllComponentModule } from '@lib/gp-all-component.module';

@NgModule({
    declarations: [LoginTesterComponent, ForgotPasswordTesterComponent],
    exports: [LoginTesterComponent, ForgotPasswordTesterComponent],
    imports: [CommonModule, GpAllComponentModule, SharedRoutingModule],
})
export class SharedModule {}

import { ForgotPasswordService } from './forgot-password/forgot-password.service';
import { MainMenuProviderService } from './main-menu/main-menu-provider.service';
import { LoginService } from './login/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableService } from './table/table.service';
import { MultiLanguageService } from './multi-language/multi-language.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [],
  providers: [
    ForgotPasswordService,
    TableService,
    MultiLanguageService,
    LoginService,
    MainMenuProviderService,
  ],
})
export class ApiModule {}

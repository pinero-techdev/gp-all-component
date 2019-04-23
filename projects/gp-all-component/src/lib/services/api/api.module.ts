import { MainMenuProviderService } from './main-menu/main-menu-provider.service';
import { MainMenuService } from './main-menu/main-menu.service';
import { MultiIdomaService } from './multi-idioma/multi-idioma.service';
import { LoginService } from './login/login.service';
import { PasswordService } from './password/password.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [],
  providers: [
    PasswordService,
    MultiIdomaService,
    LoginService,
    MainMenuProviderService,
    MainMenuService,
  ],
})
export class ApiModule {}

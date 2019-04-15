import { MainMenuProviderService } from './main-menu/main-menu-provider.service';
import { MainMenuService } from './main-menu/main-menu.service';
import { LoginService } from './login/login.service';
import { PasswordService } from './password/password.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableService } from './table/table.service';
import { MultiLanguageService } from './multi-language/multi-language.service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    exports: [],
    providers: [
        PasswordService,
        TableService,
        MultiLanguageService,
        LoginService,
        MainMenuProviderService,
        MainMenuService,
    ],
})
export class ApiModule {}

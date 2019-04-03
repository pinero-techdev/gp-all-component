import { MultiIdomaService } from './multi-idioma/multi-idioma.service';
import { MenuProviderService } from './menu/menu-provider.service';
import { LoginService } from './login/login.service';
import { PasswordService } from './password/password.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from './menu/menu.service';
import { TableService } from './table/table.service';

@NgModule({
    imports: [CommonModule],
    exports: [],
    providers: [
        PasswordService,
        TableService,
        MultiIdomaService,
        LoginService,
        MenuProviderService,
        MenuService,
    ],
})
export class ApiModule {}

import { CoreModule } from './services-2/core/core.module';
import { MessageService } from 'primeng/primeng';
import { TableService } from './services/table.service';
import { MultiIdomaService } from './services/multi-idioma.service';
import { LoginService } from './services/login.service';
import { AuthGuard } from './services/auth-guard.service';
import { MenuProviderService } from './services/menu-provider.service';
import { MenuService } from './services/menu.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { GpMainMenuComponent } from './components/menu-old/gp-main-menu.component';
import { RouterModule } from '@angular/router';
import { GlobalService } from './services/global.service';
import { CommonService } from './services/common.service';
import { MultiIdiomaComponent } from './components/multi-idioma/multi-idioma.component';
import { GpMultiIdiomaComponent } from './components/multi-idioma-old/components/gp-multi-idioma.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        GpMainMenuComponent,
        GpMultiIdiomaComponent,
        DynamicComponent,
        LoadingIndicatorComponent,
        MenuComponent,
        MultiIdiomaComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        CoreModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
    ],
    exports: [
        DynamicComponent,
        LoadingIndicatorComponent,
        MultiIdiomaComponent,
        MenuComponent,
    ],
    providers: [
        MenuService,
        AuthGuard,
        CommonService,
        GlobalService,
        LoginService,
        MultiIdomaService,
        TableService,
        MenuProviderService,
        MessageService,
    ],
})
export class GpAllComponentModule {}

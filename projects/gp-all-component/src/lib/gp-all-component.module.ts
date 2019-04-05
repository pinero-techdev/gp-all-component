import { LoginService } from './services/api/login/login.service';
import { ApiModule } from './services/api/api.module';
import { CoreModule } from './services/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import {
    LoadingIndicatorComponent, //
} from './components/loading-indicator/loading-indicator.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import {
    MultiIdiomaComponent, //
} from './components/multi-idioma/multi-idioma.component';

@NgModule({
    declarations: [
        DynamicComponent,
        LoadingIndicatorComponent,
        MenuComponent,
        MultiIdiomaComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CommonModule,
        CoreModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
    ],
    exports: [
        ApiModule,
        DynamicComponent,
        LoadingIndicatorComponent,
        MenuComponent,
        MultiIdiomaComponent,
    ],
    providers: [LoginService],
})
export class GpAllComponentModule {}

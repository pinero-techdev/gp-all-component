import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MultiSelectModule } from 'primeng/primeng';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { EmptyComponent } from './components/empty/empty.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { LoginComponent } from './components/login/login.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MultiIdiomaComponent } from './components/multi-idioma/multi-idioma.component';
import { MultiSelectComponent } from './components/multi-select/components/multi-select.component';
import { CUSTOM_CONTROL_VALUE_ACCESSOR } from './components/multi-select/constants/custom-control-value-accessor.constant';
import { RatingComponent } from './components/rating/rating.component';
import { ApiModule } from './services/api/api.module';
import { LoginService } from './services/api/login/login.service';
import { MainMenuService } from './services/api/main-menu/main-menu.service';
import { CoreModule } from './services/core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        DynamicComponent,
        LoadingIndicatorComponent,
        MultiIdiomaComponent,
        MainMenuComponent,
        LoginComponent,
        RatingComponent,
        EmptyComponent,
        MultiSelectComponent,
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
        MultiSelectModule,
    ],
    exports: [
        ApiModule,
        DynamicComponent,
        LoadingIndicatorComponent,
        MultiIdiomaComponent,
        MainMenuComponent,
        LoginComponent,
    ],
    providers: [LoginService, MainMenuService, CUSTOM_CONTROL_VALUE_ACCESSOR],
})
export class GpAllComponentModule {}

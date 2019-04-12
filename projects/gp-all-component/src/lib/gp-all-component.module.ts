import { MainMenuProviderService } from '@lib/services/api/main-menu/main-menu-provider.service';
import { MainMenuService } from './services/api/main-menu/main-menu.service';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LoginService } from './services/api/login/login.service';
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
import { MultiIdiomaComponent } from './components/multi-idioma/multi-idioma.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { RatingComponent } from './components/rating/rating.component';
import { EmptyComponent } from './components/empty/empty.component';
import {
  CUSTOM_CONTROL_VALUE_ACCESSOR, //
} from './resources/constants/custom-control-value-accessor.constant';
import { LoginComponent } from './components/login/login.component';

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
    ],
    exports: [
        DynamicComponent,
        LoadingIndicatorComponent,
        LoginComponent,
        MainMenuComponent,
        MultiIdiomaComponent,
        RatingComponent,
        MultiSelectComponent,
        EmptyComponent,
    ],
    providers: [LoginService, MainMenuService,  MainMenuProviderService,
      CUSTOM_CONTROL_VALUE_ACCESSOR],
})
export class GpAllComponentModule {}

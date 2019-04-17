import { MainMenuProviderService } from '@lib/services/api/main-menu/main-menu-provider.service';
import { MainMenuService } from './services/api/main-menu/main-menu.service';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LoginService } from './services/api/login/login.service';
import { CoreModule } from './services/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyComponent } from './components/empty/empty.component';
import { CUSTOM_CONTROL_VALUE_ACCESSOR } from './resources/constants/custom-control-value-accessor.constant';
import { LoginComponent } from './components/login/login.component';
import { GPUtil } from './services/core/gp-util.service';
import { FormsWrapperModule } from './components/forms-wrapper/forms-wrapper.module';
import { MultiIdiomaModule } from './components/multi-idioma/multi-idioma.module';
import { LoadingIndicatorModule } from './components/loading-indicator/loading-indicator.module';
import { DynamicModule } from './components/dynamic/dynamic.module';
import { EmptyModule } from './components/empty/empty.module';
import { MainMenuModule } from './components/main-menu/main-menu.module';
import { LoginModule } from './components/login/login.module';
import { RatingModule, MultiSelectModule } from 'primeng/primeng';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MultiIdiomaModule,
        MultiSelectModule,
        LoadingIndicatorModule,
        MainMenuModule,
        EmptyModule,
        CoreModule,
        LoginModule,
        DynamicModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
        FormsWrapperModule,
    ],
    exports: [
        DynamicComponent,
        LoadingIndicatorModule,
        LoginModule,
        MultiSelectModule,
        LoginComponent,
        MainMenuComponent,
        MultiIdiomaModule,
        MainMenuModule,
        FormsWrapperModule,
        RatingModule,
        DynamicModule,
        EmptyModule,
        EmptyComponent,
    ],
    providers: [
        LoginService,
        MainMenuService,
        GPUtil,
        MainMenuProviderService,
        CUSTOM_CONTROL_VALUE_ACCESSOR,
    ],
})
export class GpAllComponentModule {}

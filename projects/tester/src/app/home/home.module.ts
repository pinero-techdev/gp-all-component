import { GpAllComponentModule } from '@lib/gp-all-component.module';
import { MainMenuTesterComponent } from './../main-menu-tester/main-menu-tester.component';
import { MultiIdiomaTesterComponent } from './../multi-idioma-tester/multi-idioma-tester.component';
import { LoadingIndicatorTesterComponent } from './../loading-indicator-tester/loading-indicator-tester.component';
import { DynamicTesterComponent } from './../dynamic-tester/dynamic-tester.component';
import { FooTesterComponent } from './../foo-tester/foo-tester.component';
import { HomeRoutingModule } from './home.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        HomeComponent,
        DynamicTesterComponent,
        FooTesterComponent,
        LoadingIndicatorTesterComponent,
        MultiIdiomaTesterComponent,
        MainMenuTesterComponent,
    ],
    entryComponents: [FooTesterComponent],
    imports: [CommonModule, SharedModule, HomeRoutingModule, GpAllComponentModule],
    exports: [FooTesterComponent, HomeComponent],
})
export class HomeModule {}

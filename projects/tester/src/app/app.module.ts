import { SharedModule } from 'primeng/primeng';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainMenuProviderService } from '@lib/services/api/main-menu/main-menu-provider.service';
import { MainMenuTesterService } from './main-menu-tester/main-menu-tester.service';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, CommonModule, SharedModule, FormsModule, HomeModule, AppRoutingModule],
    providers: [{ provide: MainMenuProviderService, useClass: MainMenuTesterService }],
    bootstrap: [AppComponent],
})
export class AppModule {}

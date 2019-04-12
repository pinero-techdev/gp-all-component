import { SharedModule } from 'primeng/primeng';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, CommonModule, SharedModule, FormsModule, HomeModule, AppRoutingModule],
    bootstrap: [AppComponent],
})
export class AppModule {}

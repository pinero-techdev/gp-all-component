import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu.component';
import { ScrollPanelModule } from 'primeng/primeng';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [CommonModule, ScrollPanelModule, RouterModule],
  exports: [MainMenuComponent],
})
export class MainMenuModule {}

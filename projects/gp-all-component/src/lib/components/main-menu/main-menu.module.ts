import { MainMenuProviderService } from '../../services/api/main-menu/main-menu-provider.service';
import { MainMenuService } from '../../services/api/main-menu/main-menu.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu.component';
import { ScrollPanelModule, TooltipModule } from 'primeng/primeng';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [CommonModule, ScrollPanelModule, RouterModule, TooltipModule],
  exports: [MainMenuComponent],
  providers: [MainMenuService, MainMenuProviderService],
})
export class MainMenuModule {}

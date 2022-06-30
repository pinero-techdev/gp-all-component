import { MainMenuProviderService } from '../../services/api/main-menu/main-menu-provider.service';
import { MainMenuService } from '../../services/api/main-menu/main-menu.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu.component';

import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [CommonModule, PanelModule, RouterModule, TooltipModule],
  exports: [MainMenuComponent],
  providers: [MainMenuService, MainMenuProviderService],
})
export class MainMenuModule {}

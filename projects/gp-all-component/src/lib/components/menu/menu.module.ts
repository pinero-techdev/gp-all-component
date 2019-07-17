// import {
//  MainMenuProviderService
// } from './../../services/api/main-menu/main-menu-provider.service';
// import { MainMenuService } from './../../services/api/main-menu/main-menu.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [MenuComponent],
  providers: [
    /*MainMenuService, MainMenuProviderService */
  ],
})
export class MenuModule {}

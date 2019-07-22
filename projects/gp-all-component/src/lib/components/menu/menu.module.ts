import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, RouterModule, PanelMenuModule],
  exports: [MenuComponent],
  providers: [],
})
export class MenuModule {}

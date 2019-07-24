import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, PanelMenuModule],
  exports: [MenuComponent],
  providers: [],
})
export class MenuModule {}
